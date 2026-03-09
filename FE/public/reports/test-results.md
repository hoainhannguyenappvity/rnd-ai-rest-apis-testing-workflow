# eProduct API Test Results

- Execution date: 2026-03-09
- Collection: eProduct API Test Collection
- Total APIs tested: 19
- Total test cases executed: 129
- Passed: 43
- Failed: 86
- Pass rate: 33.33%

## API-001: GET {{baseUrl}}/

| Test Case | Method | Endpoint | Status | Expected | Actual | Time (ms) | Error |
|---|---|---|---|---|---|---:|---|
| TC-001 - Valid GET request | GET | https://appservices-debug.appvity.com/ | Pass | Status 200 | 200 | 207 |  |
| TC-002 - Invalid HTTP method | POST | https://appservices-debug.appvity.com/ | Pass | Status 405 | 405 | 58 |  |
| TC-003 - Response time check | GET | https://appservices-debug.appvity.com/ | Pass | Status 200 | 200 | 58 |  |

## API-002: POST {{baseUrl}}/

| Test Case | Method | Endpoint | Status | Expected | Actual | Time (ms) | Error |
|---|---|---|---|---|---|---:|---|
| TC-001 - Valid POST request | POST | https://appservices-debug.appvity.com/ | Fail | 200 or 299 | 405 | 57 | Expected 200 or 299, but Actual 405 |
| TC-002 - Invalid HTTP method | GET | https://appservices-debug.appvity.com/ | Fail | 405 | 200 | 60 | Expected 405, but Actual 200 |
| TC-003 - Missing request body | POST | https://appservices-debug.appvity.com/ | Fail | 400 | 405 | 58 | Expected 400, but Actual 405 |
| TC-004 - Invalid JSON body | POST | https://appservices-debug.appvity.com/ | Fail | 400 | 405 | 57 | Expected 400, but Actual 405 |
| TC-005 - Invalid Content-Type | POST | https://appservices-debug.appvity.com/ | Fail | 415 | 405 | 57 | Expected 415, but Actual 405 |
| TC-006 - Response time check | POST | https://appservices-debug.appvity.com/ | Pass | Status 405 | 405 | 59 |  |

## API-003: GET {{baseUrl}}/{userFieldId}

| Test Case | Method | Endpoint | Status | Expected | Actual | Time (ms) | Error |
|---|---|---|---|---|---|---:|---|
| TC-001 - Valid GET request | GET | https://appservices-debug.appvity.com/%7BuserFieldId%7D | Fail | 200 or 299 | 404 | 58 | Expected 200 or 299, but Actual 404 |
| TC-002 - Invalid HTTP method | POST | https://appservices-debug.appvity.com/%7BuserFieldId%7D | Fail | 405 | 404 | 57 | Expected 405, but Actual 404 |
| TC-003 - Invalid userFieldId | GET | https://appservices-debug.appvity.com/invalid-id | Pass | Status 404 | 404 | 58 |  |
| TC-004 - Missing userFieldId | GET | https://appservices-debug.appvity.com/None | Fail | 400 | 404 | 57 | Expected 400, but Actual 404 |
| TC-005 - SQL injection in path param | GET | https://appservices-debug.appvity.com/'%20OR%201%3D1 | Pass | Status 404 | 404 | 58 |  |
| TC-006 - Response time check | GET | https://appservices-debug.appvity.com/%7BuserFieldId%7D | Pass | Status 404 | 404 | 57 |  |

## API-004: PATCH {{baseUrl}}/{userFieldId}

| Test Case | Method | Endpoint | Status | Expected | Actual | Time (ms) | Error |
|---|---|---|---|---|---|---:|---|
| TC-001 - Valid PATCH request | PATCH | https://appservices-debug.appvity.com/%7BuserFieldId%7D | Fail | 200 or 299 | 405 | 57 | Expected 200 or 299, but Actual 405 |
| TC-002 - Invalid HTTP method | GET | https://appservices-debug.appvity.com/%7BuserFieldId%7D | Fail | 405 | 404 | 58 | Expected 405, but Actual 404 |
| TC-003 - Invalid userFieldId | PATCH | https://appservices-debug.appvity.com/invalid-id | Fail | 400 or 404 | 405 | 63 | Expected 400 or 404, but Actual 405 |
| TC-004 - Missing userFieldId | PATCH | https://appservices-debug.appvity.com/None | Fail | 400 | 405 | 57 | Expected 400, but Actual 405 |
| TC-005 - SQL injection in path param | PATCH | https://appservices-debug.appvity.com/'%20OR%201%3D1 | Pass | Status 405 | 405 | 59 |  |
| TC-006 - Missing request body | PATCH | https://appservices-debug.appvity.com/%7BuserFieldId%7D | Fail | 400 | 405 | 57 | Expected 400, but Actual 405 |
| TC-007 - Invalid JSON body | PATCH | https://appservices-debug.appvity.com/%7BuserFieldId%7D | Fail | 400 | 405 | 57 | Expected 400, but Actual 405 |
| TC-008 - Invalid Content-Type | PATCH | https://appservices-debug.appvity.com/%7BuserFieldId%7D | Fail | 415 | 405 | 56 | Expected 415, but Actual 405 |
| TC-009 - Response time check | PATCH | https://appservices-debug.appvity.com/%7BuserFieldId%7D | Pass | Status 405 | 405 | 56 |  |

