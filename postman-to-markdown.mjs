/**
 * Generate Markdown API Test Specifications from a Postman collection (v2.1)
 * Description → Request → Test Cases (Markdown table)
 */

/* =======================
 * CONFIG
 * ======================= */
const config = require('./config/app.config');
const CONFIG = {
  postmanUrl: config.postmanCollectionOutput,    // Path to Postman Collection
  outputDir: config.swaggerOutput,                       // folder output
  outputFilename: config.apiSpec       // output file markdown
};

/* =======================
 * IMPORTS
 * ======================= */
import fs from "node:fs";
import path from "node:path";

/* =======================
 * UTILS
 * ======================= */
function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function escPipe(str) {
  return String(str ?? "").replaceAll("|", "\\|");
}

function pmUrlToString(urlObj) {
  if (!urlObj) return "";
  if (typeof urlObj === "string") return urlObj;

  const host = Array.isArray(urlObj.host) ? urlObj.host.join(".") : "";
  const p = Array.isArray(urlObj.path) ? urlObj.path.join("/") : "";
  return p ? `${host}/${p}` : host;
}

/* =======================
 * EXTRACTORS
 * ======================= */
function extractHeaders(req) {
  return (req.header ?? [])
    .filter(h => !h.disabled && h.key)
    .map(h => [h.key, h.value]);
}

function extractQueryParams(urlObj) {
  if (!urlObj || typeof urlObj === "string") return [];
  return (urlObj.query ?? [])
    .filter(q => !q.disabled)
    .map(q => [q.key, q.value, q.description?.content ?? ""]);
}

function extractPathVars(urlObj) {
  if (!urlObj || typeof urlObj === "string") return [];
  return (urlObj.variable ?? [])
    .filter(v => !v.disabled)
    .map(v => [v.key, v.value, v.description?.content ?? ""]);
}

function extractBody(req) {
  if (req.body?.mode === "raw") {
    return (req.body.raw ?? "").trim();
  }
  return "";
}

/* =======================
 * TEST CASE GENERATOR
 * ======================= */
function makeTestCases(req, urlObj) {
  const method = req.method.toUpperCase();
  const hasBody = ["POST", "PUT", "PATCH"].includes(method);
  const pathVars = extractPathVars(urlObj);
  const queryParams = extractQueryParams(urlObj);

  const rows = [];
  let idx = 1;
  const add = (cat, desc, override, expected) => {
    rows.push([
      `TC-${String(idx++).padStart(3, "0")}`,
      cat,
      desc,
      override,
      expected
    ]);
  };

  add("Positive", `Valid ${method} request`, `Method: ${method}`, "200-299 Success");
  add("Negative", "Invalid HTTP method", "Method: GET/POST mismatch", "405 Method Not Allowed");

  if (pathVars.length) {
    add("Negative", "Invalid id", "Path: id = invalid-id", "400 or 404");
    add("Negative", "Missing id", "Path: id = None", "400 Bad Request");
    add("Security", "SQL injection in path param", "Path: id = ' OR 1=1", "Safely handled");
  }

  if (queryParams.length) {
    add("Security", "SQL injection in query", "Query: injection test", "Safely handled");
  }

  if (hasBody) {
    add("Negative", "Missing request body", "Body: None", "400 Bad Request");
    add("Negative", "Invalid JSON body", "Body: malformed JSON", "400 Bad Request");
    add("Negative", "Invalid Content-Type", "Content-Type: text/plain", "415 Unsupported Media Type");
  }

  add("Performance", "Response time check", `Method: ${method}`, "< 3s");

  return rows;
}

/* =======================
 * CORE GENERATOR
 * ======================= */
function generateMarkdown(collection) {
  let baseUrl = "";
  for (const v of collection.variable ?? []) {
    if (v.key === "baseUrl") baseUrl = v.value;
  }

  const lines = [];
  lines.push("# API Test Specifications");
  lines.push(`**Service:** ${collection.info?.name}`);
  lines.push(`**Version:** 1.0.0`);
  lines.push(`**Base URL:** ${baseUrl}`);
  lines.push("---", "");

  let apiIndex = 1;

  function walk(items) {
    for (const it of items ?? []) {
      if (it.request) {
        const req = it.request;
        const apiId = `API-${String(apiIndex++).padStart(3, "0")}`;
        const method = req.method.toUpperCase();
        const rawUrl = pmUrlToString(req.url).replace(":id", "{id}");
        const fullUrl = rawUrl.replace("{{baseUrl}}", baseUrl);

        lines.push(`## ${apiId}: ${method} ${rawUrl}`, "");
        lines.push("### Description", "");
        lines.push(req.description?.content ?? "", "");

        lines.push(`### Request { ${apiId}: ${method} ${rawUrl} }`, "");
        lines.push(`- Method: ${method}`);
        lines.push(`- URL: \`${fullUrl}\``);

        const body = extractBody(req);
        lines.push(body ? "- Body:\n```json\n" + body + "\n```" : "- Body: None", "");

        lines.push(`### Test Cases { ${apiId}: ${method} ${rawUrl} }`, "");
        lines.push("| ID | Category | Description | Request Override | Expected Result |");
        lines.push("|----|----------|-------------|------------------|-----------------|");

        for (const row of makeTestCases(req, req.url)) {
          lines.push(`| ${row.map(escPipe).join(" | ")} |`);
        }

        lines.push("", "---", "");
      } else if (it.item) {
        walk(it.item);
      }
    }
  }

  walk(collection.item);
  return lines.join("\n");
}

/* =======================
 * RUN
 * ======================= */
(function run() {
  const collection = readJson(CONFIG.postmanUrl);
  const markdown = generateMarkdown(collection);

  if (!fs.existsSync(CONFIG.outputDir)) {
    fs.mkdirSync(CONFIG.outputDir, { recursive: true });
  }

  const outputPath = path.join(CONFIG.outputDir, CONFIG.outputFilename);
  fs.writeFileSync(outputPath, markdown, "utf8");

  console.log(`✅ Test specs generated: ${outputPath}`);
})();
