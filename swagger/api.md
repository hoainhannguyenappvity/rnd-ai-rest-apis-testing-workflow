# API Test Specifications
This document defines REST APIs to be tested automatically by Codex AI. Each API block is independent and includes expectations and test scenarios.
**Service:** Numbering Service API
**Version:** 1.0.0
**Description:** API documentation for the Numbering Service. This service manages numbering configurations, request numbers, code mappings, sequential numbers, and running numbers.
**Base URL:** http://numservice-qa.appvity.com/numbering-service/api/v1
---
## API-001: GET PING

### Description

Simple health check endpoint


### Request { API-001: GET PING }

- Method: GET
- URL: `http://numservice-qa.appvity.com/numbering-service/api/v1/ping`
- Headers:
  - Content-Type: `application/json`
- Params: None
- Body: None

### Test Cases { API-001: GET PING }

| ID     | Category    | Description                  | Request Override                        | Expected Result                  |
| ------ | ----------- | ---------------------------- | --------------------------------------- | -------------------------------- |
| TC-001 | Positive    | Valid GET request            | Method: GET                             | 200 OK                           |
| TC-002 | Negative    | Invalid HTTP method          | Method: POST                            | 405 Method Not Allowed           |
| TC-003 | Security    | SQL injection in parameter   | Query: injection test                   | 400 Bad Request or safely handled |
| TC-004 | Performance | Response time check          | Method: GET                             | 200-299, response time < 3s      |

---

## API-002: GET CONFIG

### Description

Retrieve all numbering configurations with optional OData query parameters


### Request { API-002: GET CONFIG }

- Method: GET
- URL: `http://numservice-qa.appvity.com/numbering-service/api/v1/config`
- Headers:
  - Content-Type: `application/json`
- Query Params:
  - $select: `{{$select}}`
  - $filter: `{{$filter}}`
  - $top: `{{$top}}`
  - $count: `{{$count}}`
  - $skip: `{{$skip}}`
  - $orderby: `{{$orderby}}`
- Body: None

### Test Cases { API-002: GET CONFIG }

| ID     | Category    | Description                  | Request Override                        | Expected Result                  |
| ------ | ----------- | ---------------------------- | --------------------------------------- | -------------------------------- |
| TC-001 | Positive    | Valid GET request            | Method: GET                             | 200 OK                           |
| TC-002 | Negative    | Invalid HTTP method          | Method: POST                            | 405 Method Not Allowed           |
| TC-003 | Security    | SQL injection in parameter   | Query: injection test                   | 400 Bad Request or safely handled |
| TC-004 | Performance | Response time check          | Method: GET                             | 200-299, response time < 3s      |

---

## API-003: POST CONFIG

### Description

Create a new numbering configuration


### Request { API-003: POST CONFIG }

- Method: POST
- URL: `http://numservice-qa.appvity.com/numbering-service/api/v1/config`
- Headers:
  - Content-Type: `application/json`
- Params: None
- Body: 

```json
{}
```

### Test Cases { API-003: POST CONFIG }

| ID     | Category    | Description                  | Request Override                        | Expected Result                  |
| ------ | ----------- | ---------------------------- | --------------------------------------- | -------------------------------- |
| TC-001 | Positive    | Valid POST request           | Method: POST                            | 201 Created                      |
| TC-002 | Negative    | Missing request body         | Body: None                              | 400 Bad Request                  |
| TC-003 | Negative    | Invalid JSON body            | Body: malformed JSON                    | 400 Bad Request                  |
| TC-004 | Negative    | Invalid Content-Type         | Headers: Content-Type = "text/plain"    | 415 Unsupported Media Type       |
| TC-005 | Negative    | Invalid HTTP method          | Method: GET                             | 405 Method Not Allowed           |
| TC-006 | Security    | SQL injection in parameter   | Query: injection test                   | 400 Bad Request or safely handled |
| TC-007 | Performance | Response time check          | Method: POST                            | 200-299, response time < 3s      |

