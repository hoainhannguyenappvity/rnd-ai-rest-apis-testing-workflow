# API Test Specifications
This document defines REST APIs to be tested automatically by Codex AI. Each API block is independent and includes expectations and test scenarios.
**Service:** User Profile Service
**Version:** 1.0.0
**Description:** Documentation
**Base URL:** https://appservices-debug.appvity.com/ups/api/v1
---
## API-001: GET ROOT

### Description

GET operation for /


### Request { API-001: GET ROOT }

- Method: GET
- URL: `https://appservices-debug.appvity.com/ups/api/v1/`
- Headers:
  - x-appvity-currentuserid: `{{x-appvity-currentuserid}}`
- Params: None
- Body: None

### Test Cases { API-001: GET ROOT }

| ID     | Category    | Description                  | Request Override                        | Expected Result                  |
| ------ | ----------- | ---------------------------- | --------------------------------------- | -------------------------------- |
| TC-001 | Positive    | Valid GET request            | Method: GET                             | 200 OK                           |
| TC-002 | Negative    | Unauthorized request         | Headers: x-appvity-currentuserid = None | 401 Unauthorized                 |
| TC-003 | Negative    | Invalid auth token           | Headers: x-appvity-currentuserid = "invalid-token" | 401 Unauthorized                 |
| TC-004 | Negative    | Invalid HTTP method          | Method: POST                            | 405 Method Not Allowed           |
| TC-005 | Security    | SQL injection in parameter   | Query: injection test                   | 400 Bad Request or safely handled |
| TC-006 | Performance | Response time check          | Method: GET                             | 200-299, response time < 3s      |

---

## API-002: POST ROOT

### Description

POST operation for /


### Request { API-002: POST ROOT }

- Method: POST
- URL: `https://appservices-debug.appvity.com/ups/api/v1/`
- Headers:
  - x-appvity-currentuserid: `{{x-appvity-currentuserid}}`
  - x-ups-connectionid: `{{x-ups-connectionid}}`
- Params: None
- Body: None

### Test Cases { API-002: POST ROOT }

| ID     | Category    | Description                  | Request Override                        | Expected Result                  |
| ------ | ----------- | ---------------------------- | --------------------------------------- | -------------------------------- |
| TC-001 | Positive    | Valid POST request           | Method: POST                            | 200-299 Success                  |
| TC-002 | Negative    | Unauthorized request         | Headers: x-appvity-currentuserid = None | 401 Unauthorized                 |
| TC-003 | Negative    | Invalid auth token           | Headers: x-appvity-currentuserid = "invalid-token" | 401 Unauthorized                 |
| TC-004 | Negative    | Invalid HTTP method          | Method: GET                             | 405 Method Not Allowed           |
| TC-005 | Security    | SQL injection in parameter   | Query: injection test                   | 400 Bad Request or safely handled |
| TC-006 | Performance | Response time check          | Method: POST                            | 200-299, response time < 3s      |

---

## API-003: GET USERFIELDID

### Description

GET operation for /{userFieldId}


### Request { API-003: GET USERFIELDID }

- Method: GET
- URL: `https://appservices-debug.appvity.com/ups/api/v1/{userFieldId}`
- Headers:
  - x-appvity-currentuserid: `{{x-appvity-currentuserid}}`
- Path Params:
  - userFieldId: `{{userFieldId}}`
- Params: None
- Body: None

### Test Cases { API-003: GET USERFIELDID }

| ID     | Category    | Description                  | Request Override                        | Expected Result                  |
| ------ | ----------- | ---------------------------- | --------------------------------------- | -------------------------------- |
| TC-001 | Positive    | Valid GET request            | Method: GET                             | 200-299 Success                  |
| TC-002 | Negative    | Unauthorized request         | Headers: x-appvity-currentuserid = None | 401 Unauthorized                 |
| TC-003 | Negative    | Invalid auth token           | Headers: x-appvity-currentuserid = "invalid-token" | 401 Unauthorized                 |
| TC-004 | Negative    | Invalid userFieldId          | Path: userFieldId = "invalid-id"        | 400 Bad Request or 404 Not Found |
| TC-005 | Negative    | Missing userFieldId          | Path: userFieldId = None                | 400 Bad Request                  |
| TC-006 | Negative    | Invalid HTTP method          | Method: POST                            | 405 Method Not Allowed           |
| TC-007 | Security    | SQL injection in parameter   | Path: userFieldId = "' OR '1'='1"       | 400 Bad Request or safely handled |
| TC-008 | Performance | Response time check          | Method: GET                             | 200-299, response time < 3s      |

