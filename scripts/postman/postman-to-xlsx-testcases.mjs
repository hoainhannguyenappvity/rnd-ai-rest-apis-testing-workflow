#!/usr/bin/env node

import fs from 'node:fs';
import { pathToFileURL } from 'node:url';
/* =======================
 * CONFIG
 * ======================= */
import config from '../../config/app.config.mjs';

const postmanFile = config.postmanCollectionOutput;
const outputFile = config.apiXlsxPath;
const environmentFile = config.postmanEnvironmentOutput;

class PostmanToCSVConverter {
	constructor(inputFile = postmanFile, outputFileArg = outputFile, environmentFileArg = environmentFile) {
		this.postmanFile = inputFile;
		this.outputFile = outputFileArg;
		this.environmentFile = environmentFileArg;
		this.environmentVars = new Map();
		this.apiCounter = 1;
		this.apiEntries = [];
		this.sheetNames = new Set();
		this.collectionMeta = {
			service: 'N/A',
			version: 'N/A',
			baseUrl: 'N/A'
		};
	}

	async convert() {
		try {
			const postmanData = JSON.parse(fs.readFileSync(this.postmanFile, 'utf-8'));
			this.loadEnvironment();

			console.log('Reading Postman collection...');
			console.log(`Collection: ${postmanData.info?.name || 'N/A'}`);
			console.log(`Environment file: ${this.environmentFile}`);
			console.log(`Environment variables loaded: ${this.environmentVars.size}`);

			this.collectionMeta = this.extractCollectionMeta(postmanData);
			this.processItems(postmanData.item);

			await this.writeXLSX();

			console.log('Conversion completed successfully.');
			console.log(`Output file: ${this.outputFile}`);
			console.log(`Total APIs: ${this.apiEntries.length}`);
			const totalCases = this.apiEntries.reduce((sum, api) => sum + api.testCases.length, 0);
			console.log(`Total test cases: ${totalCases}`);
		} catch (error) {
			console.error(`Error during conversion: ${error.message}`);
			throw error;
		}
	}

	loadEnvironment() {
		if (!fs.existsSync(this.environmentFile)) {
			console.log(`Environment file not found: ${this.environmentFile}`);
			return;
		}

		const envData = JSON.parse(fs.readFileSync(this.environmentFile, 'utf-8'));
		for (const item of envData.values || []) {
			if (item.enabled === false) continue;
			if (item.key) this.environmentVars.set(item.key, String(item.value || ''));
		}
	}

	processItems(items, parentPath = '') {
		for (const item of items || []) {
			if (item.item) {
				const folderPath = parentPath ? `${parentPath}/${item.name}` : item.name;
				this.processItems(item.item, folderPath);
			} else if (item.request) {
				this.processRequest(item, parentPath);
			}
		}
	}

	processRequest(item, parentPath) {
		const request = item.request || {};
		const method = String(request.method || 'GET').toUpperCase();
		const urlTemplate = this.buildURL(request.url);
		const apiId = `API-${String(this.apiCounter).padStart(3, '0')}`;
		const requestEntry = {
			apiId,
			apiName: this.buildEndpointName(parentPath, method, urlTemplate),
			method,
			urlTemplate,
			url: this.resolveTemplate(urlTemplate),
			headers: this.getHeaders(request.header),
			params: this.getParams(request.url),
			body: this.getBody(request.body),
			bodySummary: this.getBodySummary(request.body),
			description: this.getDescription(item, request),
			folderPath: parentPath || 'Root',
			testCases: this.generateTemplateTestCases(item, request, method, urlTemplate)
		};
		this.apiEntries.push(requestEntry);
		this.apiCounter++;
	}

	extractCollectionMeta(postmanData) {
		const service = postmanData?.info?.name || 'N/A';
		let version = postmanData?.info?.version ?? 'N/A';
		if (typeof version === 'object' && version !== null) {
			version = version.raw || version.string || version.major || 'N/A';
		}

		let baseUrl = this.findBaseUrlFromItems(postmanData?.item);
		if (!baseUrl || baseUrl === 'N/A') {
			baseUrl = this.findBaseUrlFromEnvironment();
		}

		return {
			service: String(service),
			version: String(version),
			baseUrl: String(baseUrl || 'N/A')
		};
	}