## API-005: DELETE {{baseUrl}}/{userFieldId}

| Test Case | Method | Endpoint | Status | Expected | Actual | Time (ms) | Error |
|---|---|---|---|---|---|---:|---|
| TC-001 - Valid DELETE request | DELETE | https://appservices-debug.appvity.com/%7BuserFieldId%7D | Fail | 200 or 299 | 405 | 57 | Expected 200 or 299, but Actual 405 |
| TC-002 - Invalid HTTP method | GET | https://appservices-debug.appvity.com/%7BuserFieldId%7D | Fail | 405 | 404 | 57 | Expected 405, but Actual 404 |
| TC-003 - Invalid userFieldId | DELETE | https://appservices-debug.appvity.com/invalid-id | Fail | 400 or 404 | 405 | 64 | Expected 400 or 404, but Actual 405 |
| TC-004 - Missing userFieldId | DELETE | https://appservices-debug.appvity.com/None | Fail | 400 | 405 | 56 | Expected 400, but Actual 405 |
| TC-005 - SQL injection in path param | DELETE | https://appservices-debug.appvity.com/'%20OR%201%3D1 | Pass | Status 405 | 405 | 57 |  |
| TC-006 - Response time check | DELETE | https://appservices-debug.appvity.com/%7BuserFieldId%7D | Pass | Status 405 | 405 | 56 |  |

## API-006: PATCH {{baseUrl}}/{connectionId}

| Test Case | Method | Endpoint | Status | Expected | Actual | Time (ms) | Error |
|---|---|---|---|---|---|---:|---|
| TC-001 - Valid PATCH request | PATCH | https://appservices-debug.appvity.com/%7BconnectionId%7D | Fail | 200 or 299 | 405 | 56 | Expected 200 or 299, but Actual 405 |
| TC-002 - Invalid HTTP method | GET | https://appservices-debug.appvity.com/%7BconnectionId%7D | Fail | 405 | 404 | 57 | Expected 405, but Actual 404 |
| TC-003 - Invalid connectionId | PATCH | https://appservices-debug.appvity.com/invalid-id | Fail | 400 or 404 | 405 | 56 | Expected 400 or 404, but Actual 405 |
| TC-004 - Missing connectionId | PATCH | https://appservices-debug.appvity.com/None | Fail | 400 | 405 | 61 | Expected 400, but Actual 405 |
| TC-005 - SQL injection in path param | PATCH | https://appservices-debug.appvity.com/'%20OR%201%3D1 | Pass | Status 405 | 405 | 60 |  |
| TC-006 - Missing request body | PATCH | https://appservices-debug.appvity.com/%7BconnectionId%7D | Fail | 400 | 405 | 59 | Expected 400, but Actual 405 |
| TC-007 - Invalid JSON body | PATCH | https://appservices-debug.appvity.com/%7BconnectionId%7D | Fail | 400 | 405 | 59 | Expected 400, but Actual 405 |
| TC-008 - Invalid Content-Type | PATCH | https://appservices-debug.appvity.com/%7BconnectionId%7D | Fail | 415 | 405 | 57 | Expected 415, but Actual 405 |
| TC-009 - Response time check | PATCH | https://appservices-debug.appvity.com/%7BconnectionId%7D | Pass | Status 405 | 405 | 56 |  |

## API-007: GET {{baseUrl}}/{connectionId}

| Test Case | Method | Endpoint | Status | Expected | Actual | Time (ms) | Error |
|---|---|---|---|---|---|---:|---|
| TC-001 - Valid GET request | GET | https://appservices-debug.appvity.com/%7BconnectionId%7D | Fail | 200 or 299 | 404 | 57 | Expected 200 or 299, but Actual 404 |
| TC-002 - Invalid HTTP method | POST | https://appservices-debug.appvity.com/%7BconnectionId%7D | Fail | 405 | 404 | 57 | Expected 405, but Actual 404 |
| TC-003 - Invalid connectionId | GET | https://appservices-debug.appvity.com/invalid-id | Pass | Status 404 | 404 | 57 |  |
| TC-004 - Missing connectionId | GET | https://appservices-debug.appvity.com/None | Fail | 400 | 404 | 57 | Expected 400, but Actual 404 |
| TC-005 - SQL injection in path param | GET | https://appservices-debug.appvity.com/'%20OR%201%3D1 | Pass | Status 404 | 404 | 59 |  |
| TC-006 - Response time check | GET | https://appservices-debug.appvity.com/%7BconnectionId%7D | Pass | Status 404 | 404 | 56 |  |

## API-008: DELETE {{baseUrl}}/{connectionId}