---

## API-004: GET CONFIG ID

### Description

Retrieve a specific numbering configuration by its ID


### Request { API-004: GET CONFIG ID }

- Method: GET
- URL: `http://numservice-qa.appvity.com/numbering-service/api/v1/config/{id}`
- Headers:
  - Content-Type: `application/json`
- Path Params:
  - id: `{{id}}`
- Params: None
- Body: None

### Test Cases { API-004: GET CONFIG ID }

| ID     | Category    | Description                  | Request Override                        | Expected Result                  |
| ------ | ----------- | ---------------------------- | --------------------------------------- | -------------------------------- |
| TC-001 | Positive    | Valid GET request            | Method: GET                             | 200 OK                           |
| TC-002 | Negative    | Invalid id                   | Path: id = "invalid-id"                 | 400 Bad Request or 404 Not Found |
| TC-003 | Negative    | Missing id                   | Path: id = None                         | 400 Bad Request                  |
| TC-004 | Negative    | Invalid HTTP method          | Method: POST                            | 405 Method Not Allowed           |
| TC-005 | Security    | SQL injection in parameter   | Path: id = "' OR '1'='1"                | 400 Bad Request or safely handled |
| TC-006 | Performance | Response time check          | Method: GET                             | 200-299, response time < 3s      |

---

## API-005: PATCH CONFIG ID

### Description

Update a numbering configuration by ID


### Request { API-005: PATCH CONFIG ID }

- Method: PATCH
- URL: `http://numservice-qa.appvity.com/numbering-service/api/v1/config/{id}`
- Headers:
  - Content-Type: `application/json`
- Path Params:
  - id: `{{id}}`
- Params: None
- Body: 

```json
{}
```

### Test Cases { API-005: PATCH CONFIG ID }

| ID     | Category    | Description                  | Request Override                        | Expected Result                  |
| ------ | ----------- | ---------------------------- | --------------------------------------- | -------------------------------- |
| TC-001 | Positive    | Valid PATCH request          | Method: PATCH                           | 200 OK                           |
| TC-002 | Negative    | Invalid id                   | Path: id = "invalid-id"                 | 400 Bad Request or 404 Not Found |
| TC-003 | Negative    | Missing id                   | Path: id = None                         | 400 Bad Request                  |
| TC-004 | Negative    | Missing request body         | Body: None                              | 400 Bad Request                  |
| TC-005 | Negative    | Invalid JSON body            | Body: malformed JSON                    | 400 Bad Request                  |
| TC-006 | Negative    | Invalid Content-Type         | Headers: Content-Type = "text/plain"    | 415 Unsupported Media Type       |
| TC-007 | Negative    | Invalid HTTP method          | Method: GET                             | 405 Method Not Allowed           |
| TC-008 | Security    | SQL injection in parameter   | Path: id = "' OR '1'='1"                | 400 Bad Request or safely handled |
| TC-009 | Performance | Response time check          | Method: PATCH                           | 200-299, response time < 3s      |

---

## API-006: DELETE CONFIG ID

### Description

Delete a numbering configuration by ID


### Request { API-006: DELETE CONFIG ID }

- Method: DELETE
- URL: `http://numservice-qa.appvity.com/numbering-service/api/v1/config/{id}`
- Headers:
  - Content-Type: `application/json`
- Path Params:
  - id: `{{id}}`
- Params: None
- Body: None

### Test Cases { API-006: DELETE CONFIG ID }

| ID     | Category    | Description                  | Request Override                        | Expected Result                  |
| ------ | ----------- | ---------------------------- | --------------------------------------- | -------------------------------- |
| TC-001 | Positive    | Valid DELETE request         | Method: DELETE                          | 200-299 Success                  |
| TC-002 | Negative    | Invalid id                   | Path: id = "invalid-id"                 | 400 Bad Request or 404 Not Found |
| TC-003 | Negative    | Missing id                   | Path: id = None                         | 400 Bad Request                  |
| TC-004 | Negative    | Invalid HTTP method          | Method: GET                             | 405 Method Not Allowed           |
| TC-005 | Security    | SQL injection in parameter   | Path: id = "' OR '1'='1"                | 400 Bad Request or safely handled |
| TC-006 | Performance | Response time check          | Method: DELETE                          | 200-299, response time < 3s      |