	findBaseUrlFromItems(items) {
		for (const item of items || []) {
			if (item?.item) {
				const nested = this.findBaseUrlFromItems(item.item);
				if (nested && nested !== 'N/A') return nested;
				continue;
			}
			if (!item?.request?.url) continue;
			const rawUrl = this.buildURL(item.request.url);
			const resolvedUrl = this.resolveTemplate(rawUrl);
			const base = this.extractBaseUrl(resolvedUrl) || this.extractBaseUrl(rawUrl);
			if (base && base !== 'N/A') return base;
		}
		return 'N/A';
	}

	findBaseUrlFromEnvironment() {
		for (const key of ['baseUrl', 'base_url', 'host', 'apiUrl', 'api_url', 'url']) {
			const value = this.environmentVars.get(key);
			if (!value) continue;
			const base = this.extractBaseUrl(value) || value;
			if (base) return base;
		}
		return 'N/A';
	}

	extractBaseUrl(url) {
		const match = String(url || '').match(/^(https?:\/\/[^/]+)/i);
		return match ? match[1] : null;
	}

	buildURL(urlObj) {
		if (!urlObj) return 'N/A';

		if (typeof urlObj === 'string') {
			return this.normalizePathVariables(urlObj);
		}

		if (urlObj.raw) {
			return this.normalizePathVariables(String(urlObj.raw));
		}

		let url = '';
		if (urlObj.host) {
			url = Array.isArray(urlObj.host) ? urlObj.host.join('.') : String(urlObj.host);
		}

		if (urlObj.path) {
			const pathStr = Array.isArray(urlObj.path) ? urlObj.path.join('/') : String(urlObj.path);
			url = url ? `${url}/${pathStr}` : pathStr;
		}

		return this.normalizePathVariables(url || 'N/A');
	}

	normalizePathVariables(url) {
		return String(url).replace(/\/:([A-Za-z0-9_]+)/g, '/{$1}');
	}

	resolveTemplate(value) {
		if (!value || value === 'N/A') return value || 'N/A';
		return String(value).replace(/\{\{([^{}]+)\}\}/g, (match, key) => {
			const envValue = this.environmentVars.get(key.trim());
			return envValue ?? match;
		});
	}

	buildEndpointName(parentPath, method, urlTemplate) {
		const folder = (parentPath || '').split('/').pop() || '';
		const pathOnly = this.extractPath(urlTemplate);
		if (folder) return `${folder} [${method} ${pathOnly}]`;
		return `${method} ${pathOnly}`;
	}

	extractPath(url) {
		if (!url) return '/';
		const withoutTemplate = String(url).replace(/\{\{[^{}]+\}\}/g, '').trim();
		const withProtocol = withoutTemplate.match(/^https?:\/\/[^/]+(\/.*)?$/i);
		if (withProtocol) return withProtocol[1] || '/';
		const startsWithSlash = withoutTemplate.startsWith('/');
		return startsWithSlash ? withoutTemplate : `/${withoutTemplate}`;
	}

	getHeaders(headers) {
		if (!Array.isArray(headers) || headers.length === 0) return 'NONE';
		const activeHeaders = headers.filter(
			h => !h.disabled && h.key && h.value !== undefined && String(h.key).toLowerCase() !== 'url'
		);
		if (activeHeaders.length === 0) return 'NONE';
		return activeHeaders.map(h => `${h.key}: ${this.resolveTemplate(String(h.value))}`).join('; ');
	}

	getParams(urlObj) {
		if (!urlObj || !Array.isArray(urlObj.query) || urlObj.query.length === 0) return 'NONE';
		const activeParams = urlObj.query.filter(q => !q.disabled && q.key);
		if (activeParams.length === 0) return 'NONE';
		return activeParams
			.map(q => `${q.key}${q.value !== undefined ? `=${this.resolveTemplate(String(q.value))}` : ''}`)
			.join('; ');
	}

