# Test Results

## API-001: KMI Users Service
Endpoint: `{{base_url}}/v2/web/odata/SEPAOrgs/SE.GetUsers`

| Test Case | Type | Scenario | Expected | Actual | Result |
|-----------|------|----------|----------|--------|--------|
| TC-001 | Positive | GET with valid auth and $top=1 | HTTP 2xx; JSON if body returned | 200 OK; JSON body present | Pass |
| TC-002 | Negative | POST (invalid method) with auth | Status not in 200-299 | 405 Method Not Allowed | Pass |
| TC-003 | Negative | GET without Authorization header | 401 Unauthorized | 401 Unauthorized | Pass |

- Assertions: 4/4 passed across 3 requests.
- Response times: min 2.6s, max 8s, avg 4.5s.

### Raw Newman Output
```
newman

API-001: KMI Users Service

□ KMI Users
└ TC-001 | GET Users | 2xx
  GET https://qaweb360plus.360awareqa.com/v2/web/odata/SEPAOrgs/SE.GetUsers?$top=1 [200 OK, 4.46kB, 8s]
  √  TC-001: status is 2xx
  √  TC-001: JSON response when body present

└ TC-002 | POST Users | invalid method
  POST https://qaweb360plus.360awareqa.com/v2/web/odata/SEPAOrgs/SE.GetUsers?$top=1 [405 Method Not Allowed, 2.03kB, 2.9s]
  √  TC-002: status is NOT 2xx for invalid method

└ TC-003 | GET Users | unauthorized
  GET https://qaweb360plus.360awareqa.com/v2/web/odata/SEPAOrgs/SE.GetUsers?$top=1 [401 Unauthorized, 1.99kB, 2.6s]
  √  TC-003: status is 401 without token

┌─────────────────────────┬──────────────────┬─────────────────┐
│                         │         executed │          failed │
├─────────────────────────┼──────────────────┼─────────────────┤
│              iterations │                1 │               0 │
├─────────────────────────┼──────────────────┼─────────────────┤
│                requests │                3 │               0 │
├─────────────────────────┼──────────────────┼─────────────────┤
│            test-scripts │                3 │               0 │
├─────────────────────────┼──────────────────┼─────────────────┤
│      prerequest-scripts │                0 │               0 │
├─────────────────────────┼──────────────────┼─────────────────┤
│              assertions │                4 │               0 │
├─────────────────────────┴──────────────────┴─────────────────┤
│ total run duration: 13.7s                                    │
├──────────────────────────────────────────────────────────────┤
│ total data received: 2.37kB (approx)                         │
├──────────────────────────────────────────────────────────────┤
│ average response time: 4.5s [min: 2.6s, max: 8s, s.d.: 2.4s] │
└──────────────────────────────────────────────────────────────┘
```