| Test Case | Method | Endpoint | Status | Expected | Actual | Time (ms) | Error |
|---|---|---|---|---|---|---:|---|
| TC-001 - Valid DELETE request | DELETE | https://appservices-debug.appvity.com/%7BconnectionId%7D | Fail | 200 or 299 | 405 | 58 | Expected 200 or 299, but Actual 405 |
| TC-002 - Invalid HTTP method | GET | https://appservices-debug.appvity.com/%7BconnectionId%7D | Fail | 405 | 404 | 59 | Expected 405, but Actual 404 |
| TC-003 - Invalid connectionId | DELETE | https://appservices-debug.appvity.com/invalid-id | Fail | 400 or 404 | 405 | 62 | Expected 400 or 404, but Actual 405 |
| TC-004 - Missing connectionId | DELETE | https://appservices-debug.appvity.com/None | Fail | 400 | 405 | 59 | Expected 400, but Actual 405 |
| TC-005 - SQL injection in path param | DELETE | https://appservices-debug.appvity.com/'%20OR%201%3D1 | Pass | Status 405 | 405 | 59 |  |
| TC-006 - Response time check | DELETE | https://appservices-debug.appvity.com/%7BconnectionId%7D | Pass | Status 405 | 405 | 57 |  |

## API-009: POST {{baseUrl}}/{connectionId}

| Test Case | Method | Endpoint | Status | Expected | Actual | Time (ms) | Error |
|---|---|---|---|---|---|---:|---|
| TC-001 - Valid POST request | POST | https://appservices-debug.appvity.com/%7BconnectionId%7D | Fail | 200 or 299 | 404 | 57 | Expected 200 or 299, but Actual 404 |
| TC-002 - Invalid HTTP method | GET | https://appservices-debug.appvity.com/%7BconnectionId%7D | Fail | 405 | 404 | 57 | Expected 405, but Actual 404 |
| TC-003 - Invalid connectionId | POST | https://appservices-debug.appvity.com/invalid-id | Pass | Status 404 | 404 | 56 |  |
| TC-004 - Missing connectionId | POST | https://appservices-debug.appvity.com/None | Fail | 400 | 404 | 56 | Expected 400, but Actual 404 |
| TC-005 - SQL injection in path param | POST | https://appservices-debug.appvity.com/'%20OR%201%3D1 | Pass | Status 404 | 404 | 56 |  |
| TC-006 - Missing request body | POST | https://appservices-debug.appvity.com/%7BconnectionId%7D | Fail | 400 | 404 | 58 | Expected 400, but Actual 404 |
| TC-007 - Invalid JSON body | POST | https://appservices-debug.appvity.com/%7BconnectionId%7D | Fail | 400 | 404 | 58 | Expected 400, but Actual 404 |
| TC-008 - Invalid Content-Type | POST | https://appservices-debug.appvity.com/%7BconnectionId%7D | Fail | 415 | 404 | 56 | Expected 415, but Actual 404 |
| TC-009 - Response time check | POST | https://appservices-debug.appvity.com/%7BconnectionId%7D | Pass | Status 404 | 404 | 56 |  |

## API-010: POST {{baseUrl}}/{connectionId}/run

| Test Case | Method | Endpoint | Status | Expected | Actual | Time (ms) | Error |
|---|---|---|---|---|---|---:|---|
| TC-001 - Valid POST request | POST | https://appservices-debug.appvity.com/%7BconnectionId%7D/run | Fail | 200 or 299 | 404 | 57 | Expected 200 or 299, but Actual 404 |
| TC-002 - Invalid HTTP method | GET | https://appservices-debug.appvity.com/%7BconnectionId%7D/run | Fail | 405 | 404 | 57 | Expected 405, but Actual 404 |
| TC-003 - Invalid connectionId | POST | https://appservices-debug.appvity.com/invalid-id/run | Pass | Status 404 | 404 | 57 |  |
| TC-004 - Missing connectionId | POST | https://appservices-debug.appvity.com/None/run | Fail | 400 | 404 | 63 | Expected 400, but Actual 404 |
| TC-005 - SQL injection in path param | POST | https://appservices-debug.appvity.com/'%20OR%201%3D1/run | Pass | Status 404 | 404 | 71 |  |
| TC-006 - Missing request body | POST | https://appservices-debug.appvity.com/%7BconnectionId%7D/run | Fail | 400 | 404 | 78 | Expected 400, but Actual 404 |
| TC-007 - Invalid JSON body | POST | https://appservices-debug.appvity.com/%7BconnectionId%7D/run | Fail | 400 | 404 | 65 | Expected 400, but Actual 404 |
| TC-008 - Invalid Content-Type | POST | https://appservices-debug.appvity.com/%7BconnectionId%7D/run | Fail | 415 | 404 | 59 | Expected 415, but Actual 404 |
| TC-009 - Response time check | POST | https://appservices-debug.appvity.com/%7BconnectionId%7D/run | Pass | Status 404 | 404 | 61 |  |

## API-011: POST {{baseUrl}}/callback