	getBody(body) {
		if (!body || !body.mode) return 'None';

		if (body.mode === 'raw') {
			const raw = String(body.raw || '').trim();
			if (!raw) return 'None';
			try {
				const parsed = JSON.parse(raw);
				return `\`\`\`json\n${JSON.stringify(parsed, null, 2)}\n\`\`\``;
			} catch {
				return `\`\`\`\n${raw}\n\`\`\``;
			}
		}

		if (body.mode === 'formdata' || body.mode === 'urlencoded') {
			const rows = Array.isArray(body[body.mode]) ? body[body.mode] : [];
			const payload = {};
			for (const row of rows) {
				if (row?.disabled || !row?.key) continue;
				payload[row.key] = row.value ?? '';
			}
			if (Object.keys(payload).length === 0) return 'None';
			return `\`\`\`json\n${JSON.stringify(payload, null, 2)}\n\`\`\``;
		}

		return 'None';
	}

	getBodySummary(body) {
		if (!body || !body.mode) return 'Body: None';
		if (body.mode === 'raw') {
			const raw = String(body.raw || '').trim();
			if (!raw) return 'Body: None';
			try {
				JSON.parse(raw);
				return 'Body: JSON';
			} catch {
				return 'Body: Raw';
			}
		}
		if (body.mode === 'formdata') return 'Body: FormData';
		if (body.mode === 'urlencoded') return 'Body: URLEncoded';
		return `Body: ${String(body.mode).toUpperCase()}`;
	}

	getDescription(item, request) {
		const desc = item?.description ?? request?.description ?? '';
		if (!desc) return 'N/A';
		if (typeof desc === 'string') return desc.trim() || 'N/A';
		if (typeof desc === 'object' && desc !== null) {
			if (typeof desc.content === 'string') return desc.content.trim() || 'N/A';
		}
		return String(desc);
	}