---

## API-004: PATCH USERFIELDID

### Description

PATCH operation for /{userFieldId}


### Request { API-004: PATCH USERFIELDID }

- Method: PATCH
- URL: `https://appservices-debug.appvity.com/ups/api/v1/{userFieldId}`
- Headers:
  - x-appvity-currentuserid: `{{x-appvity-currentuserid}}`
- Path Params:
  - userFieldId: `{{userFieldId}}`
- Params: None
- Body: None

### Test Cases { API-004: PATCH USERFIELDID }

| ID     | Category    | Description                  | Request Override                        | Expected Result                  |
| ------ | ----------- | ---------------------------- | --------------------------------------- | -------------------------------- |
| TC-001 | Positive    | Valid PATCH request          | Method: PATCH                           | 200-299 Success                  |
| TC-002 | Negative    | Unauthorized request         | Headers: x-appvity-currentuserid = None | 401 Unauthorized                 |
| TC-003 | Negative    | Invalid auth token           | Headers: x-appvity-currentuserid = "invalid-token" | 401 Unauthorized                 |
| TC-004 | Negative    | Invalid userFieldId          | Path: userFieldId = "invalid-id"        | 400 Bad Request or 404 Not Found |
| TC-005 | Negative    | Missing userFieldId          | Path: userFieldId = None                | 400 Bad Request                  |
| TC-006 | Negative    | Invalid HTTP method          | Method: GET                             | 405 Method Not Allowed           |
| TC-007 | Security    | SQL injection in parameter   | Path: userFieldId = "' OR '1'='1"       | 400 Bad Request or safely handled |
| TC-008 | Performance | Response time check          | Method: PATCH                           | 200-299, response time < 3s      |

---

## API-005: DELETE USERFIELDID

### Description

DELETE operation for /{userFieldId}


### Request { API-005: DELETE USERFIELDID }

- Method: DELETE
- URL: `https://appservices-debug.appvity.com/ups/api/v1/{userFieldId}`
- Headers:
  - x-appvity-currentuserid: `{{x-appvity-currentuserid}}`
- Path Params:
  - userFieldId: `{{userFieldId}}`
- Params: None
- Body: None

### Test Cases { API-005: DELETE USERFIELDID }

| ID     | Category    | Description                  | Request Override                        | Expected Result                  |
| ------ | ----------- | ---------------------------- | --------------------------------------- | -------------------------------- |
| TC-001 | Positive    | Valid DELETE request         | Method: DELETE                          | 200-299 Success                  |
| TC-002 | Negative    | Unauthorized request         | Headers: x-appvity-currentuserid = None | 401 Unauthorized                 |
| TC-003 | Negative    | Invalid auth token           | Headers: x-appvity-currentuserid = "invalid-token" | 401 Unauthorized                 |
| TC-004 | Negative    | Invalid userFieldId          | Path: userFieldId = "invalid-id"        | 400 Bad Request or 404 Not Found |
| TC-005 | Negative    | Missing userFieldId          | Path: userFieldId = None                | 400 Bad Request                  |
| TC-006 | Negative    | Invalid HTTP method          | Method: GET                             | 405 Method Not Allowed           |
| TC-007 | Security    | SQL injection in parameter   | Path: userFieldId = "' OR '1'='1"       | 400 Bad Request or safely handled |
| TC-008 | Performance | Response time check          | Method: DELETE                          | 200-299, response time < 3s      |

---

## API-006: PATCH CONNECTIONID

### Description

PATCH operation for /{connectionId}