| Test Case | Method | Endpoint | Status | Expected | Actual | Time (ms) | Error |
|---|---|---|---|---|---|---:|---|
| TC-001 - Valid POST request | POST | https://appservices-debug.appvity.com/callback | Fail | 200 or 299 | 404 | 59 | Expected 200 or 299, but Actual 404 |
| TC-002 - Invalid HTTP method | GET | https://appservices-debug.appvity.com/callback | Fail | 405 | 404 | 57 | Expected 405, but Actual 404 |
| TC-003 - Missing request body | POST | https://appservices-debug.appvity.com/callback | Fail | 400 | 404 | 59 | Expected 400, but Actual 404 |
| TC-004 - Invalid JSON body | POST | https://appservices-debug.appvity.com/callback | Fail | 400 | 404 | 57 | Expected 400, but Actual 404 |
| TC-005 - Invalid Content-Type | POST | https://appservices-debug.appvity.com/callback | Fail | 415 | 404 | 56 | Expected 415, but Actual 404 |
| TC-006 - Response time check | POST | https://appservices-debug.appvity.com/callback | Pass | Status 404 | 404 | 62 |  |

## API-012: PATCH {{baseUrl}}/{subscriptionId}

| Test Case | Method | Endpoint | Status | Expected | Actual | Time (ms) | Error |
|---|---|---|---|---|---|---:|---|
| TC-001 - Valid PATCH request | PATCH | https://appservices-debug.appvity.com/%7BsubscriptionId%7D | Fail | 200 or 299 | 405 | 59 | Expected 200 or 299, but Actual 405 |
| TC-002 - Invalid HTTP method | GET | https://appservices-debug.appvity.com/%7BsubscriptionId%7D | Fail | 405 | 404 | 56 | Expected 405, but Actual 404 |
| TC-003 - Invalid subscriptionId | PATCH | https://appservices-debug.appvity.com/invalid-id | Fail | 400 or 404 | 405 | 389 | Expected 400 or 404, but Actual 405 |
| TC-004 - Missing subscriptionId | PATCH | https://appservices-debug.appvity.com/None | Fail | 400 | 405 | 60 | Expected 400, but Actual 405 |
| TC-005 - SQL injection in path param | PATCH | https://appservices-debug.appvity.com/'%20OR%201%3D1 | Pass | Status 405 | 405 | 60 |  |
| TC-006 - Missing request body | PATCH | https://appservices-debug.appvity.com/%7BsubscriptionId%7D | Fail | 400 | 405 | 68 | Expected 400, but Actual 405 |
| TC-007 - Invalid JSON body | PATCH | https://appservices-debug.appvity.com/%7BsubscriptionId%7D | Fail | 400 | 405 | 85 | Expected 400, but Actual 405 |
| TC-008 - Invalid Content-Type | PATCH | https://appservices-debug.appvity.com/%7BsubscriptionId%7D | Fail | 415 | 405 | 81 | Expected 415, but Actual 405 |
| TC-009 - Response time check | PATCH | https://appservices-debug.appvity.com/%7BsubscriptionId%7D | Pass | Status 405 | 405 | 88 |  |

## API-013: DELETE {{baseUrl}}/{subscriptionId}

| Test Case | Method | Endpoint | Status | Expected | Actual | Time (ms) | Error |
|---|---|---|---|---|---|---:|---|
| TC-001 - Valid DELETE request | DELETE | https://appservices-debug.appvity.com/%7BsubscriptionId%7D | Fail | 200 or 299 | 405 | 77 | Expected 200 or 299, but Actual 405 |
| TC-002 - Invalid HTTP method | GET | https://appservices-debug.appvity.com/%7BsubscriptionId%7D | Fail | 405 | 404 | 92 | Expected 405, but Actual 404 |
| TC-003 - Invalid subscriptionId | DELETE | https://appservices-debug.appvity.com/invalid-id | Fail | 400 or 404 | 405 | 59 | Expected 400 or 404, but Actual 405 |
| TC-004 - Missing subscriptionId | DELETE | https://appservices-debug.appvity.com/None | Fail | 400 | 405 | 57 | Expected 400, but Actual 405 |
| TC-005 - SQL injection in path param | DELETE | https://appservices-debug.appvity.com/'%20OR%201%3D1 | Pass | Status 405 | 405 | 65 |  |
| TC-006 - Response time check | DELETE | https://appservices-debug.appvity.com/%7BsubscriptionId%7D | Pass | Status 405 | 405 | 69 |  |

## API-014: POST {{baseUrl}}/populate

| Test Case | Method | Endpoint | Status | Expected | Actual | Time (ms) | Error |
|---|---|---|---|---|---|---:|---|
| TC-001 - Valid POST request | POST | https://appservices-debug.appvity.com/populate | Fail | 200 or 299 | 404 | 68 | Expected 200 or 299, but Actual 404 |
| TC-002 - Invalid HTTP method | GET | https://appservices-debug.appvity.com/populate | Fail | 405 | 404 | 57 | Expected 405, but Actual 404 |
| TC-003 - Missing request body | POST | https://appservices-debug.appvity.com/populate | Fail | 400 | 404 | 55 | Expected 400, but Actual 404 |
| TC-004 - Invalid JSON body | POST | https://appservices-debug.appvity.com/populate | Fail | 400 | 404 | 66 | Expected 400, but Actual 404 |
| TC-005 - Invalid Content-Type | POST | https://appservices-debug.appvity.com/populate | Fail | 415 | 404 | 57 | Expected 415, but Actual 404 |
| TC-006 - Response time check | POST | https://appservices-debug.appvity.com/populate | Pass | Status 404 | 404 | 60 |  |

