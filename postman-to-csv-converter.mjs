#!/usr/bin/env node

import fs from 'node:fs';
import { pathToFileURL } from 'node:url';

const postmanFile = 'postman/eProduct.postman_collection.json';
const outputFile = 'output.xlsx';
const environmentFile = 'postman/eProduct.postman_environment.json';

class PostmanToCSVConverter {
  constructor(inputFile = postmanFile, outputFileArg = outputFile, environmentFileArg = environmentFile) {
    this.postmanFile = inputFile;
    this.outputFile = outputFileArg;
    this.environmentFile = environmentFileArg;
    this.environmentVars = new Map();
    this.apiCounter = 1;
    this.apiEntries = [];
    this.endpointMap = new Map();
    this.sheetNames = new Set();
  }

  async convert() {
    try {
      const postmanData = JSON.parse(fs.readFileSync(this.postmanFile, 'utf-8'));
      this.loadEnvironment();

      console.log('Reading Postman collection...');
      console.log(`Collection: ${postmanData.info?.name || 'N/A'}`);
      console.log(`Environment file: ${this.environmentFile}`);
      console.log(`Environment variables loaded: ${this.environmentVars.size}`);

      this.processItems(postmanData.item);
      this.apiEntries = [...this.endpointMap.values()];

      await this.writeXLSX();

      console.log('Conversion completed successfully.');
      console.log(`Output file: ${this.outputFile}`);
      console.log(`Total endpoints: ${this.apiEntries.length}`);
      console.log(`Total test cases: ${this.apiEntries.reduce((sum, api) => sum + api.testCases.length, 0)}`);
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
    const endpointKey = `${method} ${urlTemplate}`;

    let apiEntry = this.endpointMap.get(endpointKey);
    if (!apiEntry) {
      const apiId = `API-${String(this.apiCounter).padStart(3, '0')}`;
      apiEntry = {
        apiId,
        apiName: this.buildEndpointName(parentPath, method, urlTemplate),
        method,
        urlTemplate,
        url: this.resolveTemplate(urlTemplate),
        headers: this.getHeaders(request.header),
        params: this.getParams(request.url),
        body: this.getBody(request.body),
        folderPath: parentPath || 'Root',
        testCases: []
      };
      this.endpointMap.set(endpointKey, apiEntry);
      this.apiCounter++;
    }

    const testCase = this.buildTestCase(item, request, apiEntry.testCases.length + 1);
    apiEntry.testCases.push(testCase);
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
    if (!body || !body.mode) return 'NONE';

    if (body.mode === 'raw') {
      if (!body.raw) return 'RAW (empty)';
      const contentType = body.options?.raw?.language ? ` (${body.options.raw.language})` : '';
      try {
        const parsed = JSON.parse(body.raw);
        const keys = Object.keys(parsed).slice(0, 8);
        return `RAW${contentType} keys: ${keys.length > 0 ? keys.join(', ') : 'none'}`;
      } catch {
        return `RAW${contentType} (non-JSON or invalid JSON)`;
      }
    }

    if (body.mode === 'formdata' || body.mode === 'urlencoded') {
      const rows = Array.isArray(body[body.mode]) ? body[body.mode] : [];
      const keys = rows.filter(r => !r.disabled && r.key).map(r => r.key);
      return `${body.mode.toUpperCase()} keys: ${keys.length > 0 ? keys.join(', ') : 'none'}`;
    }

    return body.mode.toUpperCase();
  }

  buildTestCase(item, request, index) {
    const rawName = item.name || `TC-${String(index).padStart(3, '0')}`;
    const tcId = this.extractTestCaseId(rawName, index);
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

    const body = this.getBody(request.body);
    if (body !== 'NONE') parts.push(`Body: ${body}`);

    return parts.join(' | ');
  }

  async writeXLSX() {
    try {
      const XLSX = await import('xlsx');
      const wb = XLSX.utils.book_new();

      for (const apiEntry of this.apiEntries) {
        const sheetName = this.makeSheetName(`${apiEntry.apiId}-${apiEntry.method}-${this.extractPath(apiEntry.urlTemplate)}`);
        const rows = [
          [`${apiEntry.apiId} ${apiEntry.method} ${apiEntry.apiName}`],
          [''],
          ['Request Info'],
          ['Folder', apiEntry.folderPath],
          ['Method', apiEntry.method],
          ['URL (Template)', apiEntry.urlTemplate],
          ['URL (Resolved)', apiEntry.url],
          ['Headers', apiEntry.headers],
          ['Params', apiEntry.params],
          ['Body', apiEntry.body],
          [''],
          ['Test Cases'],
          ['ID', 'Category', 'Description', 'Request Override (Method / Headers / Params / Body)', 'Expected Result', 'Source Request']
        ];

        for (const tc of apiEntry.testCases) {
          rows.push([tc.tcId, tc.category, tc.description, tc.override, tc.expected, tc.source]);
        }

        const ws = XLSX.utils.aoa_to_sheet(rows);
        this.applyBoldRows(XLSX, ws, [1, 3, 12, 13]);
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
    console.log('Usage: node postman-to-csv-converter.mjs [input.json output.xlsx [environment.json]]');
    console.log('Example:');
    console.log('node postman-to-csv-converter.mjs');
    console.log('node postman-to-csv-converter.mjs postman/eProduct.postman_collection.json output.xlsx postman/eProduct.postman_environment.json');
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