	generateTemplateTestCases(item, request, method, urlTemplate) {
		const hasPathParam = /\/\{[^}]+\}|\/:[A-Za-z0-9_]+/.test(urlTemplate);
		const hasBody = ['POST', 'PUT', 'PATCH'].includes(method);
		const idTokenMatch = String(urlTemplate).match(/\/\{([^}]+)\}|\/:([A-Za-z0-9_]+)/);
		const idToken = idTokenMatch ? (idTokenMatch[1] || idTokenMatch[2]) : 'id';
		const expectedFromScript = this.extractExpected(item?.event);
		const methodMismatch = method === 'GET' ? 'POST/PUT mismatch' : 'GET/POST mismatch';

		const cases = [
			{
				category: 'Positive',
				description: `Valid ${method} request`,
				override: `Method: ${method}`,
				expected: expectedFromScript === 'See Postman test script' ? '200-299 Success' : expectedFromScript
			},
			{
				category: 'Negative',
				description: 'Invalid HTTP method',
				override: `Method: ${methodMismatch}`,
				expected: '405 Method Not Allowed'
			}
		];

		if (hasPathParam) {
			cases.push(
				{
					category: 'Negative',
					description: `Invalid ${idToken}`,
					override: `Path: ${idToken} = invalid-id`,
					expected: '400 or 404'
				},
				{
					category: 'Negative',
					description: `Missing ${idToken}`,
					override: `Path: ${idToken} = None`,
					expected: '400 Bad Request'
				},
				{
					category: 'Security',
					description: `SQL injection in path param`,
					override: `Path: ${idToken} = ' OR 1=1`,
					expected: 'Safely handled'
				}
			);
		}

		if (hasBody) {
			cases.push(
				{
					category: 'Negative',
					description: 'Missing request body',
					override: 'Body: None',
					expected: '400 Bad Request'
				},
				{
					category: 'Negative',
					description: 'Invalid JSON body',
					override: 'Body: malformed JSON',
					expected: '400 Bad Request'
				},
				{
					category: 'Negative',
					description: 'Invalid Content-Type',
					override: 'Content-Type: text/plain',
					expected: '415 Unsupported Media Type'
				}
			);
		}

		cases.push({
			category: 'Performance',
			description: 'Response time check',
			override: `Method: ${method}`,
			expected: '< 3s'
		});

		return cases.map((tc, idx) => ({
			tcId: `TC-${String(idx + 1).padStart(3, '0')}`,
			category: tc.category,
			description: tc.description,
			override: tc.override,
			expected: tc.expected
		}));
	}

	buildTestCase(item, request, index) {
		const rawName = item.name || `TC-${String(index).padStart(3, '0')}`;
		const tcId = `TC-${String(index).padStart(3, '0')}`;
		const description = this.extractDescription(rawName);
		const expected = this.extractExpected(item.event);
		const category = this.inferCategory(description, expected);
		const override = this.buildRequestOverride(request);

		return {
			tcId,
			category,
			description,
			override,
			expected,
			source: rawName
		};
	}

	extractTestCaseId(name, index) {
		const match = String(name).match(/\b(TC-\d+)\b/i);
		if (match) return match[1].toUpperCase();
		return `TC-${String(index).padStart(3, '0')}`;
	}

	extractDescription(name) {
		return String(name)
			.replace(/^\s*TC-\d+\s*[-:]\s*/i, '')
			.trim() || 'N/A';
	}

	extractExpected(events) {
		const expectedValues = [];
		const statusCodes = new Set();
		const perfHints = [];

		for (const event of events || []) {
			if (event.listen !== 'test') continue;
			const exec = event.script?.exec || [];
			for (const lineRaw of exec) {
				const line = String(lineRaw).trim();

				const expectedMatch = line.match(/^\/\/\s*Expected:\s*(.+)$/i);
				if (expectedMatch) expectedValues.push(expectedMatch[1].trim());

				const oneOfMatch = line.match(/pm\.expect\(pm\.response\.code\)\.to\.be\.oneOf\(\[([^\]]+)\]\)/i);
				if (oneOfMatch) {
					oneOfMatch[1]
						.split(',')
						.map(token => token.trim())
						.filter(token => /^\d+$/.test(token))
						.forEach(code => statusCodes.add(code));
				}

				const eqlMatch = line.match(/pm\.expect\(pm\.response\.code\)\.to\.(?:eql|equal)\((\d+)\)/i);
				if (eqlMatch) statusCodes.add(eqlMatch[1]);

				if (line.toLowerCase().includes('response time') || /<\s*\d+\s*(ms|s)/i.test(line)) {
					perfHints.push(line.replace(/^\/\//, '').trim());
				}
			}
		}

		if (statusCodes.size > 0) {
			expectedValues.push(`Status code in [${[...statusCodes].join(', ')}]`);
		}
		expectedValues.push(...perfHints);

		if (expectedValues.length === 0) return 'See Postman test script';
		return [...new Set(expectedValues)].join(' | ');
	}

	inferCategory(description, expected) {
		const text = `${description} ${expected}`.toLowerCase();

		if (text.includes('response time') || text.includes('performance') || /<\s*\d+\s*(ms|s)/.test(text)) {
			return 'Performance';
		}
		if (text.includes('forbidden') || text.includes('unauthorized') || /\b401\b|\b403\b/.test(text)) {
			return 'Security';
		}
		if (
			text.includes('invalid') ||
			text.includes('missing') ||
			text.includes('error') ||
			text.includes('not found') ||
			text.includes('fail') ||
			/\b4\d\d\b|\b5\d\d\b/.test(text)
		) {
			return 'Negative';
		}
		return 'Positive';
	}

	buildRequestOverride(request) {
		const parts = [];
		parts.push(`Method: ${String(request.method || 'GET').toUpperCase()}`);

		const headers = this.getHeaders(request.header);
		if (headers !== 'NONE') parts.push(`Headers: ${headers}`);

		const params = this.getParams(request.url);
		if (params !== 'NONE') parts.push(`Params: ${params}`);

		const body = this.getBodySummary(request.body);
		if (body !== 'Body: None') parts.push(body);

		return parts.join(' | ');
	}

	async writeXLSX() {
		try {
			const XLSX = await import('xlsx');
			const wb = XLSX.utils.book_new();

			for (const apiEntry of this.apiEntries) {
				const sheetName = this.makeSheetName(`${apiEntry.apiId}-${apiEntry.method}-${this.extractPath(apiEntry.urlTemplate)}`);
				const rows = [];
				const boldRows = [];

				const addRow = row => {
					rows.push(row);
					return rows.length;
				};

				const apiLabel = `${apiEntry.apiId}: ${apiEntry.method} ${apiEntry.urlTemplate}`;
				boldRows.push(addRow([`## ${apiLabel}`]));
				addRow(['']);
				boldRows.push(addRow(['### Description']));
				addRow([apiEntry.description]);
				addRow(['']);
				boldRows.push(addRow([`### Request { ${apiLabel} }`]));
				addRow([`- Method: ${apiEntry.method}`]);
				addRow([`- URL: \`${apiEntry.url}\``]);
				addRow([`- Body: ${apiEntry.body === 'None' ? 'None' : 'JSON'}`]);
				addRow(['']);
				boldRows.push(addRow([`### Test Cases { ${apiLabel} }`]));
				boldRows.push(addRow(['ID', 'Category', 'Description', 'Request Override', 'Expected Result']));
				for (const tc of apiEntry.testCases) {
					addRow([tc.tcId, tc.category, tc.description, tc.override, tc.expected]);
				}

				const ws = XLSX.utils.aoa_to_sheet(rows);
				ws['!cols'] = [{ wch: 44 }, { wch: 14 }, { wch: 30 }, { wch: 28 }, { wch: 28 }];
				this.applyBoldRows(XLSX, ws, boldRows);
				XLSX.utils.book_append_sheet(wb, ws, sheetName);
			}

			XLSX.writeFile(wb, this.outputFile);
			console.log(`XLSX file: ${this.outputFile}`);
		} catch (error) {
			if (error?.code === 'ERR_MODULE_NOT_FOUND') {
				console.log('XLSX export skipped (install xlsx package: npm install xlsx)');
				return;
			}
			console.error(`Failed to export XLSX: ${error.message}`);
			throw error;
		}
	}

	makeSheetName(baseName) {
		const sanitized = baseName.replace(/[\\/?*\[\]:]/g, '-').replace(/\s+/g, ' ').trim();
		let name = sanitized.slice(0, 31) || 'Sheet';
		if (!this.sheetNames.has(name)) {
			this.sheetNames.add(name);
			return name;
		}

		let counter = 2;
		while (true) {
			const suffix = `-${counter}`;
			const trimmed = sanitized.slice(0, 31 - suffix.length) || 'Sheet';
			name = `${trimmed}${suffix}`;
			if (!this.sheetNames.has(name)) {
				this.sheetNames.add(name);
				return name;
			}
			counter++;
		}
	}

	applyBoldRows(XLSX, worksheet, rowNumbers) {
		if (!worksheet || !worksheet['!ref']) return;
		const range = XLSX.utils.decode_range(worksheet['!ref']);
		for (const rowNumber of rowNumbers) {
			const rowIndex = rowNumber - 1;
			if (rowIndex < range.s.r || rowIndex > range.e.r) continue;
			for (let c = range.s.c; c <= range.e.c; c++) {
				const cellAddress = XLSX.utils.encode_cell({ r: rowIndex, c });
				const cell = worksheet[cellAddress];
				if (!cell) continue;
				cell.s = { font: { bold: true } };
			}
		}
	}
}

async function main() {
	const args = process.argv.slice(2);
	let inputFile = postmanFile;
	let outputFileArg = outputFile;
	let environmentFileArg = environmentFile;

	if (args.length === 2 || args.length === 3) {
		[inputFile, outputFileArg] = args;
		if (args.length === 3) environmentFileArg = args[2];
	} else if (args.length !== 0) {
		process.exit(1);
	}

	if (!fs.existsSync(inputFile)) {
		console.error(`Input file not found: ${inputFile}`);
		process.exit(1);
	}

	if (!outputFileArg.toLowerCase().endsWith('.xlsx')) {
		outputFileArg = `${outputFileArg}.xlsx`;
	}

	const converter = new PostmanToCSVConverter(inputFile, outputFileArg, environmentFileArg);
	await converter.convert();
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
	main().catch(error => {
		console.error('Fatal error:', error);
		process.exit(1);
	});
}

export default PostmanToCSVConverter;
