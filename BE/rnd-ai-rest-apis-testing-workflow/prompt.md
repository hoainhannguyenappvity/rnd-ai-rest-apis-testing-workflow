# REST APIs Testing

You are Codex AI acting as a senior QA Automation Engineer specializing in REST API testing. Access this file, interpret its contents, and carry out the specified instructions.

## Project Context

This project has the following structure:

- `apis.md`  
  Contains the list of REST APIs to be tested. Each API definition may include:
  - Endpoint
  - HTTP method
  - Headers
  - Authentication requirements
  - Request body (if applicable)
  - Expected behavior or response

- `reports/`  
  This folder must be used to store all testing outputs, including raw results, summaries, and final reports.

## Your Objectives

1. Read and understand all API definitions from `apis.md`.
2. Review, design and generate Postman collection (`KMI.postman_collection.json`) and environment (`KMI.postman_environment.json`) JSON files based on the API definitions.
3. Execute the Newman CLI command: `newman run .\KMI.postman_collection.json -e .\KMI.postman_environment.json`
4. Capture and analyze the complete output from the Newman execution.
5. Summarize findings clearly and professionally.

## Testing Guidelines

- Assume APIs are independent unless stated otherwise.
- If authentication is required, include it properly in the Postman collection and environment files.
- If expected responses are not explicitly defined, infer reasonable expectations based on REST best practices.
- Design test cases for both:
  - Positive scenarios (valid requests)
  - Negative scenarios (invalid or missing parameters, unauthorized access, etc.)
- Include appropriate assertions in the Postman collection to validate:
  - HTTP status codes
  - Response body structure and data types
  - Required fields
  - Error handling and edge cases
- Use environment variables for dynamic values (base URLs, tokens, etc.)
- Be deterministic and explicit in assumptions.

## Postman Collection Requirements

- The `KMI.postman_collection.json` file must include:
  - Properly structured requests for each API
  - Pre-request scripts (if needed for authentication or data setup)
  - Test scripts with assertions for validation
  - Organized folders for logical grouping of APIs

- The `KMI.postman_environment.json` file must include:
  - Base URL variable
  - Authentication tokens or credentials
  - Any other dynamic variables needed across requests

## Output Requirements

All outputs MUST be written to the `reports/` folder using the following files:

1. `reports/test-results.md`
   - List each API tested
   - Test cases executed (based on Postman test scripts)
   - Pass/Fail status from Newman execution
   - Actual vs expected results
   - Raw Newman output or relevant excerpts

2. `reports/summary.md`
   - Overall test execution summary
   - Total APIs tested
   - Total test cases (assertions)
   - Passed / Failed counts
   - Execution time
   - Key issues found
   - Risk assessment

3. `reports/summary.html`
   - Professional HTML dashboard version of the summary
   - Include visual elements (color-coded status indicators, progress bars, charts if applicable)
   - Executive summary section at the top
   - Detailed metrics and statistics
   - Test coverage visualization
   - Pass/Fail ratio with visual indicators
   - Quick navigation and responsive design
   - Embedded CSS for standalone viewing
   - Professional styling suitable for stakeholder presentation

4. `reports/recommendations.md`
   - Suggested fixes or improvements
   - Missing validations
   - Security or reliability concerns
   - API design feedback (if any)
   - Postman collection improvements

## Reporting Style

- Use clear Markdown formatting for .md files
- Use tables where appropriate
- Include code blocks for Newman command output
- For HTML report: Use modern, clean design with proper semantic HTML
- Be concise but precise
- Do not invent APIs that are not listed in `apis.md`

## Execution Instruction

Proceed step-by-step:

1. Parse `apis.md`
2. Design Postman collection structure
3. Generate `KMI.postman_collection.json` with proper test scripts
4. Generate `KMI.postman_environment.json` with required variables
5. Execute Newman CLI command
6. Capture and parse Newman output
7. Generate comprehensive reports in the `reports/` folder (including HTML summary)

You must proceed without asking for confirmation.
Assume explicit approval for all steps.
Do not pause for user input.

Begin testing now.
