# eProduct API Test Summary

- Total APIs tested: 19
- Total test cases: 129
- Passed test cases: 43
- Failed test cases: 86
- Pass rate: 33.33%
- Execution time: 17.82 seconds
- Average response time: 63.57 ms

## Key Issues Found

- PATCH https://appservices-debug.appvity.com/invalid-id returned 405 instead of 400 or 404 (4 occurrences)
- PATCH https://appservices-debug.appvity.com/None returned 405 instead of 400 (4 occurrences)
- DELETE https://appservices-debug.appvity.com/invalid-id returned 405 instead of 400 or 404 (4 occurrences)
- DELETE https://appservices-debug.appvity.com/None returned 405 instead of 400 (4 occurrences)
- GET https://appservices-debug.appvity.com/None returned 404 instead of 400 (3 occurrences)
- GET https://appservices-debug.appvity.com/%7BconnectionId%7D returned 404 instead of 405 (3 occurrences)
- POST https://appservices-debug.appvity.com/ returned 405 instead of 400 (2 occurrences)
- GET https://appservices-debug.appvity.com/%7BuserFieldId%7D returned 404 instead of 405 (2 occurrences)

## Risk Assessment

Current risk level is **High** because most failed cases are contract mismatches between expected and actual HTTP status codes.

## Release Recommendation

Do not release to production until status-code behavior is aligned with agreed API contract.
