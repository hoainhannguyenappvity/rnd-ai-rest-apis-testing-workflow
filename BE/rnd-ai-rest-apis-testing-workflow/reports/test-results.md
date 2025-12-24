# REST API Test Results

## Execution Overview
- Collection: `KMI APIs`
- Environment: `KMI Environment`
- Date: 2025-12-24
- Total Requests: 3
- Total Assertions: 5 (all passed)
- Total Duration: 1m 27s

## Detailed Results

| API | Test Case | Expected | Actual | Status |
| --- | --- | --- | --- | --- |
| API-001: KMI Users Service | TC-001: Valid GET | Status code 200-299 | 200 OK, JSON body returned | Pass |
| API-001: KMI Users Service | TC-002: Invalid method (POST) | Status code not 2xx | 405 Method Not Allowed | Pass |
| API-001: KMI Users Service | TC-003: Unauthorized request | Status code 401 | 401 Unauthorized | Pass |

### Actual vs Expected Notes
- TC-001 matched the expected 2xx response; content type reported as JSON when body present.
- TC-002 returned 405, satisfying the expectation that non-GET methods are rejected.
- TC-003 correctly required authorization and returned 401 without the token.

## Newman Output
```
(node:9568) [DEP0176] DeprecationWarning: fs.F_OK is deprecated, use fs.constants.F_OK instead
newman

KMI APIs

API-001: KMI Users Service / Get Users - Valid
GET https://qaweb360plus.360awareqa.com/v2/web/odata/SEPAOrgs/SE.GetUsers?$top=1 [200 OK, 4.46kB, 1m 20.8s]
✓ Status code is 2xx
✓ Response body is JSON when present

API-001: KMI Users Service / Get Users - Invalid Method
POST https://qaweb360plus.360awareqa.com/v2/web/odata/SEPAOrgs/SE.GetUsers?$top=1 [405 Method Not Allowed, 2.03kB, 5.1s]
✓ Status code is not 2xx
✓ Should return client/server error

API-001: KMI Users Service / Get Users - Unauthorized
GET https://qaweb360plus.360awareqa.com/v2/web/odata/SEPAOrgs/SE.GetUsers?$top=1 [401 Unauthorized, 1.99kB, 785ms]
✓ Status code is 401

Iterations: 1 | Requests: 3 | Test-scripts: 6 | Assertions: 5 (0 failed)
Total run duration: 1m 27s
Total data received: 2.37kB (approx)
Average response time: 28.9s (min: 785ms, max: 1m 20.8s, s.d.: 36.7s)
```