### Request { API-006: PATCH CONNECTIONID }

- Method: PATCH
- URL: `https://appservices-debug.appvity.com/ups/api/v1/{connectionId}`
- Headers:
  - Content-Type: `application/json`
- Path Params:
  - connectionId: `{{connectionId}}`
- Params: None
- Body: None

### Test Cases { API-006: PATCH CONNECTIONID }

| ID     | Category    | Description                  | Request Override                        | Expected Result                  |
| ------ | ----------- | ---------------------------- | --------------------------------------- | -------------------------------- |
| TC-001 | Positive    | Valid PATCH request          | Method: PATCH                           | 200-299 Success                  |
| TC-002 | Negative    | Invalid connectionId         | Path: connectionId = "invalid-id"       | 400 Bad Request or 404 Not Found |
| TC-003 | Negative    | Missing connectionId         | Path: connectionId = None               | 400 Bad Request                  |
| TC-004 | Negative    | Invalid HTTP method          | Method: GET                             | 405 Method Not Allowed           |
| TC-005 | Security    | SQL injection in parameter   | Path: connectionId = "' OR '1'='1"      | 400 Bad Request or safely handled |
| TC-006 | Performance | Response time check          | Method: PATCH                           | 200-299, response time < 3s      |

---

## API-007: GET CONNECTIONID

### Description

GET operation for /{connectionId}


### Request { API-007: GET CONNECTIONID }

- Method: GET
- URL: `https://appservices-debug.appvity.com/ups/api/v1/{connectionId}`
- Headers:
  - Content-Type: `application/json`
- Path Params:
  - connectionId: `{{connectionId}}`
- Params: None
- Body: None

### Test Cases { API-007: GET CONNECTIONID }

| ID     | Category    | Description                  | Request Override                        | Expected Result                  |
| ------ | ----------- | ---------------------------- | --------------------------------------- | -------------------------------- |
| TC-001 | Positive    | Valid GET request            | Method: GET                             | 200-299 Success                  |
| TC-002 | Negative    | Invalid connectionId         | Path: connectionId = "invalid-id"       | 400 Bad Request or 404 Not Found |
| TC-003 | Negative    | Missing connectionId         | Path: connectionId = None               | 400 Bad Request                  |
| TC-004 | Negative    | Invalid HTTP method          | Method: POST                            | 405 Method Not Allowed           |
| TC-005 | Security    | SQL injection in parameter   | Path: connectionId = "' OR '1'='1"      | 400 Bad Request or safely handled |
| TC-006 | Performance | Response time check          | Method: GET                             | 200-299, response time < 3s      |

---

## API-008: DELETE CONNECTIONID

### Description

DELETE operation for /{connectionId}


### Request { API-008: DELETE CONNECTIONID }

- Method: DELETE
- URL: `https://appservices-debug.appvity.com/ups/api/v1/{connectionId}`
- Headers:
  - Content-Type: `application/json`
- Path Params:
  - connectionId: `{{connectionId}}`
- Params: None
- Body: None

### Test Cases { API-008: DELETE CONNECTIONID }

| ID     | Category    | Description                  | Request Override                        | Expected Result                  |
| ------ | ----------- | ---------------------------- | --------------------------------------- | -------------------------------- |
| TC-001 | Positive    | Valid DELETE request         | Method: DELETE                          | 200-299 Success                  |
| TC-002 | Negative    | Invalid connectionId         | Path: connectionId = "invalid-id"       | 400 Bad Request or 404 Not Found |
| TC-003 | Negative    | Missing connectionId         | Path: connectionId = None               | 400 Bad Request                  |
| TC-004 | Negative    | Invalid HTTP method          | Method: GET                             | 405 Method Not Allowed           |
| TC-005 | Security    | SQL injection in parameter   | Path: connectionId = "' OR '1'='1"      | 400 Bad Request or safely handled |
| TC-006 | Performance | Response time check          | Method: DELETE                          | 200-299, response time < 3s      |

---

## API-009: POST CONNECTIONID

### Description

POST operation for /{connectionId}


