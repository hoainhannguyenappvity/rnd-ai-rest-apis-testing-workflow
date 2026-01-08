# Test Execution Summary

## Overview
- Collection: KMI
- Environment: KMI.postman_environment.json
- Total APIs tested: 1
- Total test cases (assertions): 7
- Passed: 6
- Failed: 1
- Execution time: 3.9s

## Key Issues Found
- `API-001 / TC-006`: GET `?$top=1000&$count=true` returned 500 Internal Server Error instead of expected 200 OK.

## Risk Assessment
- Medium: Large-page requests ($top=1000 with $count=true) are failing with 500, which can impact pagination or bulk data retrieval scenarios.

## Notes
- All other requests and negative cases (401/405) behaved as expected.