## API-015: GET {{baseUrl}}/{userId}

| Test Case | Method | Endpoint | Status | Expected | Actual | Time (ms) | Error |
|---|---|---|---|---|---|---:|---|
| TC-001 - Valid GET request | GET | https://appservices-debug.appvity.com/%7BuserId%7D | Fail | 200 or 299 | 404 | 56 | Expected 200 or 299, but Actual 404 |
| TC-002 - Invalid HTTP method | POST | https://appservices-debug.appvity.com/%7BuserId%7D | Fail | 405 | 404 | 57 | Expected 405, but Actual 404 |
| TC-003 - Invalid userId | GET | https://appservices-debug.appvity.com/invalid-id | Pass | Status 404 | 404 | 57 |  |
| TC-004 - Missing userId | GET | https://appservices-debug.appvity.com/None | Fail | 400 | 404 | 59 | Expected 400, but Actual 404 |
| TC-005 - SQL injection in path param | GET | https://appservices-debug.appvity.com/'%20OR%201%3D1 | Pass | Status 404 | 404 | 166 |  |
| TC-006 - Response time check | GET | https://appservices-debug.appvity.com/%7BuserId%7D | Pass | Status 404 | 404 | 56 |  |

## API-016: PATCH {{baseUrl}}/{userId}

| Test Case | Method | Endpoint | Status | Expected | Actual | Time (ms) | Error |
|---|---|---|---|---|---|---:|---|
| TC-001 - Valid PATCH request | PATCH | https://appservices-debug.appvity.com/%7BuserId%7D | Fail | 200 or 299 | 405 | 54 | Expected 200 or 299, but Actual 405 |
| TC-002 - Invalid HTTP method | GET | https://appservices-debug.appvity.com/%7BuserId%7D | Fail | 405 | 404 | 55 | Expected 405, but Actual 404 |
| TC-003 - Invalid userId | PATCH | https://appservices-debug.appvity.com/invalid-id | Fail | 400 or 404 | 405 | 55 | Expected 400 or 404, but Actual 405 |
| TC-004 - Missing userId | PATCH | https://appservices-debug.appvity.com/None | Fail | 400 | 405 | 55 | Expected 400, but Actual 405 |
| TC-005 - SQL injection in path param | PATCH | https://appservices-debug.appvity.com/'%20OR%201%3D1 | Pass | Status 405 | 405 | 54 |  |
| TC-006 - Missing request body | PATCH | https://appservices-debug.appvity.com/%7BuserId%7D | Fail | 400 | 405 | 55 | Expected 400, but Actual 405 |
| TC-007 - Invalid JSON body | PATCH | https://appservices-debug.appvity.com/%7BuserId%7D | Fail | 400 | 405 | 55 | Expected 400, but Actual 405 |
| TC-008 - Invalid Content-Type | PATCH | https://appservices-debug.appvity.com/%7BuserId%7D | Fail | 415 | 405 | 55 | Expected 415, but Actual 405 |
| TC-009 - Response time check | PATCH | https://appservices-debug.appvity.com/%7BuserId%7D | Pass | Status 405 | 405 | 54 |  |

## API-017: DELETE {{baseUrl}}/{userId}

| Test Case | Method | Endpoint | Status | Expected | Actual | Time (ms) | Error |
|---|---|---|---|---|---|---:|---|
| TC-001 - Valid DELETE request | DELETE | https://appservices-debug.appvity.com/%7BuserId%7D | Fail | 200 or 299 | 405 | 56 | Expected 200 or 299, but Actual 405 |
| TC-002 - Invalid HTTP method | GET | https://appservices-debug.appvity.com/%7BuserId%7D | Fail | 405 | 404 | 56 | Expected 405, but Actual 404 |
| TC-003 - Invalid userId | DELETE | https://appservices-debug.appvity.com/invalid-id | Fail | 400 or 404 | 405 | 55 | Expected 400 or 404, but Actual 405 |
| TC-004 - Missing userId | DELETE | https://appservices-debug.appvity.com/None | Fail | 400 | 405 | 55 | Expected 400, but Actual 405 |
| TC-005 - SQL injection in path param | DELETE | https://appservices-debug.appvity.com/'%20OR%201%3D1 | Pass | Status 405 | 405 | 55 |  |
| TC-006 - Response time check | DELETE | https://appservices-debug.appvity.com/%7BuserId%7D | Pass | Status 405 | 405 | 54 |  |

## API-018: GET {{baseUrl}}/{userId}/photo