---

## API-007: GET CODEMAPPING

### Description

Retrieve all code mappings with optional OData query parameters


### Request { API-007: GET CODEMAPPING }

- Method: GET
- URL: `http://numservice-qa.appvity.com/numbering-service/api/v1/codeMapping`
- Headers:
  - Content-Type: `application/json`
- Query Params:
  - $select: `{{$select}}`
  - $filter: `{{$filter}}`
  - $top: `{{$top}}`
  - $count: `{{$count}}`
  - $skip: `{{$skip}}`
  - $orderby: `{{$orderby}}`
- Body: None

### Test Cases { API-007: GET CODEMAPPING }

| ID     | Category    | Description                  | Request Override                        | Expected Result                  |
| ------ | ----------- | ---------------------------- | --------------------------------------- | -------------------------------- |
| TC-001 | Positive    | Valid GET request            | Method: GET                             | 200 OK                           |
| TC-002 | Negative    | Invalid HTTP method          | Method: POST                            | 405 Method Not Allowed           |
| TC-003 | Security    | SQL injection in parameter   | Query: injection test                   | 400 Bad Request or safely handled |
| TC-004 | Performance | Response time check          | Method: GET                             | 200-299, response time < 3s      |

---

## API-008: POST CODEMAPPING

### Description

Create a new code mapping


### Request { API-008: POST CODEMAPPING }

- Method: POST
- URL: `http://numservice-qa.appvity.com/numbering-service/api/v1/codeMapping`
- Headers:
  - Content-Type: `application/json`
- Params: None
- Body: 

```json
{}
```

### Test Cases { API-008: POST CODEMAPPING }

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

## API-009: GET CODEMAPPING ID

### Description

Retrieve a specific code mapping by its ID


### Request { API-009: GET CODEMAPPING ID }

- Method: GET
- URL: `http://numservice-qa.appvity.com/numbering-service/api/v1/codeMapping/{id}`
- Headers:
  - Content-Type: `application/json`
- Path Params:
  - id: `{{id}}`
- Params: None
- Body: None

### Test Cases { API-009: GET CODEMAPPING ID }

| ID     | Category    | Description                  | Request Override                        | Expected Result                  |
| ------ | ----------- | ---------------------------- | --------------------------------------- | -------------------------------- |
| TC-001 | Positive    | Valid GET request            | Method: GET                             | 200 OK                           |
| TC-002 | Negative    | Invalid id                   | Path: id = "invalid-id"                 | 400 Bad Request or 404 Not Found |
| TC-003 | Negative    | Missing id                   | Path: id = None                         | 400 Bad Request                  |
| TC-004 | Negative    | Invalid HTTP method          | Method: POST                            | 405 Method Not Allowed           |
| TC-005 | Security    | SQL injection in parameter   | Path: id = "' OR '1'='1"                | 400 Bad Request or safely handled |
| TC-006 | Performance | Response time check          | Method: GET                             | 200-299, response time < 3s      |

---

## API-010: PATCH CODEMAPPING ID

### Description

Update a code mapping by ID


### Request { API-010: PATCH CODEMAPPING ID }

- Method: PATCH
- URL: `http://numservice-qa.appvity.com/numbering-service/api/v1/codeMapping/{id}`
- Headers:
  - Content-Type: `application/json`
- Path Params:
  - id: `{{id}}`
- Params: None
- Body: 

```json
{}
```

### Test Cases { API-010: PATCH CODEMAPPING ID }

