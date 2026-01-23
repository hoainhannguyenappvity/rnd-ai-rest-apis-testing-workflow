# Run Test

Get the output by running command `newman run KMI.postman_collection.json -e KMI.postman_environment.json`. Capture and analyze the complete output from the Newman execution and summarize findings clearly and professionally.

All outputs MUST be written to the `./reports/` folder using the following files:

1. `./reports/test-results.md`
   - List each API tested
   - Test cases executed (based on Postman test scripts)
   - Pass/Fail status from Newman execution
   - Actual vs expected results
   - Raw Newman output or relevant excerpts

2. `./reports/summary.md`

   Include:
   - Total APIs tested
   - Total test cases
   - Passed test cases
   - Failed test cases
   - Pass rate (%)
   - Execution time
   - Key issues found
   - Risk assessment and release recommendation

   Do NOT mention assertions.
   Use simple, stakeholder-friendly language.

3. `./reports/summary.html`

Generate a standalone professional HTML API Test Report dashboard with embedded CSS only (no external libraries).

Include sections:

## Header

- Title: "KMI API Test Summary"
- Navigation tabs: Executive Summary | Metrics | Coverage | Detailed Results

## Executive Summary

- Short executive summary paragraph
- Pass rate badge (%)
- Dark modern card UI

## Metrics (KPI cards)

- Total APIs tested
- Total test cases
- Passed
- Failed
- Execution time
- Average response time
- Labels and values bold, large, high contrast

## Test Coverage

- CSS-only donut chart for pass/fail ratio
- Coverage progress bar (executed vs planned)
- Text summary: "10 passed, 4 failed" and "14 of 14 planned executed"

## Key Issues

- Business-friendly bullet list (no raw logs)

## Detailed Results Table

- Search box and status filter (All, Pass, Fail)
- Columns: API, Test Case, Method, Endpoint, Status, Expected, Actual, Time(ms), Error
- Status as colored badges
- For failed test cases, render a "View" expandable link in the Error column, when expand show a summary error for each assertions in the format: "Expected X, but Actual Y"

UI Requirements:

- Dark modern dashboard theme
- Rounded cards, subtle shadows
- High contrast text
- Green for Pass, Red for Fail
- Responsive layout (flex/grid)
- Embedded CSS only