| Test Case | Method | Endpoint | Status | Expected | Actual | Time (ms) | Error |
|---|---|---|---|---|---|---:|---|
| TC-001 - Valid GET request | GET | https://appservices-debug.appvity.com/%7BuserId%7D/photo | Fail | 200 or 299 | 404 | 54 | Expected 200 or 299, but Actual 404 |
| TC-002 - Invalid HTTP method | POST | https://appservices-debug.appvity.com/%7BuserId%7D/photo | Fail | 405 | 404 | 56 | Expected 405, but Actual 404 |
| TC-003 - Invalid userId | GET | https://appservices-debug.appvity.com/invalid-id/photo | Pass | Status 404 | 404 | 56 |  |
| TC-004 - Missing userId | GET | https://appservices-debug.appvity.com/None/photo | Fail | 400 | 404 | 56 | Expected 400, but Actual 404 |
| TC-005 - SQL injection in path param | GET | https://appservices-debug.appvity.com/'%20OR%201%3D1/photo | Pass | Status 404 | 404 | 55 |  |
| TC-006 - Response time check | GET | https://appservices-debug.appvity.com/%7BuserId%7D/photo | Pass | Status 404 | 404 | 54 |  |

## API-019: GET {{baseUrl}}/{userId}/profile

| Test Case | Method | Endpoint | Status | Expected | Actual | Time (ms) | Error |
|---|---|---|---|---|---|---:|---|
| TC-001 - Valid GET request | GET | https://appservices-debug.appvity.com/%7BuserId%7D/profile | Fail | 200 or 299 | 404 | 60 | Expected 200 or 299, but Actual 404 |
| TC-002 - Invalid HTTP method | POST | https://appservices-debug.appvity.com/%7BuserId%7D/profile | Fail | 405 | 404 | 58 | Expected 405, but Actual 404 |
| TC-003 - Invalid userId | GET | https://appservices-debug.appvity.com/invalid-id/profile | Pass | Status 404 | 404 | 57 |  |
| TC-004 - Missing userId | GET | https://appservices-debug.appvity.com/None/profile | Fail | 400 | 404 | 54 | Expected 400, but Actual 404 |
| TC-005 - SQL injection in path param | GET | https://appservices-debug.appvity.com/'%20OR%201%3D1/profile | Pass | Status 404 | 404 | 55 |  |
| TC-006 - Response time check | GET | https://appservices-debug.appvity.com/%7BuserId%7D/profile | Pass | Status 404 | 404 | 54 |  |

## Raw Newman Output Excerpts

### Run Start Excerpt

