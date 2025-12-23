# Test Results
- Timestamp: 2025-12-23T11:55:04.4870155+07:00
- Resolved: `BASE_URL_LOCAL=http://localhost:3000`, `BASE_URL_REMOTE=https://autotesting.360awareqa.com`, `AUTH_TOKEN` (masked) `Bearer eyJ`, `TIMEOUT_MS=5000ms`, `CONTENT_TYPE_JSON=application/json`

## API-001: Ping Service

| TC ID  | Type     | Description              | Expected                              | Actual                                                        | Status   |
| ------ | -------- | ------------------------ | ------------------------------------- | ------------------------------------------------------------- | -------- |
| TC-001 | Positive | Valid POST               | Status: 200-299                       | 200 OK; body `{"success":true,"data":"pong"}`                 | Гo PASS  |
| TC-002 | Negative | Invalid method (GET)     | Status: 405                           | 404 returned for GET /ping                                    | Г?O FAIL |
| TC-003 | Negative | Invalid endpoint (/pong) | Status: 404                           | 404 returned for POST /pong                                   | Гo PASS  |
| TC-004 | Edge     | Request timeout          | Error after 5000ms                    | Client timeout after ~5s calling http://10.255.255.1:3000/ping | Гo PASS  |

## API-002: Get Users Service

| TC ID  | Type     | Description              | Expected                              | Actual                                                                                           | Status  |
| ------ | -------- | ------------------------ | ------------------------------------- | ------------------------------------------------------------------------------------------------ | ------- |
| TC-001 | Positive | Valid GET                | Status: 200-299                       | 200 OK; body starts with `{\"@odata.context\":\"https://autotesting.360awareqa.com/v2/web/odata/$metadata#SEGetUsers\",\"value\":[{\"id\":1063,...` | Гo PASS |
| TC-002 | Negative | Invalid method (POST)    | Status: 405 (treated POST as invalid) | 405 returned for POST (spec lists GET as invalid; exercised POST to validate 405 handling)       | Гo PASS |
| TC-003 | Negative | Invalid endpoint (/pong) | Status: 404                           | 404 returned for GET /pong                                                                        | Гo PASS |
| TC-004 | Edge     | Request timeout          | Error after 5000ms                    | Client timeout after ~5s calling https://10.255.255.1/v2/web/odata/SEPAOrgs/SE.GetUsers          | Гo PASS |
