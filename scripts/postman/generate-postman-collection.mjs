import { readFileSync, writeFileSync } from 'fs';
import config from '../../config/app.config.mjs';

const apiXlsxPath = 'output.xlsx';
const envMdPath = config.envMd;
const outputPath = config.postmanCollectionOutput;

try {
    const XLSXModule = await import('xlsx');
    const XLSX = XLSXModule.default || XLSXModule;
    const workbook = XLSX.readFile(apiXlsxPath);
    const envContent = readFileSync(envMdPath, 'utf8');
    const baseUrl = extractBaseUrl(envContent);

    // Parse API blocks from workbook
    const apiBlocks = parseApiBlocksFromWorkbook(XLSX, workbook);

    console.log(`Found ${apiBlocks.length} API blocks`);

    // Generate Postman collection
    const collection = {
        info: {
            name: 'eProduct API Test Collection',
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
            const request = buildRequest(block.baseRequest, tc, baseUrl);
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

function parseApiBlocksFromWorkbook(XLSX, workbook) {
    const blocks = [];

    for (const sheetName of workbook.SheetNames) {
        const sheet = workbook.Sheets[sheetName];
        if (!sheet) continue;

        const rows = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' });
        const section = rows.map(r => String(r[0] ?? '').trim());
        const headerLine = section.find(line => /^##\s*API-\d+:/i.test(line));
        if (!headerLine) continue;

        const headerMatch = headerLine.match(/^##\s*(API-\d+):\s*(.+)$/i);
        if (!headerMatch) continue;

        const apiId = headerMatch[1];
        const apiName = headerMatch[2];

        const baseRequest = parseBaseRequestFromRows(rows);

        const testCases = parseTestCasesFromRows(rows);

        if (testCases.length > 0) {
            blocks.push({
                id: apiId,
                name: `${apiId}: ${apiName}`,
                baseRequest,
                testCases
            });
        }
    }

    return blocks;
}

function parseBaseRequestFromRows(rows) {
    const request = {
        method: 'POST',
        url: '',
        headers: {},
        body: ''
    };

    let inRequest = false;
    for (const row of rows) {
        const c0 = String(row[0] ?? '').trim();
        const c1 = String(row[1] ?? '').trim();
        if (/^###\s*Request\b/i.test(c0)) {
            inRequest = true;
            continue;
        }
        if (inRequest && /^###\s*/.test(c0)) break;

        if (!inRequest) continue;

        let m = c0.match(/^-+\s*Method:\s*(\w+)/i);
        if (!m && /^Method$/i.test(c0) && c1) m = [null, c1];
        if (m) {
            request.method = String(m[1]).toUpperCase();
            continue;
        }

        let u = c0.match(/^-+\s*URL:\s*`?([^`]+)`?/i);
        if (!u && /^URL$/i.test(c0) && c1) u = [null, c1];
        if (u) {
            request.url = String(u[1]).trim();
            continue;
        }

        let b = c0.match(/^-+\s*Body:\s*(.+)$/i);
        if (!b && /^Body$/i.test(c0) && c1) b = [null, c1];
        if (b) {
            const bodyText = String(b[1]).trim();
            if (/^none$/i.test(bodyText)) {
                request.body = '';
            } else {
                request.body = cleanupBodyText(bodyText);
            }
            continue;
        }
    }

    return request;
}

function parseTestCasesFromRows(rows) {
    const testCases = [];

    const headerIndex = rows.findIndex(row =>
        String(row[0] ?? '').trim().toLowerCase() === 'id' &&
        String(row[1] ?? '').trim().toLowerCase() === 'category' &&
        String(row[2] ?? '').trim().toLowerCase() === 'description' &&
        String(row[3] ?? '').trim().toLowerCase() === 'request override' &&
        String(row[4] ?? '').trim().toLowerCase() === 'expected result'
    );
    if (headerIndex === -1) return testCases;

    for (let i = headerIndex + 1; i < rows.length; i++) {
        const row = rows[i] || [];
        const tcId = String(row[0] ?? '').trim();
        const category = String(row[1] ?? '').trim();
        const description = String(row[2] ?? '').trim();
        const overrideText = String(row[3] ?? '').trim();
        const expectedResult = String(row[4] ?? '').trim();

        if (!tcId || !/^TC-\d+/i.test(tcId)) {
            if (!tcId && !category && !description && !overrideText && !expectedResult) break;
            continue;
        }

        testCases.push({
            id: tcId.toUpperCase(),
            category,
            description,
            overrides: parseOverrides(overrideText),
            expectedResult
        });
    }

    return testCases;
}

function parseOverrides(overrideText) {
    const overrides = {};

    const methodMatch = overrideText.match(/Method:\s*(\w+)/i);
    if (methodMatch) {
        overrides.method = methodMatch[1].toUpperCase();
    }

    if (/Content-Type:\s*/i.test(overrideText)) {
        overrides.headers = overrides.headers || {};
        const ctMatch = overrideText.match(/Content-Type:\s*([^|]+)/i);
        if (ctMatch) overrides.headers['Content-Type'] = ctMatch[1].trim();
    }

    const authMatch = overrideText.match(/Authorization[:=]\s*(None|null)/i);
    if (authMatch) {
        overrides.headers = overrides.headers || {};
        overrides.headers['Authorization'] = null;
    }

    if (/Body:\s*None/i.test(overrideText)) {
        overrides.body = null;
    } else if (/Body:\s*malformed JSON/i.test(overrideText)) {
        overrides.body = '{ invalid json';
    } else {
        const bodyMatch = overrideText.match(/Body:\s*`([^`]+)`/i) || overrideText.match(/Body:\s*([^|]+)$/i);
        if (bodyMatch && !/^none$/i.test(bodyMatch[1].trim())) {
            overrides.body = bodyMatch[1].trim();
        }
    }

    const pathIdMatch = overrideText.match(/Path:\s*([A-Za-z0-9_]+)\s*=\s*([^|]+)/i);
    if (pathIdMatch) {
        overrides.pathParam = {
            key: pathIdMatch[1],
            value: pathIdMatch[2].trim()
        };
    }

    return overrides;
}

function cleanupBodyText(text) {
    const trimmed = text.trim();
    const fenced = trimmed.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/i);
    if (fenced) return fenced[1].trim();
    return trimmed;
}

function buildRequest(baseRequest, testCase, baseUrl) {
    // Merge base request with overrides
    const method = testCase.overrides.method || baseRequest.method;
    let url = baseRequest.url;
    if (testCase.overrides.pathParam) {
        const { key, value } = testCase.overrides.pathParam;
        const safeValue = encodeURIComponent(value);
        url = url
            .replace(new RegExp(`\\{${key}\\}`, 'g'), safeValue)
            .replace(new RegExp(`:${key}(?=/|$)`, 'g'), safeValue);
    }

    // Clone headers
    const headers = { ...baseRequest.headers };

    // Apply header overrides
    if (testCase.overrides.headers) {
        Object.entries(testCase.overrides.headers).forEach(([key, value]) => {
            if (value === null) {
                delete headers[key];
            } else {
                headers[key] = value;
            }
        });
    }

    // Apply body override
    let body = testCase.overrides.body !== undefined
        ? testCase.overrides.body
        : baseRequest.body;

    // Build header array for Postman
    const headerArray = Object.entries(headers).map(([key, value]) => ({
        key,
        value,
        type: 'text'
    }));

    // Parse URL for Postman format
    const urlObj = parseUrl(url, baseUrl);

    // Build request object
    const testScript = buildTestScript(testCase);

    const request = {
        name: `${testCase.id} - ${testCase.description}`,
        request: {
            method: method,
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
                raw: {
                    language: 'json'
                }
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

function parseUrl(urlString, baseUrl) {
    let raw = urlString;
    if (raw?.includes('{{baseUrl}}')) {
        raw = raw.replace(/{{baseUrl}}/g, '');
    }
    if (/\{\{\s*base_url\s*\}\}/i.test(raw)) return raw;

    if (baseUrl) {
        const normalizedBase = baseUrl.replace(/\/+$/, '');
        if (raw.startsWith(normalizedBase)) {
            return `{{base_url}}${raw.slice(normalizedBase.length)}`;
        }

        try {
            const base = new URL(normalizedBase);
            const baseFull = `${base.origin}${base.pathname.replace(/\/+$/, '')}`;
            if (raw.startsWith(baseFull)) {
                return `{{base_url}}${raw.slice(baseFull.length)}`;
            }
        } catch {
            // ignore invalid base URL
        }
    }

    try {
        const url = new URL(raw);
        return `{{base_url}}${url.pathname}${url.search || ''}`;
    } catch {
        if (raw.startsWith('/')) return `{{base_url}}${raw}`;
        return `{{base_url}}/${raw}`;
    }
}

function extractBaseUrl(content) {
    const sectionMatch = content.match(/###\s*base_url[\s\S]*?(?=^###\s|\Z)/im);
    if (!sectionMatch) return null;

    const section = sectionMatch[0];
    const valueMatch =
        section.match(/- value:\s*`([^`]+)`/i) ||
        section.match(/- value:\s*([^\n]+)/i);
    return valueMatch ? valueMatch[1].trim() : null;
}