| ID     | Category    | Description                  | Request Override                        | Expected Result                  |
| ------ | ----------- | ---------------------------- | --------------------------------------- | -------------------------------- |
| TC-001 | Positive    | Valid PATCH request          | Method: PATCH                           | 200 OK                           |
| TC-002 | Negative    | Invalid id                   | Path: id = "invalid-id"                 | 400 Bad Request or 404 Not Found |
| TC-003 | Negative    | Missing id                   | Path: id = None                         | 400 Bad Request                  |
| TC-004 | Negative    | Missing request body         | Body: None                              | 400 Bad Request                  |
| TC-005 | Negative    | Invalid JSON body            | Body: malformed JSON                    | 400 Bad Request                  |
| TC-006 | Negative    | Invalid Content-Type         | Headers: Content-Type = "text/plain"    | 415 Unsupported Media Type       |
| TC-007 | Negative    | Invalid HTTP method          | Method: GET                             | 405 Method Not Allowed           |
| TC-008 | Security    | SQL injection in parameter   | Path: id = "' OR '1'='1"                | 400 Bad Request or safely handled |
| TC-009 | Performance | Response time check          | Method: PATCH                           | 200-299, response time < 3s      |

---

## API-011: DELETE CODEMAPPING ID

### Description

Delete a code mapping by ID


### Request { API-011: DELETE CODEMAPPING ID }

- Method: DELETE
- URL: `http://numservice-qa.appvity.com/numbering-service/api/v1/codeMapping/{id}`
- Headers:
  - Content-Type: `application/json`
- Path Params:
  - id: `{{id}}`
- Params: None
- Body: None

### Test Cases { API-011: DELETE CODEMAPPING ID }

| ID     | Category    | Description                  | Request Override                        | Expected Result                  |
| ------ | ----------- | ---------------------------- | --------------------------------------- | -------------------------------- |
| TC-001 | Positive    | Valid DELETE request         | Method: DELETE                          | 200 OK                           |
| TC-002 | Negative    | Invalid id                   | Path: id = "invalid-id"                 | 400 Bad Request or 404 Not Found |
| TC-003 | Negative    | Missing id                   | Path: id = None                         | 400 Bad Request                  |
| TC-004 | Negative    | Invalid HTTP method          | Method: GET                             | 405 Method Not Allowed           |
| TC-005 | Security    | SQL injection in parameter   | Path: id = "' OR '1'='1"                | 400 Bad Request or safely handled |
| TC-006 | Performance | Response time check          | Method: DELETE                          | 200-299, response time < 3s      |

---

## API-012: GET REQUESTNUMBER

### Description

Retrieve all request numbers with optional OData query parameters


### Request { API-012: GET REQUESTNUMBER }

- Method: GET
- URL: `http://numservice-qa.appvity.com/numbering-service/api/v1/requestNumber`
- Headers:
  - Content-Type: `application/json`
- Query Params:
  - $select: `{{$select}}`
  - $filter: `{{$filter}}`
  - $top: `{{$top}}`
  - $count: `{{$count}}`
  - $skip: `{{$skip}}`
  - $orderby: `{{$orderby}}`
- Body: None

### Test Cases { API-012: GET REQUESTNUMBER }

| ID     | Category    | Description                  | Request Override                        | Expected Result                  |
| ------ | ----------- | ---------------------------- | --------------------------------------- | -------------------------------- |
| TC-001 | Positive    | Valid GET request            | Method: GET                             | 200 OK                           |
| TC-002 | Negative    | Invalid HTTP method          | Method: POST                            | 405 Method Not Allowed           |
| TC-003 | Security    | SQL injection in parameter   | Query: injection test                   | 400 Bad Request or safely handled |
| TC-004 | Performance | Response time check          | Method: GET                             | 200-299, response time < 3s      |

---

## API-013: POST REQUESTNUMBER

### Description

Create a new request number


### Request { API-013: POST REQUESTNUMBER }

- Method: POST
- URL: `http://numservice-qa.appvity.com/numbering-service/api/v1/requestNumber`
- Headers:
  - x-manual-ref-number: `{{x-manual-ref-number}}`