```text
��n e w m a n  
  
 e P r o d u c t   A P I   T e s t   C o l l e c t i o n  
  
 �%  A P I - 0 0 1 :   G E T   { { b a s e U r l } } /  
 %  T C - 0 0 1   -   V a l i d   G E T   r e q u e s t  
     G E T   h t t p s : / / a p p s e r v i c e s - d e b u g . a p p v i t y . c o m /   [ 2 0 0   O K ,   8 7 0 B ,   2 0 7 m s ]  
     "    S t a t u s   c o d e   m a t c h e s   e x p e c t e d  
  
 %  T C - 0 0 2   -   I n v a l i d   H T T P   m e t h o d  
     P O S T   h t t p s : / / a p p s e r v i c e s - d e b u g . a p p v i t y . c o m /   [ 4 0 5   N o t   A l l o w e d ,   3 3 2 B ,   5 8 m s ]  
     "    S t a t u s   c o d e   m a t c h e s   e x p e c t e d  
  
 %  T C - 0 0 3   -   R e s p o n s e   t i m e   c h e c k  
     G E T   h t t p s : / / a p p s e r v i c e s - d e b u g . a p p v i t y . c o m /   [ 2 0 0   O K ,   8 7 0 B ,   5 8 m s ]  
  
 �%  A P I - 0 0 2 :   P O S T   { { b a s e U r l } } /  
 %  T C - 0 0 1   -   V a l i d   P O S T   r e q u e s t  
     P O S T   h t t p s : / / a p p s e r v i c e s - d e b u g . a p p v i t y . c o m /   [ 4 0 5   N o t   A l l o w e d ,   3 3 2 B ,   5 7 m s ]  
     1 .   S t a t u s   c o d e   m a t c h e s   e x p e c t e d  
  
 %  T C - 0 0 2   -   I n v a l i d   H T T P   m e t h o d  
     G E T   h t t p s : / / a p p s e r v i c e s - d e b u g . a p p v i t y . c o m /   [ 2 0 0   O K ,   8 7 0 B ,   6 0 m s ]  
     2 .   S t a t u s   c o d e   m a t c h e s   e x p e c t e d  
  
 %  T C - 0 0 3   -   M i s s i n g   r e q u e s t   b o d y  
     P O S T   h t t p s : / / a p p s e r v i c e s - d e b u g . a p p v i t y . c o m /   [ 4 0 5   N o t   A l l o w e d ,   3 3 2 B ,   5 8 m s ]  
     3 .   S t a t u s   c o d e   m a t c h e s   e x p e c t e d  
  
 %  T C - 0 0 4   -   I n v a l i d   J S O N   b o d y  
     P O S T   h t t p s : / / a p p s e r v i c e s - d e b u g . a p p v i t y . c o m /   [ 4 0 5   N o t   A l l o w e d ,   3 3 2 B ,   5 7 m s ]  
     4 .   S t a t u s   c o d e   m a t c h e s   e x p e c t e d  
  
 %  T C - 0 0 5   -   I n v a l i d   C o n t e n t - T y p e  
     P O S T   h t t p s : / / a p p s e r v i c e s - d e b u g . a p p v i t y . c o m /   [ 4 0 5   N o t   A l l o w e d ,   3 3 2 B ,   5 7 m s ]  
     5 .   S t a t u s   c o d e   m a t c h e s   e x p e c t e d  
  
 %  T C - 0 0 6   -   R e s p o n s e   t i m e   c h e c k  
     P O S T   h t t p s : / / a p p s e r v i c e s - d e b u g . a p p v i t y . c o m /   [ 4 0 5   N o t   A l l o w e d ,   3 3 2 B ,   5 9 m s ]  
  
 �%  A P I - 0 0 3 :   G E T   { { b a s e U r l } } / { u s e r F i e l d I d }  
 %  T C - 0 0 1   -   V a l i d   G E T   r e q u e s t  
     G E T   h t t p s : / / a p p s e r v i c e s - d e b u g . a p p v i t y . c o m / { u s e r F i e l d I d }   [ 4 0 4   N o t   F o u n d ,   3 5 7 B ,   5 8 m s ]  
     6 .   S t a t u s   c o d e   m a t c h e s   e x p e c t e d  
  
 %  T C - 0 0 2   -   I n v a l i d   H T T P   m e t h o d  
     P O S T   h t t p s : / / a p p s e r v i c e s - d e b u g . a p p v i t y . c o m / { u s e r F i e l d I d }   [ 4 0 4   N o t   F o u n d ,   3 5 7 B ,   5 7 m s ]  
     7 .   S t a t u s   c o d e   m a t c h e s   e x p e c t e d  
  
 %  T C - 0 0 3   -   I n v a l i d   u s e r F i e l d I d  
     G E T   h t t p s : / / a p p s e r v i c e s - d e b u g . a p p v i t y . c o m / i n v a l i d - i d   [ 4 0 4   N o t   F o u n d ,   3 5 7 B ,   5 8 m s ]  
     "    S t a t u s   c o d e   m a t c h e s   e x p e c t e d  
  
 %  T C - 0 0 4   -   M i s s i n g   u s e r F i e l d I d  
     G E T   h t t p s : / / a p p s e r v i c e s - d e b u g . a p p v i t y . c o m / N o n e   [ 4 0 4   N o t   F o u n d ,   3 5 7 B ,   5 7 m s ]  
     8 .   S t a t u s   c o d e   m a t c h e s   e x p e c t e d  
  
 %  T C - 0 0 5   -   S Q L   i n j e c t i o n   i n   p a t h   p a r a m  
     G E T   h t t p s : / / a p p s e r v i c e s - d e b u g . a p p v i t y . c o m / ' % 2 0 O R % 2 0 1 % 3 D 1   [ 4 0 4   N o t   F o u n d ,   3 5 7 B ,   5 8 m s ]  
  
 %  T C - 0 0 6   -   R e s p o n s e   t i m e   c h e c k  
     G E T   h t t p s : / / a p p s e r v i c e s - d e b u g . a p p v i t y . c o m / { u s e r F i e l d I d }   [ 4 0 4   N o t   F o u n d ,   3 5 7 B ,   5 7 m s ]  
  
 �%  A P I - 0 0 4 :   P A T C H   { { b a s e U r l } } / { u s e r F i e l d I d }  
 %  T C - 0 0 1   -   V a l i d   P A T C H   r e q u e s t  
     P A T C H   h t t p s : / / a p p s e r v i c e s - d e b u g . a p p v i t y . c o m / { u s e r F i e l d I d }   [ 4 0 5   N o t   A l l o w e d ,   3 3 2 B ,   5 7 m s ]  
     9 .   S t a t u s   c o d e   m a t c h e s   e x p e c t e d  
  
 %  T C - 0 0 2   -   I n v a l i d   H T T P   m e t h o d  
     G E T   h t t p s : / / a p p s e r v i c e s - d e b u g . a p p v i t y . c o m / { u s e r F i e l d I d }   [ 4 0 4   N o t   F o u n d ,   3 5 7 B ,   5 8 m s ]  
   1 0 .   S t a t u s   c o d e   m a t c h e s   e x p e c t e d  
  
 %  T C - 0 0 3   -   I n v a l i d   u s e r F i e l d I d  
     P A T C H   h t t p s : / / a p p s e r v i c e s - d e b u g . a p p v i t y . c o m / i n v a l i d - i d   [ 4 0 5   N o t   A l l o w e d ,   3 3 2 B ,   6 3 m s ]  
   1 1 .   S t a t u s   c o d e   m a t c h e s   e x p e c t e d  
  
 %  T C - 0 0 4   -   M i s s i n g   u s e r F i e l d I d  
     P A T C H   h t t p s : / / a p p s e r v i c e s - d e b u g . a p p v i t y . c o m / N o n e   [ 4 0 5   N o t   A l l o w e d ,   3 3 2 B ,   5 7 m s ]  
   1 2 .   S t a t u s   c o d e   m a t c h e s   e x p e c t e d  
  
 %  T C - 0 0 5   -   S Q L   i n j e c t i o n   i n   p a t h   p a r a m  
     P A T C H   h t t p s : / / a p p s e r v i c e s - d e b u g . a p p v i t y . c o m / ' % 2 0 O R % 2 0 1 % 3 D 1   [ 4 0 5   N o t   A l l o w e d ,   3 3 2 B ,   5 9 m s ]  
  
 %  T C - 0 0 6   -   M i s s i n g   r e q u e s t   b o d y  
     P A T C H   h t t p s : / / a p p s e r v i c e s - d e b u g . a p p v i t y . c o m / { u s e r F i e l d I d }   [ 4 0 5   N o t   A l l o w e d ,   3 3 2 B ,   5 7 m s ]  
   1 3 .   S t a t u s   c o d e   m a t c h e s   e x p e c t e d  
  
 %  T C - 0 0 7   -   I n v a l i d   J S O N   b o d y  
     P A T C H   h t t p s : / / a p p s e r v i c e s - d e b u g . a p p v i t y . c o m / { u s e r F i e l d I d }   [ 4 0 5   N o t   A l l o w e d ,   3 3 2 B ,   5 7 m s ]  
   1 4 .   S t a t u s   c o d e   m a t c h e s   e x p e c t e d  
  
 %  T C - 0 0 8   -   I n v a l i d   C o n t e n t - T y p e  
     P A T C H   h t t p s : / / a p p s e r v i c e s - d e b u g . a p p v i t y . c o m / { u s e r F i e l d I d }   [ 4 0 5   N o t   A l l o w e d ,   3 3 2 B ,   5 6 m s ]  
   1 5 .   S t a t u s   c o d e   m a t c h e s   e x p e c t e d  
  
 %  T C - 0 0 9   -   R e s p o n s e   t i m e   c h e c k  
     P A T C H   h t t p s : / / a p p s e r v i c e s - d e b u g . a p p v i t y . c o m / { u s e r F i e l d I d }   [ 4 0 5   N o t   A l l o w e d ,   3 3 2 B ,   5 6 m s ]  
  
 �%  A P I - 0 0 5 :   D E L E T E   { { b a s e U r l } } / { u s e r F i e l d I d }  
 %  T C - 0 0 1   -   V a l i d   D E L E T E   r e q u e s t  
     D E L E T E   h t t p s : / / a p p s e r v i c e s - d e b u g . a p p v i t y . c o m / { u s e r F i e l d I d }   [ 4 0 5   N o t   A l l o w e d ,   3 3 2 B ,   5 7 m s ]  
   1 6 .   S t a t u s   c o d e   m a t c h e s   e x p e c t e d  
  
 %  T C - 0 0 2   -   I n v a l i d   H T T P   m e t h o d  
     G E T   h t t p s : / / a p p s e r v i c e s - d e b u g . a p p v i t y . c o m / { u s e r F i e l d I d }   [ 4 0 4   N o t   F o u n d ,   3 5 7 B ,   5 7 m s ]  
   1 7 .   S t a t u s   c o d e   m a t c h e s   e x p e c t e d  
  
 %  T C - 0 0 3   -   I n v a l i d   u s e r F i e l d I d  
     D E L E T E   h t t p s : / / a p p s e r v i c e s - d e b u g . a p p v i t y . c o m / i n v a l i d - i d   [ 4 0 5   N o t   A l l o w e d ,   3 3 2 B ,   6 4 m s ]  
   1 8 .   S t a t u s   c o d e   m a t c h e s   e x p e c t e d  
  
 %  T C - 0 0 4   -   M i s s i n g   u s e r F i e l d I d  
     D E L E T E   h t t p s : / / a p p s e r v i c e s - d e b u g . a p p v i t y . c o m / N o n e   [ 4 0 5   N o t   A l l o w e d ,   3 3 2 B ,   5 6 m s ]  
   1 9 .   S t a t u s   c o d e   m a t c h e s   e x p e c t e d  
  
 %  T C - 0 0 5   -   S Q L   i n j e c t i o n   i n   p a t h   p a r a m  
     D E L E T E   h t t p s : / / a p p s e r v i c e s - d e b u g . a p p v i t y . c o m / ' % 2 0 O R % 2 0 1 % 3 D 1   [ 4 0 5   N o t   A l l o w e d ,   3 3 2 B ,   5 7 m s ]  
  
 %  T C - 0 0 6   -   R e s p o n s e   t i m e   c h e c k  
     D E L E T E   h t t p s : / / a p p s e r v i c e s - d e b u g . a p p v i t y . c o m / { u s e r F i e l d I d }   [ 4 0 5   N o t   A l l o w e d ,   3 3 2 B ,   5 6 m s ]  
```

### Failure Excerpt

```text

```