### Request { API-009: POST CONNECTIONID }

- Method: POST
- URL: `https://appservices-debug.appvity.com/ups/api/v1/{connectionId}`
- Headers:
  - Content-Type: `application/json`
- Path Params:
  - connectionId: `{{connectionId}}`
- Params: None
- Body: None

### Test Cases { API-009: POST CONNECTIONID }

| ID     | Category    | Description                  | Request Override                        | Expected Result                  |
| ------ | ----------- | ---------------------------- | --------------------------------------- | -------------------------------- |
| TC-001 | Positive    | Valid POST request           | Method: POST                            | 200-299 Success                  |
| TC-002 | Negative    | Invalid connectionId         | Path: connectionId = "invalid-id"       | 400 Bad Request or 404 Not Found |
| TC-003 | Negative    | Missing connectionId         | Path: connectionId = None               | 400 Bad Request                  |
| TC-004 | Negative    | Invalid HTTP method          | Method: GET                             | 405 Method Not Allowed           |
| TC-005 | Security    | SQL injection in parameter   | Path: connectionId = "' OR '1'='1"      | 400 Bad Request or safely handled |
| TC-006 | Performance | Response time check          | Method: POST                            | 200-299, response time < 3s      |

---

## API-010: POST CONNECTIONID RUN

### Description

POST operation for /{connectionId}/run


### Request { API-010: POST CONNECTIONID RUN }

- Method: POST
- URL: `https://appservices-debug.appvity.com/ups/api/v1/{connectionId}/run`
- Headers:
  - Content-Type: `application/json`
- Path Params:
  - connectionId: `{{connectionId}}`
- Params: None
- Body: None

### Test Cases { API-010: POST CONNECTIONID RUN }

| ID     | Category    | Description                  | Request Override                        | Expected Result                  |
| ------ | ----------- | ---------------------------- | --------------------------------------- | -------------------------------- |
| TC-001 | Positive    | Valid POST request           | Method: POST                            | 200-299 Success                  |
| TC-002 | Negative    | Invalid connectionId         | Path: connectionId = "invalid-id"       | 400 Bad Request or 404 Not Found |
| TC-003 | Negative    | Missing connectionId         | Path: connectionId = None               | 400 Bad Request                  |
| TC-004 | Negative    | Invalid HTTP method          | Method: GET                             | 405 Method Not Allowed           |
| TC-005 | Security    | SQL injection in parameter   | Path: connectionId = "' OR '1'='1"      | 400 Bad Request or safely handled |
| TC-006 | Performance | Response time check          | Method: POST                            | 200-299, response time < 3s      |

---

## API-011: POST CALLBACK

### Description

POST operation for /callback


### Request { API-011: POST CALLBACK }

- Method: POST
- URL: `https://appservices-debug.appvity.com/ups/api/v1/callback`
- Headers:
  - Content-Type: `application/json`
- Query Params:
  - validationToken: `{{validationToken}}`
- Body: 

```json
{
  "value": "any"
}
```

### Test Cases { API-011: POST CALLBACK }

| ID     | Category    | Description                  | Request Override                        | Expected Result                  |
| ------ | ----------- | ---------------------------- | --------------------------------------- | -------------------------------- |
| TC-001 | Positive    | Valid POST request           | Method: POST                            | 200 OK                           |
| TC-002 | Negative    | Missing request body         | Body: None                              | 400 Bad Request                  |
| TC-003 | Negative    | Invalid JSON body            | Body: malformed JSON                    | 400 Bad Request                  |
| TC-004 | Negative    | Invalid Content-Type         | Headers: Content-Type = "text/plain"    | 415 Unsupported Media Type       |
| TC-005 | Negative    | Invalid HTTP method          | Method: GET                             | 405 Method Not Allowed           |
| TC-006 | Security    | SQL injection in parameter   | Query: injection test                   | 400 Bad Request or safely handled |
| TC-007 | Performance | Response time check          | Method: POST                            | 200-299, response time < 3s      |

---

## API-012: PATCH SUBSCRIPTIONID

### Description