- Params: None
- Body: 

```json
{}
```

### Test Cases { API-013: POST REQUESTNUMBER }

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

## API-014: GET REQUESTNUMBER SEARCH

### Description

Get all request numbers by search keyword


### Request { API-014: GET REQUESTNUMBER SEARCH }

- Method: GET
- URL: `http://numservice-qa.appvity.com/numbering-service/api/v1/requestNumber/search`
- Headers:
  - Content-Type: `application/json`
- Query Params:
  - $search: `{{$search}}`
- Body: None

### Test Cases { API-014: GET REQUESTNUMBER SEARCH }

| ID     | Category    | Description                  | Request Override                        | Expected Result                  |
| ------ | ----------- | ---------------------------- | --------------------------------------- | -------------------------------- |
| TC-001 | Positive    | Valid GET request            | Method: GET                             | 200 OK                           |
| TC-002 | Negative    | Invalid HTTP method          | Method: POST                            | 405 Method Not Allowed           |
| TC-003 | Security    | SQL injection in parameter   | Query: injection test                   | 400 Bad Request or safely handled |
| TC-004 | Performance | Response time check          | Method: GET                             | 200-299, response time < 3s      |

---

## API-015: POST REQUESTNUMBER BATCH

### Description

Create multiple request numbers in batch


### Request { API-015: POST REQUESTNUMBER BATCH }

- Method: POST
- URL: `http://numservice-qa.appvity.com/numbering-service/api/v1/requestNumber/batch`
- Headers:
  - Content-Type: `application/json`
- Params: None
- Body: 

```json
{}
```

### Test Cases { API-015: POST REQUESTNUMBER BATCH }

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

## API-016: GET SEQUENTIALNUMBER

### Description

Retrieve all sequential numbers with optional OData query parameters


### Request { API-016: GET SEQUENTIALNUMBER }

- Method: GET
- URL: `http://numservice-qa.appvity.com/numbering-service/api/v1/sequentialNumber`
- Headers:
  - Content-Type: `application/json`
- Query Params:
  - $select: `{{$select}}`
  - $filter: `{{$filter}}`
  - $top: `{{$top}}`
  - $count: `{{$count}}`
  - $skip: `{{$skip}}`
  - $orderby: `{{$orderby}}`
- Body: None

### Test Cases { API-016: GET SEQUENTIALNUMBER }

| ID     | Category    | Description                  | Request Override                        | Expected Result                  |
| ------ | ----------- | ---------------------------- | --------------------------------------- | -------------------------------- |
| TC-001 | Positive    | Valid GET request            | Method: GET                             | 200 OK                           |
| TC-002 | Negative    | Invalid HTTP method          | Method: POST                            | 405 Method Not Allowed           |
| TC-003 | Security    | SQL injection in parameter   | Query: injection test                   | 400 Bad Request or safely handled |
| TC-004 | Performance | Response time check          | Method: GET                             | 200-299, response time < 3s      |

---

## API-017: POST SEQUENTIALNUMBER

### Description

Create a new sequential number


### Request { API-017: POST SEQUENTIALNUMBER }

- Method: POST
- URL: `http://numservice-qa.appvity.com/numbering-service/api/v1/sequentialNumber`
- Headers:
  - Content-Type: `application/json`
- Params: None
- Body: 

```json
{}
```

### Test Cases { API-017: POST SEQUENTIALNUMBER }

| ID     | Category    | Description                  | Request Override                        | Expected Result                  |
| ------ | ----------- | ---------------------------- | --------------------------------------- | -------------------------------- |
| TC-001 | Positive    | Valid POST request           | Method: POST                            | 201 Created                      |
| TC-002 | Negative    | Missing request body         | Body: None                              | 400 Bad Request                  |
| TC-003 | Negative    | Invalid JSON body            | Body: malformed JSON                    | 400 Bad Request                  |
| TC-004 | Negative    | Invalid Content-Type         | Headers: Content-Type = "text/plain"    | 415 Unsupported Media Type       |
| TC-005 | Negative    | Invalid HTTP method          | Method: GET                             | 405 Method Not Allowed           |
| TC-006 | Security    | SQL injection in parameter   | Query: injection test                   | 400 Bad Request or safely handled |
| TC-007 | Performance | Response time check          | Method: POST                            | 200-299, response time < 3s      |

