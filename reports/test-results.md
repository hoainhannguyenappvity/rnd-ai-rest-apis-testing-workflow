# Test Results

## API-001: KMI - GET USERS

Base URL: `https://qaweb360plus.360awareqa.com/v2/web/odata/SEPAOrgs/SE.GetUsers`

### Test Cases

| Test Case | Method | Request | Expected | Actual | Status |
| --- | --- | --- | --- | --- | --- |
| TC-001 | GET | `?$top=1` | 200-299 | 200 OK, 982ms | Pass |
| TC-002 | GET | `?$top=1` (unauthorized) | 401 | 401 Unauthorized, 606ms | Pass |
| TC-003 | GET | `?$top=1` | 200 OK, 1 user | 200 OK, 421ms | Pass |
| TC-004 | GET | `?$top=1&$count=true` | 200 OK, includes count | 200 OK, 454ms | Pass |
| TC-005 | POST | `?$top=1` | 405 Method Not Allowed | 405 Method Not Allowed, 263ms | Pass |
| TC-006 | GET | `?$top=1000&$count=true` | 200 OK, response time < 3s | 500 Internal Server Error, 354ms | Fail |
| TC-007 | GET | `?$skip=5000&$top=10&$count=true` | 200 OK, response time acceptable | 200 OK, 463ms | Pass |

### Raw Newman Output (excerpt)

```
newman

KMI

API-001: KMI - GET USERS
TC-001
GET ...?$top=1 [200 OK, 4.46kB, 982ms]
Status code is in range 200-299

TC-002
GET ...?$top=1 [401 Unauthorized, 1.99kB, 606ms]
Status code is 401

TC-003
GET ...?$top=1 [200 OK, 4.46kB, 421ms]
200 OK, returns exactly 1 user

TC-004
GET ...?$top=1&$count=true [200 OK, 4.48kB, 454ms]
200 OK, includes total count in response

TC-005
POST ...?$top=1 [405 Method Not Allowed, 2.03kB, 263ms]
405 Method Not Allowed

TC-006
GET ...?$top=1000&$count=true [500 Internal Server Error, 2.08kB, 354ms]
AssertionError: expected response to have status code 200 but got 500
inside "API-001: KMI - GET USERS / TC-006"

TC-007
GET ...?$skip=5000&$top=10&$count=true [200 OK, 2.22kB, 463ms]
200 OK, response time acceptable
```