PATCH operation for /{subscriptionId}


### Request { API-012: PATCH SUBSCRIPTIONID }

- Method: PATCH
- URL: `https://appservices-debug.appvity.com/ups/api/v1/{subscriptionId}`
- Headers:
  - Content-Type: `application/json`
- Path Params:
  - subscriptionId: `{{subscriptionId}}`
- Params: None
- Body: None

### Test Cases { API-012: PATCH SUBSCRIPTIONID }

| ID     | Category    | Description                  | Request Override                        | Expected Result                  |
| ------ | ----------- | ---------------------------- | --------------------------------------- | -------------------------------- |
| TC-001 | Positive    | Valid PATCH request          | Method: PATCH                           | 200-299 Success                  |
| TC-002 | Negative    | Invalid subscriptionId       | Path: subscriptionId = "invalid-id"     | 400 Bad Request or 404 Not Found |
| TC-003 | Negative    | Missing subscriptionId       | Path: subscriptionId = None             | 400 Bad Request                  |
| TC-004 | Negative    | Invalid HTTP method          | Method: GET                             | 405 Method Not Allowed           |
| TC-005 | Security    | SQL injection in parameter   | Path: subscriptionId = "' OR '1'='1"    | 400 Bad Request or safely handled |
| TC-006 | Performance | Response time check          | Method: PATCH                           | 200-299, response time < 3s      |

---

## API-013: DELETE SUBSCRIPTIONID

### Description

DELETE operation for /{subscriptionId}


### Request { API-013: DELETE SUBSCRIPTIONID }

- Method: DELETE
- URL: `https://appservices-debug.appvity.com/ups/api/v1/{subscriptionId}`
- Headers:
  - Content-Type: `application/json`
- Path Params:
  - subscriptionId: `{{subscriptionId}}`
- Params: None
- Body: None

### Test Cases { API-013: DELETE SUBSCRIPTIONID }

| ID     | Category    | Description                  | Request Override                        | Expected Result                  |
| ------ | ----------- | ---------------------------- | --------------------------------------- | -------------------------------- |
| TC-001 | Positive    | Valid DELETE request         | Method: DELETE                          | 200-299 Success                  |
| TC-002 | Negative    | Invalid subscriptionId       | Path: subscriptionId = "invalid-id"     | 400 Bad Request or 404 Not Found |
| TC-003 | Negative    | Missing subscriptionId       | Path: subscriptionId = None             | 400 Bad Request                  |
| TC-004 | Negative    | Invalid HTTP method          | Method: GET                             | 405 Method Not Allowed           |
| TC-005 | Security    | SQL injection in parameter   | Path: subscriptionId = "' OR '1'='1"    | 400 Bad Request or safely handled |
| TC-006 | Performance | Response time check          | Method: DELETE                          | 200-299, response time < 3s      |

---

## API-014: POST POPULATE

### Description

POST operation for /populate


### Request { API-014: POST POPULATE }

- Method: POST
- URL: `https://appservices-debug.appvity.com/ups/api/v1/populate`
- Headers:
  - Content-Type: `application/json`
- Params: None
- Body: 

```json
{
  "userIds": "any"
}
```

### Test Cases { API-014: POST POPULATE }

| ID     | Category    | Description                  | Request Override                        | Expected Result                  |
| ------ | ----------- | ---------------------------- | --------------------------------------- | -------------------------------- |
| TC-001 | Positive    | Valid POST request           | Method: POST                            | 200-299 Success                  |
| TC-002 | Negative    | Missing request body         | Body: None                              | 400 Bad Request                  |
| TC-003 | Negative    | Invalid JSON body            | Body: malformed JSON                    | 400 Bad Request                  |
| TC-004 | Negative    | Invalid Content-Type         | Headers: Content-Type = "text/plain"    | 415 Unsupported Media Type       |
| TC-005 | Negative    | Invalid HTTP method          | Method: GET                             | 405 Method Not Allowed           |
| TC-006 | Security    | SQL injection in parameter   | Query: injection test                   | 400 Bad Request or safely handled |
| TC-007 | Performance | Response time check          | Method: POST                            | 200-299, response time < 3s      |