---

## API-018: GET SEQUENTIALNUMBER ID

### Description

Retrieve a specific sequential number by its ID


### Request { API-018: GET SEQUENTIALNUMBER ID }

- Method: GET
- URL: `http://numservice-qa.appvity.com/numbering-service/api/v1/sequentialNumber/{id}`
- Headers:
  - Content-Type: `application/json`
- Path Params:
  - id: `{{id}}`
- Params: None
- Body: None

### Test Cases { API-018: GET SEQUENTIALNUMBER ID }

| ID     | Category    | Description                  | Request Override                        | Expected Result                  |
| ------ | ----------- | ---------------------------- | --------------------------------------- | -------------------------------- |
| TC-001 | Positive    | Valid GET request            | Method: GET                             | 200 OK                           |
| TC-002 | Negative    | Invalid id                   | Path: id = "invalid-id"                 | 400 Bad Request or 404 Not Found |
| TC-003 | Negative    | Missing id                   | Path: id = None                         | 400 Bad Request                  |
| TC-004 | Negative    | Invalid HTTP method          | Method: POST                            | 405 Method Not Allowed           |
| TC-005 | Security    | SQL injection in parameter   | Path: id = "' OR '1'='1"                | 400 Bad Request or safely handled |
| TC-006 | Performance | Response time check          | Method: GET                             | 200-299, response time < 3s      |

---

## API-019: PATCH SEQUENTIALNUMBER ID

### Description

Update a sequential number by ID


### Request { API-019: PATCH SEQUENTIALNUMBER ID }

- Method: PATCH
- URL: `http://numservice-qa.appvity.com/numbering-service/api/v1/sequentialNumber/{id}`
- Headers:
  - Content-Type: `application/json`
- Path Params:
  - id: `{{id}}`
- Params: None
- Body: 

```json
{}
```

### Test Cases { API-019: PATCH SEQUENTIALNUMBER ID }

| ID     | Category    | Description                  | Request Override                        | Expected Result                  |
| ------ | ----------- | ---------------------------- | --------------------------------------- | -------------------------------- |
| TC-001 | Positive    | Valid PATCH request          | Method: PATCH                           | 200 OK                           |
| TC-002 | Negative    | Invalid id                   | Path: id = "invalid-id"                 | 400 Bad Request or 404 Not Found |
| TC-003 | Negative    | Missing id                   | Path: id = None                         | 400 Bad Request                  |
| TC-004 | Negative    | Missing request body         | Body: None                              | 400 Bad Request                  |
| TC-005 | Negative    | Invalid JSON body            | Body: malformed JSON                    | 400 Bad Request                  |
| TC-006 | Negative    | Invalid Content-Type         | Headers: Content-Type = "text/plain"    | 415 Unsupported Media Type       |
| TC-007 | Negative    | Invalid HTTP method          | Method: GET                             | 405 Method Not Allowed           |
| TC-008 | Security    | SQL injection in parameter   | Path: id = "' OR '1'='1"                | 400 Bad Request or safely handled |
| TC-009 | Performance | Response time check          | Method: PATCH                           | 200-299, response time < 3s      |

---

## API-020: DELETE SEQUENTIALNUMBER ID

### Description

Delete a sequential number by ID


### Request { API-020: DELETE SEQUENTIALNUMBER ID }

- Method: DELETE
- URL: `http://numservice-qa.appvity.com/numbering-service/api/v1/sequentialNumber/{id}`
- Headers:
  - Content-Type: `application/json`
- Path Params:
  - id: `{{id}}`
- Params: None
- Body: None

### Test Cases { API-020: DELETE SEQUENTIALNUMBER ID }

