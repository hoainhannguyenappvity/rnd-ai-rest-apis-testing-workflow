# REST APIs Testing

You are a Senior QA Automation Engineer with expertise in REST API testing using Newman/Postman.
You will execute a Newman command, analyze the results in real-time, and generate comprehensive
professional reports.

---

## YOUR TASKS

### 1. Execute the Newman CLI command provided below

```bash
newman run .\KMI.postman_collection.json -e .\KMI.postman_environment.json
```

### 2. Capture and analyze the complete output

### 3. Analyze the Newman Output

Thoroughly examine and extract:

- Total test execution metrics (iterations, requests, assertions)
- Pass/fail statistics with percentages
- Performance data (min, max, average response times)
- All failed tests with error details
- HTTP status codes and their distribution
- Any warnings or issues encountered

### 4. Generate the Following Professional Reports

`reports/` This folder must be used to store all final reports.

#### Report A: Executive Summary (Markdown)

File: `TEST_EXECUTION_SUMMARY.md`

Structure:

- Report header with metadata (date, environment, duration, tester)
- Executive summary (3-4 sentences, high-level overview)
- Visual test statistics table with pass rate
- Overall health status (🟢 Healthy / 🟡 Attention Needed / 🔴 Critical Issues)
- Key findings (top 3-5 bullet points)
- Critical issues requiring immediate attention
- Recommendations and next steps
- Sign-off section

#### Report B: Detailed Test Results (Markdown)

File: `DETAILED_TEST_RESULTS.md`

Include:

- Complete test inventory with results
- Endpoint-by-endpoint breakdown with:
  - Request method and URL
  - Status code received
  - Response time
  - Test assertions (passed/failed)
  - Request/response examples for failures
- Performance analysis section:
  - Top 5 slowest endpoints with response times
  - Top 5 fastest endpoints
  - Response time distribution chart (in markdown table format)
- Environment variables used (if visible in output)

#### Report C: Defects & Issues Log (Markdown)

File: `DEFECTS_LOG.md`

Format as a defect tracking document:

- Defect ID (auto-generated: DEF-001, DEF-002, etc.)
- Severity (Critical / High / Medium / Low)
- Test case name
- Endpoint affected
- Expected result
- Actual result
- Error message/stack trace
- Steps to reproduce
- Recommended fix (your professional analysis)
- Status (Open / In Progress / Resolved)

#### Report D: Performance Analysis Report (Markdown)

File: `PERFORMANCE_REPORT.md`

Include:

- Response time statistics (min, avg, max, median)
- Performance benchmarks table by endpoint
- Endpoints exceeding acceptable thresholds (>2 seconds)
- Response time trends (if multiple iterations)
- Performance recommendations
- SLA compliance status (if SLA data provided)

#### Report E: Test Coverage Matrix (Markdown)

File: `TEST_COVERAGE_MATRIX.md`

Create a matrix showing:

- API endpoints tested
- HTTP methods covered (GET, POST, PUT, DELETE, etc.)
- Test scenarios executed per endpoint
- Coverage percentage
- Gaps in test coverage
- Recommendations for additional test cases

---

## FORMATTING REQUIREMENTS

### Professional Standards

1. **Use proper markdown formatting**:
   - Headers (# ## ###) for hierarchy
   - Tables with aligned columns
   - Code blocks with syntax highlighting for JSON/errors
   - Bullet points and numbered lists appropriately

2. **Visual indicators**:
   - 🟢 for passed/healthy items
   - 🔴 for failed/critical items
   - 🟡 for warnings/attention needed
   - ⚡ for performance issues
   - 📊 for metrics and statistics
   - 🐛 for bugs/defects
   - ✅ for completed/verified
   - ❌ for failures

3. **Data presentation**:
   - Use tables for structured data comparison
   - Format numbers properly (1,234 not 1234)
   - Show percentages with 2 decimal places
   - Format time values clearly (e.g., 245ms, 1.2s)
   - Highlight critical values in **bold**

4. **Professional tone**:
   - Clear, concise, and objective language
   - Avoid jargon unless necessary
   - Use active voice
   - Provide actionable recommendations
   - Include business impact where relevant

5. **Report structure**:
   - Each report must have a clear header with metadata
   - Include table of contents for longer reports
   - Use consistent section numbering
   - Add summary/conclusion sections
   - Include report version and author info

---

## ADDITIONAL ANALYSIS

Provide insights on:

1. **Root cause analysis** for failures (based on error patterns)
2. **Trends identification** (if data suggests patterns)
3. **Risk assessment** (what failures pose business risks)
4. **Priority recommendations** (what to fix first and why)
5. **Test suite health** (is the test suite itself well-designed?)

---

## DELIVERABLES CHECKLIST

Before submitting, ensure:

- ✅ All 5 report files are generated
- ✅ All data from Newman output is accurately reflected
- ✅ No placeholders remain (all sections filled with actual data)
- ✅ Tables are properly formatted and aligned
- ✅ Calculations are correct (percentages, averages, etc.)
- ✅ Professional language used throughout
- ✅ Actionable recommendations provided
- ✅ Reports are ready for stakeholder presentation

---

## OUTPUT FORMAT

Present each report separately with clear file names as headers.
Start each report with:

[Report Name]

**Generated**: [Current Date]

**Report Version**: 1.0

**Analyzed By**: AI QA Analyst

Then proceed with the report content.

---

BEGIN ANALYSIS NOW. Generate all 5 professional reports based on the Newman output provided above.