---

## API-015: GET USERID

### Description

GET operation for /{userId}


### Request { API-015: GET USERID }

- Method: GET
- URL: `https://appservices-debug.appvity.com/ups/api/v1/{userId}`
- Headers:
  - x-appvity-currentuserid: `{{x-appvity-currentuserid}}`
- Path Params:
  - userId: `{{userId}}`
- Params: None
- Body: None

### Test Cases { API-015: GET USERID }

| ID     | Category    | Description                  | Request Override                        | Expected Result                  |
| ------ | ----------- | ---------------------------- | --------------------------------------- | -------------------------------- |
| TC-001 | Positive    | Valid GET request            | Method: GET                             | 200-299 Success                  |
| TC-002 | Negative    | Unauthorized request         | Headers: x-appvity-currentuserid = None | 401 Unauthorized                 |
| TC-003 | Negative    | Invalid auth token           | Headers: x-appvity-currentuserid = "invalid-token" | 401 Unauthorized                 |
| TC-004 | Negative    | Invalid userId               | Path: userId = "invalid-id"             | 400 Bad Request or 404 Not Found |
| TC-005 | Negative    | Missing userId               | Path: userId = None                     | 400 Bad Request                  |
| TC-006 | Negative    | Invalid HTTP method          | Method: POST                            | 405 Method Not Allowed           |
| TC-007 | Security    | SQL injection in parameter   | Path: userId = "' OR '1'='1"            | 400 Bad Request or safely handled |
| TC-008 | Performance | Response time check          | Method: GET                             | 200-299, response time < 3s      |

---

## API-016: PATCH USERID

### Description

PATCH operation for /{userId}


### Request { API-016: PATCH USERID }

- Method: PATCH
- URL: `https://appservices-debug.appvity.com/ups/api/v1/{userId}`
- Headers:
  - x-appvity-currentuserid: `{{x-appvity-currentuserid}}`
- Path Params:
  - userId: `{{userId}}`
- Params: None
- Body: None

### Test Cases { API-016: PATCH USERID }

| ID     | Category    | Description                  | Request Override                        | Expected Result                  |
| ------ | ----------- | ---------------------------- | --------------------------------------- | -------------------------------- |
| TC-001 | Positive    | Valid PATCH request          | Method: PATCH                           | 200-299 Success                  |
| TC-002 | Negative    | Unauthorized request         | Headers: x-appvity-currentuserid = None | 401 Unauthorized                 |
| TC-003 | Negative    | Invalid auth token           | Headers: x-appvity-currentuserid = "invalid-token" | 401 Unauthorized                 |
| TC-004 | Negative    | Invalid userId               | Path: userId = "invalid-id"             | 400 Bad Request or 404 Not Found |
| TC-005 | Negative    | Missing userId               | Path: userId = None                     | 400 Bad Request                  |
| TC-006 | Negative    | Invalid HTTP method          | Method: GET                             | 405 Method Not Allowed           |
| TC-007 | Security    | SQL injection in parameter   | Path: userId = "' OR '1'='1"            | 400 Bad Request or safely handled |
| TC-008 | Performance | Response time check          | Method: PATCH                           | 200-299, response time < 3s      |

---

## API-017: DELETE USERID

### Description

DELETE operation for /{userId}


### Request { API-017: DELETE USERID }

- Method: DELETE
- URL: `https://appservices-debug.appvity.com/ups/api/v1/{userId}`
- Headers:
  - x-appvity-currentuserid: `{{x-appvity-currentuserid}}`
- Path Params:
  - userId: `{{userId}}`
- Params: None
- Body: None

### Test Cases { API-017: DELETE USERID }