| ID     | Category    | Description                  | Request Override                        | Expected Result                  |
| ------ | ----------- | ---------------------------- | --------------------------------------- | -------------------------------- |
| TC-001 | Positive    | Valid DELETE request         | Method: DELETE                          | 200-299 Success                  |
| TC-002 | Negative    | Invalid id                   | Path: id = "invalid-id"                 | 400 Bad Request or 404 Not Found |
| TC-003 | Negative    | Missing id                   | Path: id = None                         | 400 Bad Request                  |
| TC-004 | Negative    | Invalid HTTP method          | Method: GET                             | 405 Method Not Allowed           |
| TC-005 | Security    | SQL injection in parameter   | Path: id = "' OR '1'='1"                | 400 Bad Request or safely handled |
| TC-006 | Performance | Response time check          | Method: DELETE                          | 200-299, response time < 3s      |

---

## API-021: GET RUNNINGNUMBER

### Description

Retrieve all running numbers with optional OData query parameters


### Request { API-021: GET RUNNINGNUMBER }

- Method: GET
- URL: `http://numservice-qa.appvity.com/numbering-service/api/v1/runningNumber`
- Headers:
  - Content-Type: `application/json`
- Query Params:
  - $select: `{{$select}}`
  - $filter: `{{$filter}}`
  - $top: `{{$top}}`
  - $count: `{{$count}}`
  - $skip: `{{$skip}}`
  - $orderby: `{{$orderby}}`
- Body: None

### Test Cases { API-021: GET RUNNINGNUMBER }

| ID     | Category    | Description                  | Request Override                        | Expected Result                  |
| ------ | ----------- | ---------------------------- | --------------------------------------- | -------------------------------- |
| TC-001 | Positive    | Valid GET request            | Method: GET                             | 200 OK                           |
| TC-002 | Negative    | Invalid HTTP method          | Method: POST                            | 405 Method Not Allowed           |
| TC-003 | Security    | SQL injection in parameter   | Query: injection test                   | 400 Bad Request or safely handled |
| TC-004 | Performance | Response time check          | Method: GET                             | 200-299, response time < 3s      |

---

## API-022: POST RUNNINGNUMBER

### Description

Create a new running number


### Request { API-022: POST RUNNINGNUMBER }

- Method: POST
- URL: `http://numservice-qa.appvity.com/numbering-service/api/v1/runningNumber`
- Headers:
  - Content-Type: `application/json`
- Params: None
- Body: 

```json
{}
```

### Test Cases { API-022: POST RUNNINGNUMBER }

| ID     | Category    | Description                  | Request Override                        | Expected Result                  |
| ------ | ----------- | ---------------------------- | --------------------------------------- | -------------------------------- |
| TC-001 | Positive    | Valid POST request           | Method: POST                            | 201 Created                      |
| TC-002 | Negative    | Missing request body         | Body: None                              | 400 Bad Request                  |
| TC-003 | Negative    | Invalid JSON body            | Body: malformed JSON                    | 400 Bad Request                  |
| TC-004 | Negative    | Invalid Content-Type         | Headers: Content-Type = "text/plain"    | 415 Unsupported Media Type       |
| TC-005 | Negative    | Invalid HTTP method          | Method: GET                             | 405 Method Not Allowed           |
| TC-006 | Security    | SQL injection in parameter   | Query: injection test                   | 400 Bad Request or safely handled |
| TC-007 | Performance | Response time check          | Method: POST                            | 200-299, response time < 3s      |

---

## API-023: GET RUNNINGNUMBER ID

### Description

Retrieve a specific running number by its ID


### Request { API-023: GET RUNNINGNUMBER ID }

- Method: GET
- URL: `http://numservice-qa.appvity.com/numbering-service/api/v1/runningNumber/{id}`
- Headers:
  - Content-Type: `application/json`
- Path Params:
  - id: `{{id}}`
- Params: None
- Body: None

### Test Cases { API-023: GET RUNNINGNUMBER ID }

