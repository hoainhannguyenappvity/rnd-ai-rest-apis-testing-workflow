# Run Test

Get the output by running command `newman run KMI.postman_collection.json -e KMI.postman_environment.json`. Capture and analyze the complete output from the Newman execution and summarize findings clearly and professionally.

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
