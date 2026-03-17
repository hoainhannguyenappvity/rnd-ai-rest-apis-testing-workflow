# API Test Execution and Reporting

Run the Postman collection using Newman and generate structured API test reports.

## Step 1 — Execute API Tests

Run the following command:

newman run ./postman/eProduct.postman_collection.json \
-e ./postman/eProduct.postman_environment.json \
--reporters cli,json \
--reporter-json-export ./reports/newman-report.json

Capture:

- Complete CLI output
- Newman JSON report
- Execution exit code
- Total execution time

If the Newman exit code is non-zero, mark the test run as FAILED.

---

## Step 2 — Parse Test Results

Use the Newman JSON report as the primary source of truth.

Extract:

- APIs / endpoints tested
- HTTP method
- Test case names
- Expected results
- Actual results
- Pass/Fail status
- Response time
- Error messages
- Response body returned by the endpoint

Group results by endpoint.

---

## Step 3 — Generate Detailed Test Report

Create file:

./reports/test-results.md

Structure:

# API Test Results

## Endpoint: POST /login

| Test Case        | Status | Expected | Actual | Response Time | Response Data                      |
| ---------------- | ------ | -------- | ------ | ------------- | ---------------------------------- |
| Valid login      | PASS   | 200      | 200    | 210ms         | { "token": "xxxx" }                |
| Invalid password | PASS   | 401      | 401    | 180ms         | { "error": "Invalid credentials" } |

Include:

- API endpoint
- HTTP method
- Test case results
- Response time
- Failure reason
- Response body preview
- Relevant excerpts from Newman logs

If the response body is very large, include a shortened preview and note that full data is available in the HTML report.

---

## Step 4 — Generate Executive Summary

Create:

./reports/summary.md

Include:

- Total APIs tested
- Total endpoints
- Total test cases
- Passed
- Failed
- Pass rate (%)
- Average response time
- Slowest endpoint
- Execution time

Also include:

### Key Issues

Summarize important problems such as:

- Functional failures
- Authentication failures
- Timeout or network errors
- Performance issues

Use simple business language.

Do NOT mention assertions.

Provide a short **release readiness recommendation**:

- Safe to release
- Release with caution
- Not recommended to release

---

## Step 5 — Generate HTML Test Dashboard

Create:

./reports/summary.html

Generate a standalone HTML API Test Dashboard.

Requirements:

- Dark modern UI
- Embedded CSS only
- No external libraries
- Responsive layout (flex/grid)

### Sections

Header

Title:
eProduct API Test Summary

Navigation tabs:

- Executive Summary
- Metrics
- Coverage
- Detailed Results

---

Executive Summary

Include:

- Short paragraph describing test results
- Pass rate badge

---

Metrics (KPI Cards)

Display:

- Total APIs
- Total test cases
- Passed
- Failed
- Pass rate
- Average response time
- Execution time

---

Test Coverage

Include:

- CSS donut chart for pass vs fail
- Coverage progress bar

Example:

10 passed, 4 failed  
14 of 14 planned tests executed

---

Key Issues

List major problems in business-friendly language.

Do not include raw logs.

---

Detailed Results Table

Columns:

API  
Test Case  
Method  
Endpoint  
Status  
Expected  
Actual  
Response Time  
Response Data  
Error

### Response Data column requirements

The **Response Data** column must display the actual response body returned by the endpoint during Newman execution.

Rules:

- Use the Newman JSON report as the source of truth.
- If the response body is JSON, display it in formatted pretty JSON.
- If the response body is long, show a short preview (first 200–300 characters).
- Provide a **"View" button** to expand or collapse the full response.
- The expanded response must appear in a **scrollable code-style container**.
- Escape HTML characters properly to avoid breaking the page.
- If the endpoint returned non-JSON content, display the raw response text.
- If no response body is available, display **"No response"**.

### Table Features

- Search box
- Status filter (All / Pass / Fail)
- Expandable error details

Failed tests must show:

Expected X, but Actual Y

Add separator rows between endpoint groups.

---

## Step 6 — Risk Assessment

Provide a final risk evaluation based on:

- failure rate
- critical endpoint failures
- authentication failures
- performance issues

Recommend one of:

Safe to release  
Release with caution  
Not recommended for release
