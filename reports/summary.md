# Test Summary

- Total APIs tested: 7
- Total test cases: 134
- Passed test cases: 120
- Failed test cases: 14
- Pass rate: 89.6%
- Execution time: 59.6s

## Key Issues
- Several validation scenarios returned success responses where error responses were expected (unknown fields, missing IDs, or injection payloads).
- Subsite check options returned unexpected status codes for rule-not-found and missing parameter cases, indicating inconsistent error handling.
- Add alert and HasCheckAll endpoints accepted requests that should have been rejected for invalid content type or cross-workspace input.

## Risk Assessment and Release Recommendation
Moderate risk. Core positive flows passed, but multiple negative-path validations did not behave as expected. Recommend holding release until input validation and error handling are aligned with expected outcomes, then re-test the affected cases.