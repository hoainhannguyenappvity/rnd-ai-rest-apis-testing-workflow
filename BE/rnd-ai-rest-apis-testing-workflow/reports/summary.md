# Test Execution Summary

- Scope: API-001 KMI Users Service
- Total APIs: 1
- Total Requests: 3
- Total Assertions: 5
- Passed: 5 | Failed: 0
- Execution Time: 1m 27s
- Environment: `https://qaweb360plus.360awareqa.com`

## Key Findings
- Functional behavior aligned with expectations for valid, invalid method, and unauthorized flows.
- High latency observed on the valid GET request (up to ~80s) despite small payload size, indicating potential performance bottleneck.
- Deprecation warning emitted by Node (`fs.F_OK`), likely from local Newman/runner dependencies, not the API itself.

## Risk Assessment
- Functional Risk: Low (all assertions passed for the covered scenarios).
- Performance Risk: Medium due to long response time on primary GET endpoint.
- Security Risk: Low for tested scope; unauthorized access correctly rejected.