| ID     | Category    | Description                  | Request Override                        | Expected Result                  |
| ------ | ----------- | ---------------------------- | --------------------------------------- | -------------------------------- |
| TC-001 | Positive    | Valid DELETE request         | Method: DELETE                          | 200-299 Success                  |
| TC-002 | Negative    | Unauthorized request         | Headers: x-appvity-currentuserid = None | 401 Unauthorized                 |
| TC-003 | Negative    | Invalid auth token           | Headers: x-appvity-currentuserid = "invalid-token" | 401 Unauthorized                 |
| TC-004 | Negative    | Invalid userId               | Path: userId = "invalid-id"             | 400 Bad Request or 404 Not Found |
| TC-005 | Negative    | Missing userId               | Path: userId = None                     | 400 Bad Request                  |
| TC-006 | Negative    | Invalid HTTP method          | Method: GET                             | 405 Method Not Allowed           |
| TC-007 | Security    | SQL injection in parameter   | Path: userId = "' OR '1'='1"            | 400 Bad Request or safely handled |
| TC-008 | Performance | Response time check          | Method: DELETE                          | 200-299, response time < 3s      |

---

## API-018: GET USERID PHOTO

### Description

GET operation for /{userId}/photo


### Request { API-018: GET USERID PHOTO }

- Method: GET
- URL: `https://appservices-debug.appvity.com/ups/api/v1/{userId}/photo`
- Headers:
  - x-appvity-currentuserid: `{{x-appvity-currentuserid}}`
- Path Params:
  - userId: `{{userId}}`
- Params: None
- Body: None

### Test Cases { API-018: GET USERID PHOTO }

| ID     | Category    | Description                  | Request Override                        | Expected Result                  |
| ------ | ----------- | ---------------------------- | --------------------------------------- | -------------------------------- |
| TC-001 | Positive    | Valid GET request            | Method: GET                             | 200-299 Success                  |
| TC-002 | Negative    | Unauthorized request         | Headers: x-appvity-currentuserid = None | 401 Unauthorized                 |
| TC-003 | Negative    | Invalid auth token           | Headers: x-appvity-currentuserid = "invalid-token" | 401 Unauthorized                 |
| TC-004 | Negative    | Invalid userId               | Path: userId = "invalid-id"             | 400 Bad Request or 404 Not Found |
| TC-005 | Negative    | Missing userId               | Path: userId = None                     | 400 Bad Request                  |
| TC-006 | Negative    | Invalid HTTP method          | Method: POST                            | 405 Method Not Allowed           |
| TC-007 | Security    | SQL injection in parameter   | Path: userId = "' OR '1'='1"            | 400 Bad Request or safely handled |
| TC-008 | Performance | Response time check          | Method: GET                             | 200-299, response time < 3s      |

---

## API-019: GET USERID PROFILE

### Description

GET operation for /{userId}/profile


### Request { API-019: GET USERID PROFILE }

- Method: GET
- URL: `https://appservices-debug.appvity.com/ups/api/v1/{userId}/profile`
- Headers:
  - x-appvity-currentuserid: `{{x-appvity-currentuserid}}`
- Path Params:
  - userId: `{{userId}}`
- Params: None
- Body: None

### Test Cases { API-019: GET USERID PROFILE }

| ID     | Category    | Description                  | Request Override                        | Expected Result                  |
| ------ | ----------- | ---------------------------- | --------------------------------------- | -------------------------------- |
| TC-001 | Positive    | Valid GET request            | Method: GET                             | 200-299 Success                  |
| TC-002 | Negative    | Unauthorized request         | Headers: x-appvity-currentuserid = None | 401 Unauthorized                 |
| TC-003 | Negative    | Invalid auth token           | Headers: x-appvity-currentuserid = "invalid-token" | 401 Unauthorized                 |
| TC-004 | Negative    | Invalid userId               | Path: userId = "invalid-id"             | 400 Bad Request or 404 Not Found |
| TC-005 | Negative    | Missing userId               | Path: userId = None                     | 400 Bad Request                  |
| TC-006 | Negative    | Invalid HTTP method          | Method: POST                            | 405 Method Not Allowed           |
| TC-007 | Security    | SQL injection in parameter   | Path: userId = "' OR '1'='1"            | 400 Bad Request or safely handled |
| TC-008 | Performance | Response time check          | Method: GET                             | 200-299, response time < 3s      |

---
