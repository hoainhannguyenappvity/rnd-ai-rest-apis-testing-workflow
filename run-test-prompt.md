# Run Test (Deterministic Newman-Driven Reports)

You are running in a non-interactive environment. Your ONLY task is to execute Newman, parse its machine-readable output, and generate reports based on the real results.

## Step 1: Preconditions

- Ensure these files exist before running:
  - `./KMI.postman_collection.json`
  - `./KMI.postman_environment.json`
- If any file is missing, print a clear error to stderr and exit non-zero.

## Step 2: Run Newman (machine-readable)

Run this command exactly and save JSON output:

`newman run KMI.postman_collection.json -e KMI.postman_environment.json --reporters json --reporter-json-export ./reports/newman.json`

- Do NOT rely on stdout for result parsing.
- Exit non-zero if Newman fails to run.

## Step 3: Parse Newman JSON (source of truth)

Use `./reports/newman.json` as the ONLY source of truth for:
- Pass/Fail status per test case
- Actual response status/code
- Execution time
- Assertion errors

### Pass/Fail rules (strict)

- A test case is **Pass** only if all Newman assertions for that request pass.
- If no assertions exist for a request, mark it as **Fail** with error: "No assertions found".
- Do NOT infer pass/fail from response codes alone.

## Step 4: Generate reports

All outputs MUST be written to `./reports/`:

1. `./reports/test-results.md`
   - List each API tested
   - Test cases executed
   - Pass/Fail from Newman assertions
   - Expected vs Actual (expected from test case description; actual from response)
   - Raw Newman assertion error excerpts (if failed)

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
   Do NOT mention assertions. Use simple, stakeholder-friendly language.

3. `./reports/summary.html`
   Generate a standalone professional HTML dashboard with embedded CSS only.

### HTML Data Integrity Rules

- The Status column MUST reflect Newman pass/fail.
- The “Actual” column MUST show the real response status text or code from Newman.
- If a row is Fail, include a "View" expandable error with the failing assertion summaries.

### UI Requirements

- Title: "KMI API Test Summary"
- Navigation tabs: Executive Summary | Metrics | Coverage | Detailed Results
- Dark modern dashboard theme
- Rounded cards, subtle shadows
- High contrast text
- Green for Pass, Red for Fail
- Responsive layout (flex/grid)
- Embedded CSS only

## Reliability Guardrails

- If `./reports/newman.json` is missing or invalid JSON, exit non-zero.
- If any required report file is not written, exit non-zero.