| ID     | Category    | Description                  | Request Override                        | Expected Result                  |
| ------ | ----------- | ---------------------------- | --------------------------------------- | -------------------------------- |
| TC-001 | Positive    | Valid GET request            | Method: GET                             | 200 OK                           |
| TC-002 | Negative    | Invalid id                   | Path: id = "invalid-id"                 | 400 Bad Request or 404 Not Found |
| TC-003 | Negative    | Missing id                   | Path: id = None                         | 400 Bad Request                  |
| TC-004 | Negative    | Invalid HTTP method          | Method: POST                            | 405 Method Not Allowed           |
| TC-005 | Security    | SQL injection in parameter   | Path: id = "' OR '1'='1"                | 400 Bad Request or safely handled |
| TC-006 | Performance | Response time check          | Method: GET                             | 200-299, response time < 3s      |

---

## API-024: PATCH RUNNINGNUMBER ID

### Description

Update a running number by ID


### Request { API-024: PATCH RUNNINGNUMBER ID }

- Method: PATCH
- URL: `http://numservice-qa.appvity.com/numbering-service/api/v1/runningNumber/{id}`
- Headers:
  - Content-Type: `application/json`
- Path Params:
  - id: `{{id}}`
- Params: None
- Body: 

```json
{}
```

### Test Cases { API-024: PATCH RUNNINGNUMBER ID }

| ID     | Category    | Description                  | Request Override                        | Expected Result                  |
| ------ | ----------- | ---------------------------- | --------------------------------------- | -------------------------------- |
| TC-001 | Positive    | Valid PATCH request          | Method: PATCH                           | 200 OK                           |
| TC-002 | Negative    | Invalid id                   | Path: id = "invalid-id"                 | 400 Bad Request or 404 Not Found |
| TC-003 | Negative    | Missing id                   | Path: id = None                         | 400 Bad Request                  |
| TC-004 | Negative    | Missing request body         | Body: None                              | 400 Bad Request                  |
| TC-005 | Negative    | Invalid JSON body            | Body: malformed JSON                    | 400 Bad Request                  |
| TC-006 | Negative    | Invalid Content-Type         | Headers: Content-Type = "text/plain"    | 415 Unsupported Media Type       |
| TC-007 | Negative    | Invalid HTTP method          | Method: GET                             | 405 Method Not Allowed           |
| TC-008 | Security    | SQL injection in parameter   | Path: id = "' OR '1'='1"                | 400 Bad Request or safely handled |
| TC-009 | Performance | Response time check          | Method: PATCH                           | 200-299, response time < 3s      |

---

## API-025: DELETE RUNNINGNUMBER ID

### Description

Delete a running number by ID


### Request { API-025: DELETE RUNNINGNUMBER ID }

- Method: DELETE
- URL: `http://numservice-qa.appvity.com/numbering-service/api/v1/runningNumber/{id}`
- Headers:
  - Content-Type: `application/json`
- Path Params:
  - id: `{{id}}`
- Params: None
- Body: None

### Test Cases { API-025: DELETE RUNNINGNUMBER ID }

| ID     | Category    | Description                  | Request Override                        | Expected Result                  |
| ------ | ----------- | ---------------------------- | --------------------------------------- | -------------------------------- |
| TC-001 | Positive    | Valid DELETE request         | Method: DELETE                          | 200-299 Success                  |
| TC-002 | Negative    | Invalid id                   | Path: id = "invalid-id"                 | 400 Bad Request or 404 Not Found |
| TC-003 | Negative    | Missing id                   | Path: id = None                         | 400 Bad Request                  |
| TC-004 | Negative    | Invalid HTTP method          | Method: GET                             | 405 Method Not Allowed           |
| TC-005 | Security    | SQL injection in parameter   | Path: id = "' OR '1'='1"                | 400 Bad Request or safely handled |
| TC-006 | Performance | Response time check          | Method: DELETE                          | 200-299, response time < 3s      |

---
