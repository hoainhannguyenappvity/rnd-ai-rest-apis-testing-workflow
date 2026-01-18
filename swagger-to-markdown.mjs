#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';

const CONFIG = {
    swaggerUrl: 'http://localhost:8000/swagger/swagger-output.json',
    outputDir: /*'C:/Source/KMI/rnd-ai-rest-apis-testing-workflow/swagger'*/ './swagger',
    outputFilename: 'api.md',
    baseUrl: 'http://localhost:8000'
};

/**
 * ========================================
 * MAIN EXECUTION
 * ========================================
 */
async function main() {
    console.log('Swagger to Markdown Converter\n');
    console.log(' Configuration:');
    console.log(`Swagger URL: ${CONFIG.swaggerUrl}`);
    console.log(`Output Dir:  ${CONFIG.outputDir}\n`);

    const startTime = Date.now();

    try {
        // Step 1: Fetch Swagger JSON
        console.log('Fetching Swagger JSON...');
        const swaggerJson = await fetchSwagger(CONFIG.swaggerUrl);
        console.log('Swagger JSON fetched successfully\n');

        // Step 2: Convert to Markdown
        console.log('Converting to Markdown...');
        const markdown = convertToMarkdown(swaggerJson);
        const apisCount = countApis(swaggerJson.paths);
        console.log(`Converted ${apisCount} APIs\n`);

        // Step 3: Save to file
        console.log('Saving to file...');
        const filename = CONFIG.outputFilename || `api-${new Date().toISOString().split('T')[0]}.md`;
        const filepath = await saveMarkdown(markdown, filename);

        const duration = ((Date.now() - startTime) / 1000).toFixed(2);

        console.log('File saved successfully!\n');
        console.log('Summary:');
        console.log(`File:      ${filepath}`);
        console.log(`APIs:      ${apisCount}`);
        console.log(`Size:      ${(markdown.length / 1024).toFixed(2)} KB`);
        console.log(`Duration:  ${duration}s`);

        process.exit(0);
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        const stack = error instanceof Error ? error.stack : undefined;
        console.error('Г?O Error:', message);
        // console.error('\ndY'Э Stack trace:');
        console.error(stack || 'No stack trace available');
        process.exit(1);
    }
}

/**
 * Fetch Swagger JSON from URL
 */
async function fetchSwagger(url) {
    let response;
    try {
        response = await fetch(url);
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        throw new Error(`Failed to fetch Swagger from ${url}: ${message}`);
    }

    if (!response.ok) {
        throw new Error(`Failed to fetch Swagger: ${response.status} ${response.statusText}`);
    }

    try {
        return await response.json();
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        throw new Error(`Invalid Swagger JSON from ${url}: ${message}`);
    }
}

/**
 * Convert Swagger JSON to Markdown
 */
function convertToMarkdown(swaggerJson) {
    const info = swaggerJson?.info ?? {};
    const servers = swaggerJson?.servers ?? [];
    const paths = swaggerJson?.paths ?? {};
    const baseUrl = getBaseUrl(servers);

    const lines = [
        '# API Test Specifications',
        '',
        'This document defines REST APIs to be tested automatically by Codex AI. Each API block is independent and includes expectations and test scenarios.',
        '',
        `**Service:** ${info.title || 'Unknown Service'}`,
        `**Version:** ${info.version || 'Unknown Version'}`,
        info.description ? `**Description:** ${info.description}` : '',
        `**Base URL:** ${baseUrl}`,
        '',
        '---',
        ''
    ].filter(line => line !== '');

    let apiIndex = 1;

    for (const [apiPath, methods] of Object.entries(paths)) {
        for (const [method, details] of Object.entries(methods ?? {})) {
            const apiId = `API-${String(apiIndex).padStart(3, '0')}`;
            const apiName = generateApiName(apiPath, method);

            lines.push(
                generateApiSection(
                    apiId,
                    apiName,
                    apiPath,
                    method,
                    details ?? {},
                    baseUrl
                ),
                '---',
                ''
            );

            apiIndex += 1;
        }
    }

    return lines.join('\n');
}

/**
 * Generate API name from path and method
 */
