# API Test Results

## API-001: Ping Service
Environment: `http://localhost:3000`

| Test Case | Scenario | Method | Endpoint | Expected | Actual | Status |
| --- | --- | --- | --- | --- | --- | --- |
| TC-001 (Positive) | Valid health check | POST | `/ping` | Status in 200-299; body optional | 200 OK; JSON `{"success":true,"data":"pong"}` | Pass |
| TC-002 (Negative) | Invalid method | GET | `/ping` | Status not in 2xx | 404 Not Found; HTML `Cannot GET /ping` | Pass |

Notes:
- Service running locally; POST returns pong payload as expected.
- Negative path uses 404; a 405 Method Not Allowed would communicate the invalid verb more explicitly.

## API-002: Get Users Service
Environment: `https://autotesting.360awareqa.com`

| Test Case | Scenario | Method | Endpoint | Expected | Actual | Status |
| --- | --- | --- | --- | --- | --- | --- |
| TC-001 (Positive) | Valid request with bearer token | GET | `/v2/web/odata/SEPAOrgs/SE.GetUsers` | Status in 200-299; response body optional | 200 OK; JSON with `@odata.context` and `value` array (sample user id 1063) | Pass |

Notes:
- Response includes user objects with fields such as `id`, `username`, `isSuper`, `lastLogin`, and location metadata; no schema issues observed given the limited expectation set.
