import { readFileSync, writeFileSync } from 'fs';

const apiMdPath = './TASK154947.md';
const outputPath = './KMI.postman_collection.json';

try {
    // Read api.md
    const content = readFileSync(apiMdPath, 'utf8');

    // Parse API blocks
    const apiBlocks = parseApiBlocks(content);

    console.log(`Found ${apiBlocks.length} API blocks`);

    // Generate Postman collection
    const collection = {
        info: {
            name: 'KMI API Test Collection',
            schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json'
        },
        item: []
    };

    // Convert each API block to Postman folder
    apiBlocks.forEach(block => {
        console.log(`Processing ${block.name} with ${block.testCases.length} test cases`);

        const folder = {
            name: block.name,
            item: []
        };

        // Create request for each test case
        block.testCases.forEach(tc => {
            const request = buildRequest(block.baseRequest, tc);
            folder.item.push(request);
        });

        collection.item.push(folder);
    });

    // Write output
    writeFileSync(outputPath, JSON.stringify(collection, null, 2), 'utf8');
    console.log(`✓ Created: ${outputPath} with ${collection.item.length} folders`);

} catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
}

function parseApiBlocks(content) {
    const blocks = [];

    // Split by API sections
    const sections = content.split(/(?=## API-\d+:)/);

    sections.forEach(section => {
        if (!section.trim() || !section.startsWith('## API-')) return;

        // Extract API ID and Name
        const headerMatch = section.match(/## (API-\d+): (.+)/);
        if (!headerMatch) return;

        const apiId = headerMatch[1];
        const apiName = headerMatch[2];

        // Parse base request
        const baseRequest = parseBaseRequest(section);

        // Parse test cases
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

function parseBaseRequest(section) {
    const request = {
        method: 'POST',
        url: '',
        headers: {},
        body: ''
    };

    // Extract method
    const methodMatch = section.match(/- Method:\s*(\w+)/);
    if (methodMatch) request.method = methodMatch[1];

    // Extract URL
    const urlMatch = section.match(/- URL:\s*`([^`]+)`/);
    if (urlMatch) request.url = urlMatch[1];

    // Extract headers
    const headerMatches = section.matchAll(/\s+- ([\w-]+):\s*`([^`]+)`/g);
    for (const match of headerMatches) {
        request.headers[match[1]] = match[2];
    }

    // Extract body - look for json code block
    const bodyMatch = section.match(/```json\n([\s\S]+?)\n```/);
    if (bodyMatch) {
        request.body = bodyMatch[1].trim();
    }

    return request;
}

function parseTestCases(section) {
    const testCases = [];

    // Find the test cases table
    const tableStart = section.indexOf('| ID');
    if (tableStart === -1) return testCases;

    const tableContent = section.substring(tableStart);
    const lines = tableContent.split('\n');

    // Skip header and separator lines
    let inTable = false;
    lines.forEach(line => {
        if (line.includes('| ID') || line.includes('---')) {
            inTable = true;
            return;
        }

        if (!inTable || !line.trim().startsWith('|')) return;

        // Parse table row
        const cells = line.split('|').map(c => c.trim()).filter(c => c);

        if (cells.length >= 5) {
            const tcId = cells[0];
            const category = cells[1];
            const description = cells[2];
            const overrides = cells[3];
            const expectedResult = cells[4];

            testCases.push({
                id: tcId,
                category,
                description,
                overrides: parseOverrides(overrides),
                expectedResult
            });
        }
    });

    return testCases;
}

function parseOverrides(overrideText) {
    const overrides = {};

    // Method
    const methodMatch = overrideText.match(/\*\*Method:\*\*\s*(\w+)/i);
    if (methodMatch) {
        overrides.method = methodMatch[1].toUpperCase();
    }

    // ✅ URL override (must be inside backticks)
    // Example: **URL:** `{{base_url}}/v2/web/odata/SETeams(999)`
    // Example: **URL:** `/SETeams(999)`
    // Example: **URL:** `(ruleID=19979)`
    const urlMatch = overrideText.match(/\*\*URL:\*\*\s*`([^`]+)`/i);
    if (urlMatch) {
        overrides.url = urlMatch[1].trim();
    }

    // Headers override
    if (overrideText.includes('**Headers:**')) {
        overrides.headers = {};

        // Authorization=None
        const authMatch = overrideText.match(/Authorization\s*[:=]\s*(None|null)/i);
        if (authMatch) overrides.headers['Authorization'] = null;

        // Content-Type=text/plain
        const ctMatch = overrideText.match(/Content-Type\s*[:=]\s*([^\n<*]+)/i);
        if (ctMatch) overrides.headers['Content-Type'] = ctMatch[1].trim();

        // Accept
        const acceptMatch = overrideText.match(/Accept\s*[:=]\s*([^\n<*]+)/i);
        if (acceptMatch) overrides.headers['Accept'] = acceptMatch[1].trim();

        // If-Match
        const ifMatchMatch = overrideText.match(/If-Match\s*[:=]\s*([^\n<*]+)/i);
        if (ifMatchMatch) overrides.headers['If-Match'] = ifMatchMatch[1].trim();
    }

    // Body override (✅ requires backticks)
    const bodyMatch = overrideText.match(/\*\*Body:\*\*\s*`([\s\S]*?)`/i);
    if (bodyMatch) {
        overrides.body = bodyMatch[1].trim();
    } else if (overrideText.toLowerCase().includes('malformed json')) {
        overrides.body = '{ invalid json';
    } else if (overrideText.match(/\*\*Body:\*\*\s*None/i)) {
        overrides.body = null;
    }

    return overrides;
}

function buildRequest(baseRequest, testCase) {
    const method = testCase.overrides.method || baseRequest.method;

    // ✅ Apply URL override if present
    // If override is relative like `/SETeams(999)` or `(ruleID=19979)` => append to base_url path style
    let url = baseRequest.url;
    if (testCase.overrides.url) {
        const o = testCase.overrides.url;

        if (o.startsWith('http') || o.includes('{{base_url}}')) {
            url = o;
        } else if (o.startsWith('/')) {
            // relative to base_url
            url = '{{base_url}}' + o;
        } else if (o.startsWith('(')) {
            // append (ruleID=...) to base URL path
            url = baseRequest.url + o;
        } else {
            // fallback: treat as raw
            url = o;
        }
    }

    // Clone headers
    const headers = { ...baseRequest.headers };

    // Apply header overrides
    if (testCase.overrides.headers) {
        Object.entries(testCase.overrides.headers).forEach(([key, value]) => {
            if (value === null) delete headers[key];
            else headers[key] = value;
        });
    }

    // Apply body override
    const body = testCase.overrides.body !== undefined
        ? testCase.overrides.body
        : baseRequest.body;

    // Build header array for Postman
    const headerArray = Object.entries(headers).map(([key, value]) => ({
        key,
        value,
        type: 'text'
    }));

    // Parse URL for Postman format
    const urlObj = parseUrl(url);

    // Build request object
    const testScript = buildTestScript(testCase);

    const request = {
        name: `${testCase.id} - ${testCase.description}`,
        request: {
            method,
            header: headerArray,
            url: urlObj
        },
        event: [
            {
                listen: 'test',
                script: {
                    type: 'text/javascript',
                    exec: testScript
                }
            }
        ]
    };

    // Add body if present and method supports it
    if (body && ['POST', 'PUT', 'PATCH'].includes(method)) {
        request.request.body = {
            mode: 'raw',
            raw: body,
            options: {
                raw: { language: 'json' }
            }
        };
    }

    return request;
}


function buildTestScript(testCase) {
    const expected = deriveExpectations(testCase.expectedResult);
    const lines = [];

    lines.push(`// Test Case: ${testCase.id}`);
    lines.push(`// Expected: ${testCase.expectedResult}`);
    lines.push('');

    if (expected.statusCodes.length > 0) {
        lines.push('pm.test("Status code matches expected", function () {');
        lines.push(`    pm.expect(pm.response.code).to.be.oneOf([${expected.statusCodes.join(', ')}]);`);
        lines.push('});');
        lines.push('');
    }

    if (expected.allowAny4xx) {
        lines.push('pm.test("Status code is 4xx", function () {');
        lines.push('    pm.expect(pm.response.code).to.be.within(400, 499, 415, 403, 404);');
        lines.push('});');
        lines.push('');
    }

    if (expected.not5xx) {
        lines.push('pm.test("No 5xx error", function () {');
        lines.push('    pm.expect(pm.response.code).to.be.below(500, 504);');
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

    if (lines[lines.length - 1] === '') {
        lines.pop();
    }

    return lines;
}

function deriveExpectations(expectedResult) {
    const text = expectedResult || '';
    const statusCodes = extractStatusCodes(text);
    const allowAny4xx = /appropriate 4xx/i.test(text);
    const not5xx = /No 5xx/i.test(text);
    const maxResponseTimeMs = extractResponseTime(text);

    const requireId = /contains id\b/i.test(text);
    const requireIdOrKey = /contains id\/key/i.test(text);
    const requireName = /correct `name`/i.test(text) || /correct name/i.test(text);
    const requireDescription = /correct `description`/i.test(text) || /correct description/i.test(text);

    return {
        statusCodes,
        allowAny4xx,
        not5xx,
        maxResponseTimeMs,
        requireId,
        requireIdOrKey,
        requireName,
        requireDescription
    };
}

function extractStatusCodes(text) {
    const codes = new Set();

    const slashMatch = text.match(/\b(\d{3})\s*\/\s*(\d{3})\b/g);
    if (slashMatch) {
        slashMatch.forEach(group => {
            group.split('/').forEach(part => {
                const num = Number(part.trim());
                if (!Number.isNaN(num)) codes.add(num);
            });
        });
    }

    const orMatch = text.match(/\b(\d{3})\b/g);
    if (orMatch) {
        orMatch.forEach(code => {
            const num = Number(code);
            if (!Number.isNaN(num)) codes.add(num);
        });
    }

    return Array.from(codes);
}

function extractResponseTime(text) {
    const msMatch = text.match(/<\s*(\d+)\s*seconds/i);
    if (msMatch) {
        const seconds = Number(msMatch[1]);
        if (!Number.isNaN(seconds)) return seconds * 1000;
    }
    return null;
}

function parseUrl(urlString) {
    // Simple URL parser for Postman format
    return {
        raw: urlString,
        protocol: '',
        host: ['{{base_url}}'],
        path: urlString.split('/').filter(p => p && !p.includes('{{'))
    };
}
