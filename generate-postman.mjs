import { readFileSync, writeFileSync } from 'fs';
import config from './config/app.config.mjs';

const apiMdPath = config.apiSpecPathTask;
const outputPath = config.postmanCollectionOutput;

try {
    const content = readFileSync(apiMdPath, 'utf8');
    const apiBlocks = parseApiBlocks(content);

    console.log(`Found ${apiBlocks.length} API blocks`);

    const collection = {
        info: {
            name: 'KMI API Test Collection',
            schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json'
        },
        variable: buildCollectionVariables(apiBlocks),
        item: []
    };

    apiBlocks.forEach(block => {
        console.log(`Processing ${block.name} with ${block.testCases.length} test cases`);

        const folder = {
            name: block.name,
            item: []
        };

        block.testCases.forEach(tc => {
            const item = buildCollectionItem(block.baseRequest, tc);
            folder.item.push(item);
        });

        collection.item.push(folder);
    });

    writeFileSync(outputPath, JSON.stringify(collection, null, 2), 'utf8');
    console.log(`Created: ${outputPath} with ${collection.item.length} folders`);
} catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
}

function parseApiBlocks(content) {
    const blocks = [];
    const sections = content.split(/(?=## API-\d+:)/);

    sections.forEach(section => {
        if (!section.trim() || !section.startsWith('## API-')) return;

        const headerMatch = section.match(/## (API-\d+): (.+)/);
        if (!headerMatch) return;

        const apiId = headerMatch[1];
        const apiName = headerMatch[2];
        const baseRequest = parseBaseRequest(section);
        const testCases = parseTestCases(section);

        if (testCases.length > 0) {
            blocks.push({
                id: apiId,
                name: `${apiId}: ${apiName}`,
                baseRequest,
                testCases
            });
        }
    });

    return blocks;
}

function buildCollectionVariables(apiBlocks) {
    const defaults = new Map([
        ['invite_code', ''],
        ['old_invite_code', ''],
        ['invite_code_sent_at', ''],
        ['old_invite_code_sent_at', '']
    ]);

    apiBlocks.forEach(block => {
        block.testCases.forEach(testCase => {
            if (isFlowTestCase(block.baseRequest, testCase)) {
                defaults.set('invite_code', defaults.get('invite_code') ?? '');
                defaults.set('invite_code_sent_at', defaults.get('invite_code_sent_at') ?? '');

                if (/old code|send new code twice/i.test(testCase.description || '') || /post twice then get/i.test(testCase.overrides.rawMethod || '')) {
                    defaults.set('old_invite_code', defaults.get('old_invite_code') ?? '');
                    defaults.set('old_invite_code_sent_at', defaults.get('old_invite_code_sent_at') ?? '');
                }
            }
        });
    });

    return Array.from(defaults.entries()).map(([key, value]) => ({
        key,
        value,
        type: 'string'
    }));
}

function parseBaseRequest(section) {
    const request = {
        rawMethod: 'POST',
        method: 'POST',
        url: '',
        urls: [],
        headers: {},
        body: ''
    };

    const methodMatch = section.match(/^- Method:\s*(.+)$/m);
    if (methodMatch) {
        request.rawMethod = methodMatch[1].trim();
        request.method = extractPrimaryMethod(request.rawMethod) || 'POST';
    }

    const urlLineMatch = section.match(/^- URL:\s*(.+)$/m);
    if (urlLineMatch) {
        request.urls = Array.from(urlLineMatch[1].matchAll(/`([^`]+)`/g), match => match[1].trim());
        request.url = request.urls[0] || '';
    }

    const headerMatches = section.matchAll(/\s+- ([\w-]+):\s*`([^`]+)`/g);
    for (const match of headerMatches) {
        request.headers[match[1]] = match[2];
    }

    const bodyMatch = section.match(/```json\n([\s\S]+?)\n```/);
    if (bodyMatch) {
        request.body = bodyMatch[1].trim();
    }

    return request;
}

function parseTestCases(section) {
    const testCases = [];
    const tableStart = section.indexOf('| ID');
    if (tableStart === -1) return testCases;

    const tableContent = section.substring(tableStart);
    const lines = tableContent.split('\n');
    let inTable = false;

    lines.forEach(line => {
        if (line.includes('| ID') || line.includes('---')) {
            inTable = true;
            return;
        }

        if (!inTable || !line.trim().startsWith('|')) return;

        const cells = line.split('|').map(cell => cell.trim()).filter(Boolean);
        if (cells.length < 5) return;

        testCases.push({
            id: cells[0],
            category: cells[1],
            description: cells[2],
            overrides: parseOverrides(cells[3]),
            expectedResult: cells[4]
        });
    });

    return testCases;
}

function parseOverrides(overrideText) {
    const overrides = {
        rawMethod: ''
    };

    const methodMatch = overrideText.match(/\*\*Method:\*\*\s*([^<]+)/i);
    if (methodMatch) {
        overrides.rawMethod = methodMatch[1].trim();
        const primaryMethod = extractPrimaryMethod(overrides.rawMethod);
        if (primaryMethod) overrides.method = primaryMethod;
    }

    const urlMatch = overrideText.match(/\*\*URL:\*\*\s*`([^`]+)`/i);
    if (urlMatch) overrides.url = urlMatch[1].trim();

    if (overrideText.includes('**Headers:**')) {
        overrides.headers = {};
        const headerSectionMatch = overrideText.match(/\*\*Headers:\*\*([\s\S]*?)(?=\*\*Body:\*\*|\*\*URL:\*\*|\*\*Params:\*\*|$)/i);
        const headerSection = headerSectionMatch ? headerSectionMatch[1] : '';

        headerSection
            .replace(/<br\s*\/?>/gi, '\n')
            .replace(/,/g, '\n')
            .split('\n')
            .map(s => s.trim())
            .filter(Boolean)
            .forEach(line => {
                line = line.replace(/^`|`$/g, '').trim();
                const match = line.match(/^([\w-]+)\s*[:=]\s*(.+)$/);
                if (!match) return;

                const key = match[1].trim();
                let value = match[2].trim();

                if (/^(None|null)$/i.test(value)) {
                    overrides.headers[key] = null;
                    return;
                }

                value = stripWrappingQuotes(value);
                overrides.headers[key] = value;
            });
    }

    const paramsMatch = overrideText.match(/\*\*Params:\*\*([\s\S]*?)(?=\*\*Body:\*\*|\*\*URL:\*\*|\*\*Headers:\*\*|$)/i);
    if (paramsMatch) {
        overrides.params = {};
        paramsMatch[1]
            .replace(/<br\s*\/?>/gi, '\n')
            .replace(/,/g, '\n')
            .split('\n')
            .map(s => s.trim())
            .filter(Boolean)
            .forEach(line => {
                line = line.replace(/^`|`$/g, '').trim();
                const match = line.match(/^([\w$-]+)\s*[:=]\s*(.+)$/);
                if (!match) return;

                overrides.params[match[1]] = stripWrappingQuotes(match[2]);
            });
    }

    const bodyMatch = overrideText.match(/\*\*Body:\*\*\s*`([\s\S]*?)`/i);
    if (bodyMatch) {
        overrides.body = bodyMatch[1].trim();
    } else if (/malformed json/i.test(overrideText)) {
        overrides.body = '{ invalid json';
    } else if (/\*\*Body:\*\*\s*None/i.test(overrideText)) {
        overrides.body = null;
    }

    return overrides;
}

function buildCollectionItem(baseRequest, testCase) {
    if (isFlowTestCase(baseRequest, testCase)) {
        return buildFlowFolder(baseRequest, testCase);
    }

    return buildSingleRequest(baseRequest, testCase);
}

function isFlowTestCase(baseRequest, testCase) {
    return baseRequest.urls.length > 1 || /\bthen\b/i.test(testCase.overrides.rawMethod || '');
}

function buildSingleRequest(baseRequest, testCase) {
    const method = testCase.overrides.method || baseRequest.method;
    const url = resolveRequestUrl(baseRequest, testCase);
    const headers = resolveHeaders(baseRequest, testCase);
    const body = testCase.overrides.body !== undefined ? testCase.overrides.body : baseRequest.body;

    return createRequestItem({
        name: `${testCase.id} - ${testCase.description}`,
        method,
        url,
        headers,
        body,
        testScript: buildExpectedTestScript(testCase.expectedResult, testCase)
    });
}

function buildFlowFolder(baseRequest, testCase) {
    const flowSteps = deriveFlowSteps(baseRequest, testCase);

    return {
        name: `${testCase.id} - ${testCase.description}`,
        item: flowSteps.map(step => createRequestItem(step))
    };
}

function deriveFlowSteps(baseRequest, testCase) {
    const sendUrl = baseRequest.urls[0] || baseRequest.url;
    const verifyTemplate = baseRequest.urls[1] || testCase.overrides.url || baseRequest.url;
    const baseHeaders = resolveHeaders(baseRequest, testCase);
    const sendBody = testCase.overrides.body !== undefined ? testCase.overrides.body : baseRequest.body;
    const methodSpec = (testCase.overrides.rawMethod || '').toLowerCase();
    const description = (testCase.description || '').toLowerCase();
    const userName = extractUserName(sendBody, verifyTemplate) || 'thuytrangle2205@gmail.com';

    const steps = [];

    if (/post twice then get/.test(methodSpec) || /send new code twice/.test(description)) {
        steps.push(buildSendStep('Step 1 - Send code #1', sendUrl, baseHeaders, sendBody, 'old_invite_code', 'old_invite_code_sent_at'));
        steps.push(buildSendStep('Step 2 - Send code #2', sendUrl, baseHeaders, sendBody, 'invite_code', 'invite_code_sent_at'));
        steps.push(buildVerifyStep('Step 3 - Verify old code', verifyTemplate, baseHeaders, 'old_invite_code', userName, '400/409/410/422; old code invalid after new code is issued'));
        return steps;
    }

    steps.push(buildSendStep('Step 1 - Send code', sendUrl, baseHeaders, sendBody, 'invite_code', 'invite_code_sent_at'));

    if (/wait\s+(\d+)s/.test(methodSpec)) {
        const waitSeconds = Number(methodSpec.match(/wait\s+(\d+)s/)[1]);
        steps.push(buildVerifyStep(
            `Step 2 - Verify code after ${waitSeconds}s`,
            verifyTemplate,
            baseHeaders,
            'invite_code',
            userName,
            testCase.expectedResult,
            {
                sentAtVariable: 'invite_code_sent_at',
                minimumElapsedMs: waitSeconds * 1000,
                waitUntilMs: waitSeconds * 1000
            }
        ));
        return steps;
    }

    if (/get x5/.test(methodSpec) && /4 wrong codes and 1 correct/.test(description)) {
        steps.push(...buildWrongVerifySteps(verifyTemplate, baseHeaders, userName, 4, 2, undefined, {
            sentAtVariable: 'invite_code_sent_at',
            maximumElapsedMs: 60000
        }));
        steps.push(buildVerifyStep('Step 6 - Verify correct code', verifyTemplate, baseHeaders, 'invite_code', userName, '200; code valid', {
            sentAtVariable: 'invite_code_sent_at',
            maximumElapsedMs: 60000
        }));
        return steps;
    }

    if (/get x5/.test(methodSpec) && /wrong codes/.test(description)) {
        steps.push(...buildWrongVerifySteps(verifyTemplate, baseHeaders, userName, 5, 2, testCase.expectedResult, {
            sentAtVariable: 'invite_code_sent_at',
            maximumElapsedMs: 60000
        }));
        return steps;
    }

    if (/multiple times/.test(methodSpec) || /lock threshold/.test(description)) {
        steps.push(...buildWrongVerifySteps(verifyTemplate, baseHeaders, userName, 6, 2, testCase.expectedResult, {
            sentAtVariable: 'invite_code_sent_at',
            maximumElapsedMs: 60000
        }));
        return steps;
    }

    steps.push(buildVerifyStep('Step 2 - Verify code', verifyTemplate, baseHeaders, 'invite_code', userName, testCase.expectedResult));
    return steps;
}

function buildSendStep(name, url, headers, body, targetVariable, sentAtVariable) {
    return {
        name,
        method: 'POST',
        url,
        headers,
        body,
        testScript: buildExpectedTestScript('200/204; code sent successfully')
            .concat(buildCaptureInviteCodeScript(targetVariable, sentAtVariable))
    };
}

function buildWrongVerifySteps(urlTemplate, headers, userName, count, startIndex, expectedResult, timing = {}) {
    const codes = ['111111', '222222', '333333', '444444', '555555', '666666', '777777'];
    const steps = [];

    for (let i = 0; i < count; i += 1) {
        steps.push(buildVerifyStep(
            `Step ${startIndex + i} - Verify wrong code ${i + 1}`,
            urlTemplate,
            headers,
            codes[i],
            userName,
            expectedResult || '400/404/422; invalid code',
            timing
        ));
    }

    return steps;
}

function buildVerifyStep(name, urlTemplate, headers, codeValue, userName, expectedResult, timing = {}) {
    return {
        name,
        method: 'GET',
        url: buildVerifyUrl(urlTemplate, codeValue, userName),
        headers,
        testScript: buildExpectedTestScript(expectedResult).concat(buildTimingAssertionScript(timing, name)),
        preRequestScript: buildTimingPreRequestScript(timing, name)
    };
}

function createRequestItem({ name, method, url, headers, body, testScript = [], preRequestScript = [] }) {
    const item = {
        name,
        request: {
            method,
            header: Object.entries(headers || {}).map(([key, value]) => ({ key, value, type: 'text' })),
            url: parseUrl(url)
        },
        event: []
    };

    if (preRequestScript.length > 0) {
        item.event.push({
            listen: 'prerequest',
            script: {
                type: 'text/javascript',
                exec: preRequestScript
            }
        });
    }

    if (testScript.length > 0) {
        item.event.push({
            listen: 'test',
            script: {
                type: 'text/javascript',
                exec: testScript
            }
        });
    }

    if (body && ['POST', 'PUT', 'PATCH'].includes(method)) {
        item.request.body = {
            mode: 'raw',
            raw: body,
            options: {
                raw: { language: 'json' }
            }
        };
    }

    return item;
}

function resolveRequestUrl(baseRequest, testCase) {
    let url = baseRequest.url;

    if (testCase.overrides.url) {
        const overrideUrl = testCase.overrides.url;

        if (overrideUrl.startsWith('http') || overrideUrl.includes('{{base_url}}')) {
            url = overrideUrl;
        } else if (overrideUrl.startsWith('/')) {
            url = '{{base_url}}' + overrideUrl;
        } else if (overrideUrl.startsWith('(')) {
            url = baseRequest.url + overrideUrl;
        } else {
            url = overrideUrl;
        }
    }

    if (testCase.overrides.params) {
        const query = Object.entries(testCase.overrides.params)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');

        url += (url.includes('?') ? '&' : '?') + query;
    }

    return url;
}

function resolveHeaders(baseRequest, testCase) {
    const headers = { ...baseRequest.headers };

    if (testCase.overrides.headers) {
        Object.entries(testCase.overrides.headers).forEach(([key, value]) => {
            if (value === null) delete headers[key];
            else headers[key] = value;
        });
    }

    return headers;
}

function extractPrimaryMethod(text) {
    const match = (text || '').match(/\b(GET|POST|PUT|PATCH|DELETE|HEAD|OPTIONS)\b/i);
    return match ? match[1].toUpperCase() : '';
}

function extractUserName(body, verifyUrl) {
    if (body) {
        try {
            const parsed = JSON.parse(body);
            const directUserName = parsed?.userName;
            const nestedUserName = parsed?.inviteCode?.userName;
            const candidate = typeof directUserName === 'string' && directUserName.trim()
                ? directUserName.trim()
                : typeof nestedUserName === 'string' && nestedUserName.trim()
                    ? nestedUserName.trim()
                    : '';

            if (candidate) return candidate;
        } catch {
        }
    }

    const match = (verifyUrl || '').match(/userName='([^']+)'/);
    return match ? match[1] : '';
}

function buildVerifyUrl(urlTemplate, codeValue, userName) {
    let url = urlTemplate;
    const codeToken = isVariableReference(codeValue) ? `{{${codeValue}}}` : codeValue;

    if (/inviteCode='[^']*'/i.test(url)) {
        url = url.replace(/inviteCode='[^']*'/i, `inviteCode='${codeToken}'`);
    } else {
        url = url.replace('CODE', codeToken);
    }

    if (/userName='[^']*'/i.test(url) && userName) {
        url = url.replace(/userName='[^']*'/i, `userName='${userName}'`);
    }

    return url;
}

function isVariableReference(value) {
    return typeof value === 'string' && /^[a-z_][a-z0-9_]*$/i.test(value);
}

function buildTimingPreRequestScript(timing, stepName) {
    const lines = [];
    if (!timing || !timing.sentAtVariable) return lines;

    lines.push(`const sentAtRaw = pm.collectionVariables.get('${timing.sentAtVariable}') || '';`);
    lines.push('const sentAt = Number(sentAtRaw);');
    lines.push(`pm.variables.set('current_step_name', ${JSON.stringify(stepName)});`);
    lines.push(`pm.variables.set('timing_sent_at_variable', ${JSON.stringify(timing.sentAtVariable)});`);
    lines.push('if (!Number.isFinite(sentAt) || sentAt <= 0) {');
    lines.push(`    throw new Error('Missing or invalid sent timestamp in collection variable: ${timing.sentAtVariable}');`);
    lines.push('}');

    // if (timing.waitUntilMs) {
    //     lines.push(const waitUntil = sentAt + ${timing.waitUntilMs};);
    //     lines.push('while (Date.now() < waitUntil) {}');
    //     lines.push(console.log('Waited until elapsed reached ${Math.round(timing.waitUntilMs / 1000)}s for ' + pm.variables.get('current_step_name')););
    // }

    lines.push('pm.variables.set("verify_started_at", Date.now().toString());');
    lines.push(`console.log('Timing prerequest [' + pm.variables.get('current_step_name') + '] ${timing.sentAtVariable}=' + sentAtRaw + ', verify_started_at=' + pm.variables.get("verify_started_at"));`);
    return lines;
}

function buildTimingAssertionScript(timing, stepName) {
    const lines = [];
    if (!timing || !timing.sentAtVariable) return lines;

    lines.push('');
    lines.push(`const sentAtForAssertion = Number(pm.collectionVariables.get('${timing.sentAtVariable}') || '0');`);
    lines.push('const verifyStartedAt = Number(pm.variables.get("verify_started_at") || Date.now().toString());');
    lines.push('const elapsedSinceSend = verifyStartedAt - sentAtForAssertion;');
    lines.push(`console.log('Timing assertion [${stepName}] ${timing.sentAtVariable}=' + sentAtForAssertion + ', verify_started_at=' + verifyStartedAt + ', elapsedSinceSend=' + elapsedSinceSend + 'ms');`);

    // if (timing.minimumElapsedMs) {
    //     lines.push(pm.test(${JSON.stringify(${stepName} runs after at least  seconds)}, function () {);
    //     lines.push(    pm.expect(elapsedSinceSend).to.be.at.least(${timing.minimumElapsedMs}););
    //     lines.push('});');
    // }

    // if (timing.maximumElapsedMs) {
    //     lines.push(pm.test(${JSON.stringify(${stepName} runs within  seconds)}, function () {);
    //     lines.push(    pm.expect(elapsedSinceSend).to.be.below(${timing.maximumElapsedMs}););
    //     lines.push('});');
    // }

    lines.push('pm.test("Timing metadata is available", function () {');
    lines.push('    pm.expect(sentAtForAssertion).to.be.above(0);');
    lines.push('    pm.expect(verifyStartedAt).to.be.at.least(sentAtForAssertion);');
    lines.push('});');

    return lines;
}

function buildCaptureInviteCodeScript(targetVariable, sentAtVariable) {
    return [
        `const targetVariable = '${targetVariable}';`,
        `const sentAtVariable = '${sentAtVariable}';`,
        'let bodyText = pm.response.text();',
        'let json = null;',
        'try { json = pm.response.json(); } catch (e) { json = null; }',
        'let inviteCode = null;',
        'const candidates = [',
        '    json?.inviteCode,',
        '    json?.code,',
        '    json?.otp,',
        '    json?.data?.inviteCode,',
        '    json?.data?.code,',
        '    json?.result?.inviteCode,',
        '    json?.result?.code',
        '].filter(Boolean);',
        'if (candidates.length > 0) inviteCode = String(candidates[0]);',
        'if (!inviteCode && bodyText) {',
        '    const match = bodyText.match(/\b\d{4,8}\b/);',
        '    if (match) inviteCode = match[0];',
        '}',
        'pm.collectionVariables.set(sentAtVariable, Date.now().toString());',
        `console.log('Stored sent timestamp in variable: ${sentAtVariable}=' + pm.collectionVariables.get(sentAtVariable));`,
        'if (inviteCode) {',
        '    pm.collectionVariables.set(targetVariable, inviteCode);',
        `    console.log('Stored invite code in variable: ${targetVariable}=' + pm.collectionVariables.get(targetVariable));`,
        '} else {',
        `    console.log('No invite code detected in response for variable: ${targetVariable}');`,
        '}'
    ];
}

function buildExpectedTestScript(expectedResult, testCase = null) {
    const expected = deriveExpectations(expectedResult);
    const lines = [];

    if (testCase) {
        lines.push(`// Test Case: ${testCase.id}`);
        lines.push(`// Expected: ${expectedResult}`);
        lines.push('');
    }

    if (expected.statusCodes.length > 0) {
        lines.push('pm.test("Status code matches expected", function () {');
        lines.push(`    pm.expect(pm.response.code).to.be.oneOf([${expected.statusCodes.join(', ')}]);`);
        lines.push('});');
        lines.push('');
    }

    if (expected.allowAny4xx) {
        lines.push('pm.test("Status code is 4xx", function () {');
        lines.push('    pm.expect(pm.response.code).to.be.within(400, 499);');
        lines.push('});');
        lines.push('');
    }

    if (expected.not5xx) {
        lines.push('pm.test("No 5xx error", function () {');
        lines.push('    pm.expect(pm.response.code).to.be.below(500);');
        lines.push('});');
        lines.push('');
    }

    if (expected.maxResponseTimeMs !== null) {
        lines.push('pm.test("Response time under limit", function () {');
        lines.push(`    pm.expect(pm.response.responseTime).to.be.below(${expected.maxResponseTimeMs});`);
        lines.push('});');
        lines.push('');
    }

    if (expected.requireIdOrKey || expected.requireId || expected.requireName || expected.requireDescription) {
        lines.push('pm.test("Response body validation", function () {');
        lines.push('    let json = null;');
        lines.push('    try { json = pm.response.json(); } catch (e) { json = null; }');
        lines.push('    pm.expect(json, "Response JSON must be parseable").to.be.an("object");');

        if (expected.requireIdOrKey) {
            lines.push('    pm.expect(json.id || json.key, "Response must include id or key").to.exist;');
        } else if (expected.requireId) {
            lines.push('    pm.expect(json.id, "Response must include id").to.exist;');
        }

        if (expected.requireName || expected.requireDescription) {
            lines.push('    let reqBody = null;');
            lines.push('    try { reqBody = JSON.parse(pm.request.body.raw); } catch (e) { reqBody = null; }');
            lines.push('    pm.expect(reqBody, "Request body must be valid JSON").to.be.an("object");');
            if (expected.requireName) {
                lines.push('    pm.expect(json.name, "Response must include name").to.equal(reqBody.name);');
            }
            if (expected.requireDescription) {
                lines.push('    pm.expect(json.description, "Response must include description").to.equal(reqBody.description ?? "");');
            }
        }

        lines.push('});');
        lines.push('');
    }

    if (lines[lines.length - 1] === '') lines.pop();
    return lines;
}

function stripWrappingQuotes(value) {
    const trimmed = (value ?? '').trim();
    if (trimmed.length >= 2) {
        const first = trimmed[0];
        const last = trimmed[trimmed.length - 1];
        const quoteChars = ["'", '"', '`'];
        if (first === last && quoteChars.includes(first)) {
            return trimmed.slice(1, -1).trim();
        }
    }
    return trimmed;
}

function deriveExpectations(expectedResult) {
    const text = expectedResult || '';
    return {
        statusCodes: extractStatusCodes(text),
        allowAny4xx: /appropriate 4xx/i.test(text),
        not5xx: /No 5xx error|no server error/i.test(text),
        maxResponseTimeMs: extractResponseTime(text),
        requireId: /contains id\b/i.test(text),
        requireIdOrKey: /contains id\/key/i.test(text),
        requireName: /correct `name`/i.test(text) || /correct name/i.test(text),
        requireDescription: /correct `description`/i.test(text) || /correct description/i.test(text)
    };
}

function extractStatusCodes(text) {
    const codes = new Set();
    const matches = text.match(/\b\d{3}\b/g) || [];
    matches.forEach(code => {
        const num = Number(code);
        if (!Number.isNaN(num)) codes.add(num);
    });
    return Array.from(codes);
}

function extractResponseTime(text) {
    const match = text.match(/<\s*(\d+)\s*seconds/i);
    if (!match) return null;
    const seconds = Number(match[1]);
    return Number.isNaN(seconds) ? null : seconds * 1000;
}

function parseUrl(urlString) {
    const raw = urlString;
    const withoutBase = urlString
        .replace(/^{{base_url}}/, '')
        .replace(/^https?:\/\/[^/]+/i, '');

    const [pathPart, queryString = ''] = withoutBase.split('?');
    const path = pathPart.split('/').filter(Boolean);
    const query = queryString
        ? queryString.split('&').filter(Boolean).map(entry => {
            const [key, value = ''] = entry.split('=');
            return { key: decodeURIComponent(key), value: decodeURIComponent(value) };
        })
        : [];

    return {
        raw,
        host: ['{{base_url}}'],
        path,
        query
    };
}

