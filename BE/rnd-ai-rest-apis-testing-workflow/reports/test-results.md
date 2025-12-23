# Test Results

## API-001: Ping Service

| TC ID  | Type     | Description              | Expected               | Actual                                              | Status |
| ------ | -------- | ------------------------ | ---------------------- | --------------------------------------------------- | ------ |
| TC-001 | Positive | Valid POST               | Status: 200-299        | 200 OK; body `{"success":true,"data":"pong"}`       | PASS   |
| TC-002 | Negative | Invalid method (GET)     | Status: 405            | 404 returned for GET /ping                          | FAIL   |
| TC-003 | Negative | Invalid endpoint (/pong) | Status: 404            | 404 returned for POST /pong                         | PASS   |
| TC-004 | Edge     | Request timeout          | Error after 5000ms     | Timeout after 5s calling http://10.255.255.1:3000   | PASS   |

## API-002: Get Users Service

| TC ID  | Type     | Description              | Expected               | Actual                                                     | Status |
| ------ | -------- | ------------------------ | ---------------------- | ---------------------------------------------------------- | ------ |
| TC-001 | Positive | Valid GET                | Status: 200-299        | 401 Unauthorized (token rejected)                          | FAIL   |
| TC-002 | Negative | Invalid method (POST)    | Status: 405            | 405 returned for POST                                      | PASS   |
| TC-003 | Negative | Invalid endpoint (/pong) | Status: 404            | 404 returned for GET /pong                                 | PASS   |
| TC-004 | Edge     | Request timeout          | Error after 5000ms     | Timeout after 5s calling https://10.255.255.1/...GetUsers  | PASS   |