function generateApiName(apiPath, method) {
    const cleanPath = apiPath.replace(/[{}]/g, '').replace(/\//g, ' ').trim();
    const methodName = method.toUpperCase();

    if (apiPath === '/') return `${methodName} ROOT`;

    const words = cleanPath.split(/[\s/]+/).filter(Boolean);
    const name = words.map(word => word.toUpperCase()).join(' ');

    return `${methodName} ${name}`.trim() || methodName;
}

/**
 * Generate API section in Markdown
 */
function generateApiSection(apiId, apiName, apiPath, method, details, baseUrl) {
    const methodUpper = method.toUpperCase();
    const lines = [
        `## ${apiId}: ${apiName}`,
        '',
        '### Description',
        '',
        details.description || `${methodUpper} operation for ${apiPath}`,
        '',
        '',
        `### Request { ${apiId}: ${apiName} }`,
        '',
        `- Method: ${methodUpper}`,
        `- URL: \`${baseUrl}${apiPath}\``
    ];

    // Headers
    const headers = extractParams(details.parameters, 'header');
    lines.push('- Headers:');
    if (headers.length > 0) {
        for (const header of headers) {
            lines.push(`  - ${header.name}: \`{{${header.name}}}\``);
        }
    } else {
        lines.push('  - Content-Type: `application/json`');
    }

    // Path Parameters
    const pathParams = extractParams(details.parameters, 'path');
    if (pathParams.length > 0) {
        lines.push('- Path Params:');
        for (const param of pathParams) {
            lines.push(`  - ${param.name}: \`{{${param.name}}}\``);
        }
    }

    // Query Parameters
    const queryParams = extractParams(details.parameters, 'query');
    if (queryParams.length > 0) {
        lines.push('- Query Params:');
        for (const param of queryParams) {
            lines.push(`  - ${param.name}: \`{{${param.name}}}\``);
        }
    } else {
        lines.push('- Params: None');
    }

    // Request Body
    lines.push('- Body: ');
    if (details.requestBody) {
        const bodyExample = generateBodyExample(details.requestBody);
        lines.push('', '```json', JSON.stringify(bodyExample, null, 2), '```');
    } else {
        lines[lines.length - 1] = '- Body: None';
    }

    // Test Cases
    lines.push('', `### Test Cases { ${apiId}: ${apiName} }`, '');
    lines.push(generateTestCases(method, details, pathParams, queryParams, headers));

    return lines.join('\n');
}

/**
 * Extract parameters by type
 */
function extractParams(parameters, type) {
    if (!Array.isArray(parameters)) return [];
    return parameters.filter(param => param.in === type);
}

/**
 * Generate request body example
 */
function generateBodyExample(requestBody) {
    if (!requestBody?.content) return {};

    const content = requestBody.content['application/json'];
    if (!content?.schema) return {};

    const schema = content.schema;
    const schemaExample = schema.example ?? content.example;

    if (schema.properties) {
        const example = {};
        for (const [key, value] of Object.entries(schema.properties)) {
            example[key] = value?.example ?? '';
        }
        return example;
    }

    return schemaExample || {};
}

/**
 * Generate test cases table
 */
function generateTestCases(method, details, pathParams, queryParams, headers) {
    const testCases = [];
    let tcIndex = 1;
    const methodUpper = method.toUpperCase();
    const responseCodes = Object.keys(details.responses || {}).filter(
        code => code !== 'default'
    );

    const hasAuth = headers.some(header => {
        const name = header.name.toLowerCase();
        return name.includes('userid') || name.includes('auth');
    });

    const hasBody = Boolean(details.requestBody);

    // Positive Test Case
    testCases.push({
        id: `TC-${String(tcIndex++).padStart(3, '0')}`,
        category: 'Positive',
        description: `Valid ${methodUpper} request`,
        override: `Method: ${methodUpper}`,
        expected: responseCodes.includes('200') ? '200 OK' :
            responseCodes.includes('201') ? '201 Created' :
                '200-299 Success'
    });

    // Authentication Tests
    if (hasAuth) {
        const authHeader = headers[0]?.name || 'Authorization';
        testCases.push({
            id: `TC-${String(tcIndex++).padStart(3, '0')}`,
            category: 'Negative',
            description: 'Unauthorized request',
            override: `Headers: ${authHeader} = None`,
            expected: '401 Unauthorized'
        });

        testCases.push({
            id: `TC-${String(tcIndex++).padStart(3, '0')}`,
            category: 'Negative',
            description: 'Invalid auth token',
            override: `Headers: ${authHeader} = "invalid-token"`,
            expected: '401 Unauthorized'
        });
    }

    // Path Parameter Tests
    if (pathParams.length > 0) {
        for (const param of pathParams) {
            testCases.push({
                id: `TC-${String(tcIndex++).padStart(3, '0')}`,
                category: 'Negative',
                description: `Invalid ${param.name}`,
                override: `Path: ${param.name} = "invalid-id"`,
                expected: '400 Bad Request or 404 Not Found'
            });

            testCases.push({
                id: `TC-${String(tcIndex++).padStart(3, '0')}`,
                category: 'Negative',
                description: `Missing ${param.name}`,
                override: `Path: ${param.name} = None`,
                expected: '400 Bad Request'
            });
        }
    }

    // Request Body Tests
    if (hasBody && ['post', 'put', 'patch'].includes(method.toLowerCase())) {
        testCases.push({
            id: `TC-${String(tcIndex++).padStart(3, '0')}`,
            category: 'Negative',
            description: 'Missing request body',
            override: 'Body: None',
            expected: '400 Bad Request'
        });

        testCases.push({
            id: `TC-${String(tcIndex++).padStart(3, '0')}`,
            category: 'Negative',
            description: 'Invalid JSON body',
            override: 'Body: malformed JSON',
            expected: '400 Bad Request'
        });

        testCases.push({
            id: `TC-${String(tcIndex++).padStart(3, '0')}`,
            category: 'Negative',
            description: 'Invalid Content-Type',
            override: 'Headers: Content-Type = "text/plain"',
            expected: '415 Unsupported Media Type'
        });
    }

    // Method Test
    testCases.push({
        id: `TC-${String(tcIndex++).padStart(3, '0')}`,
        category: 'Negative',
        description: 'Invalid HTTP method',
        override: `Method: ${method === 'get' ? 'POST' : 'GET'}`,
        expected: '405 Method Not Allowed'
    });

    // Security Test
    testCases.push({
        id: `TC-${String(tcIndex++).padStart(3, '0')}`,
        category: 'Security',
        description: 'SQL injection in parameter',
        override: pathParams.length > 0
            ? `Path: ${pathParams[0].name} = "' OR '1'='1"`
            : 'Query: injection test',
        expected: '400 Bad Request or safely handled'
    });

    // Performance Test
    testCases.push({
        id: `TC-${String(tcIndex++).padStart(3, '0')}`,
        category: 'Performance',
        description: 'Response time check',
        override: `Method: ${methodUpper}`,
        expected: '200-299, response time < 3s'
    });

    // Generate table
    let table = '| ID     | Category    | Description                  | Request Override                        | Expected Result                  |\n';
    table += '| ------ | ----------- | ---------------------------- | --------------------------------------- | -------------------------------- |\n';

    for (const testCase of testCases) {
        table += `| ${testCase.id} | ${testCase.category.padEnd(11)} | ${testCase.description.padEnd(28)} | ${testCase.override.padEnd(39)} | ${testCase.expected.padEnd(32)} |\n`;
    }

    return table;
}

/**
 * Count APIs in Swagger paths
 */
function countApis(paths) {
    if (!paths || typeof paths !== 'object') return 0;
    return Object.values(paths).reduce(
        (count, methods) => count + Object.keys(methods || {}).length, 0
    );
}

/**
 * Resolve base URL from swagger servers or config
 */
function getBaseUrl(servers) {
    return servers?.[0]?.url || CONFIG.baseUrl;
}

/**
 * Save markdown to file
 */
async function saveMarkdown(markdown, filename) {
    const filepath = path.join(CONFIG.outputDir, filename);

    // Ensure directory exists
    await fs.mkdir(CONFIG.outputDir, { recursive: true });

    // Write file
    await fs.writeFile(filepath, markdown, 'utf-8');

    return filepath;
}

// ========================================
// RUN
// ========================================
main();
