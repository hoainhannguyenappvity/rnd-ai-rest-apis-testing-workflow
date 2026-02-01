# API Test Specifications
**Service:** Numbering Service API
**Version:** 1.0.0
**Base URL:** http://numservice-qa.appvity.com/numbering-service/api/v1
---

## API-001: GET {{baseUrl}}/ping

### Description

Simple health check endpoint

### Request { API-001: GET {{baseUrl}}/ping }

- Method: GET
- URL: `http://numservice-qa.appvity.com/numbering-service/api/v1/ping`
- Body: None

### Test Cases { API-001: GET {{baseUrl}}/ping }

| ID | Category | Description | Request Override | Expected Result |
|----|----------|-------------|------------------|-----------------|
| TC-001 | Positive | Valid GET request | Method: GET | 200-299 Success |
| TC-002 | Negative | Invalid HTTP method | Method: GET/POST mismatch | 405 Method Not Allowed |
| TC-003 | Performance | Response time check | Method: GET | < 3s |

---

## API-002: GET {{baseUrl}}/config

### Description

Retrieve all numbering configurations with optional OData query parameters

### Request { API-002: GET {{baseUrl}}/config }

- Method: GET
- URL: `http://numservice-qa.appvity.com/numbering-service/api/v1/config`
- Body: None

### Test Cases { API-002: GET {{baseUrl}}/config }

| ID | Category | Description | Request Override | Expected Result |
|----|----------|-------------|------------------|-----------------|
| TC-001 | Positive | Valid GET request | Method: GET | 200-299 Success |
| TC-002 | Negative | Invalid HTTP method | Method: GET/POST mismatch | 405 Method Not Allowed |
| TC-003 | Security | SQL injection in query | Query: injection test | Safely handled |
| TC-004 | Performance | Response time check | Method: GET | < 3s |

---

## API-003: POST {{baseUrl}}/config

### Description

Create a new numbering configuration

### Request { API-003: POST {{baseUrl}}/config }

- Method: POST
- URL: `http://numservice-qa.appvity.com/numbering-service/api/v1/config`
- Body:
```json
{
  "tenantId": "<string>",
  "object": "<string>",
  "application": "<string>",
  "integerDigit": "<string>",
  "numberingPattern": "<string>",
  "numberingPatternHTML": "<string>",
  "sequentialNumberDef": "<string>",
  "teamId": "<string>",
  "channelId": "<string>",
  "code": "<string>"
}
```

### Test Cases { API-003: POST {{baseUrl}}/config }

| ID | Category | Description | Request Override | Expected Result |
|----|----------|-------------|------------------|-----------------|
| TC-001 | Positive | Valid POST request | Method: POST | 200-299 Success |
| TC-002 | Negative | Invalid HTTP method | Method: GET/POST mismatch | 405 Method Not Allowed |
| TC-003 | Negative | Missing request body | Body: None | 400 Bad Request |
| TC-004 | Negative | Invalid JSON body | Body: malformed JSON | 400 Bad Request |
| TC-005 | Negative | Invalid Content-Type | Content-Type: text/plain | 415 Unsupported Media Type |
| TC-006 | Performance | Response time check | Method: POST | < 3s |

---

## API-004: GET {{baseUrl}}/config/{id}

### Description

Retrieve a specific numbering configuration by its ID

### Request { API-004: GET {{baseUrl}}/config/{id} }

- Method: GET
- URL: `http://numservice-qa.appvity.com/numbering-service/api/v1/config/{id}`
- Body: None

### Test Cases { API-004: GET {{baseUrl}}/config/{id} }

| ID | Category | Description | Request Override | Expected Result |
|----|----------|-------------|------------------|-----------------|
| TC-001 | Positive | Valid GET request | Method: GET | 200-299 Success |
| TC-002 | Negative | Invalid HTTP method | Method: GET/POST mismatch | 405 Method Not Allowed |
| TC-003 | Negative | Invalid id | Path: id = invalid-id | 400 or 404 |
| TC-004 | Negative | Missing id | Path: id = None | 400 Bad Request |
| TC-005 | Security | SQL injection in path param | Path: id = ' OR 1=1 | Safely handled |
| TC-006 | Performance | Response time check | Method: GET | < 3s |

---

## API-005: PATCH {{baseUrl}}/config/{id}

### Description

Update a numbering configuration by ID

### Request { API-005: PATCH {{baseUrl}}/config/{id} }

- Method: PATCH
- URL: `http://numservice-qa.appvity.com/numbering-service/api/v1/config/{id}`
- Body:
```json
{
  "sequentialNumberDef": "<string>",
  "integerDigit": "<string>",
  "numberingPattern": "<string>",
  "numberingPatternHTML": "<string>",
  "code": "<string>"
}
```

### Test Cases { API-005: PATCH {{baseUrl}}/config/{id} }

| ID | Category | Description | Request Override | Expected Result |
|----|----------|-------------|------------------|-----------------|
| TC-001 | Positive | Valid PATCH request | Method: PATCH | 200-299 Success |
| TC-002 | Negative | Invalid HTTP method | Method: GET/POST mismatch | 405 Method Not Allowed |
| TC-003 | Negative | Invalid id | Path: id = invalid-id | 400 or 404 |
| TC-004 | Negative | Missing id | Path: id = None | 400 Bad Request |
| TC-005 | Security | SQL injection in path param | Path: id = ' OR 1=1 | Safely handled |
| TC-006 | Negative | Missing request body | Body: None | 400 Bad Request |
| TC-007 | Negative | Invalid JSON body | Body: malformed JSON | 400 Bad Request |
| TC-008 | Negative | Invalid Content-Type | Content-Type: text/plain | 415 Unsupported Media Type |
| TC-009 | Performance | Response time check | Method: PATCH | < 3s |

---

## API-006: DELETE {{baseUrl}}/config/{id}

### Description

Delete a numbering configuration by ID

### Request { API-006: DELETE {{baseUrl}}/config/{id} }

- Method: DELETE
- URL: `http://numservice-qa.appvity.com/numbering-service/api/v1/config/{id}`
- Body: None

### Test Cases { API-006: DELETE {{baseUrl}}/config/{id} }

| ID | Category | Description | Request Override | Expected Result |
|----|----------|-------------|------------------|-----------------|
| TC-001 | Positive | Valid DELETE request | Method: DELETE | 200-299 Success |
| TC-002 | Negative | Invalid HTTP method | Method: GET/POST mismatch | 405 Method Not Allowed |
| TC-003 | Negative | Invalid id | Path: id = invalid-id | 400 or 404 |
| TC-004 | Negative | Missing id | Path: id = None | 400 Bad Request |
| TC-005 | Security | SQL injection in path param | Path: id = ' OR 1=1 | Safely handled |
| TC-006 | Performance | Response time check | Method: DELETE | < 3s |

---

## API-007: GET {{baseUrl}}/codeMapping

### Description

Retrieve all code mappings with optional OData query parameters

### Request { API-007: GET {{baseUrl}}/codeMapping }

- Method: GET
- URL: `http://numservice-qa.appvity.com/numbering-service/api/v1/codeMapping`
- Body: None

### Test Cases { API-007: GET {{baseUrl}}/codeMapping }

| ID | Category | Description | Request Override | Expected Result |
|----|----------|-------------|------------------|-----------------|
| TC-001 | Positive | Valid GET request | Method: GET | 200-299 Success |
| TC-002 | Negative | Invalid HTTP method | Method: GET/POST mismatch | 405 Method Not Allowed |
| TC-003 | Security | SQL injection in query | Query: injection test | Safely handled |
| TC-004 | Performance | Response time check | Method: GET | < 3s |

---

## API-008: POST {{baseUrl}}/codeMapping

### Description

Create a new code mapping

### Request { API-008: POST {{baseUrl}}/codeMapping }

- Method: POST
- URL: `http://numservice-qa.appvity.com/numbering-service/api/v1/codeMapping`
- Body:
```json
{
  "propertyName": "<string>",
  "value": "<string>",
  "code": "<string>",
  "tenantId": "<string>",
  "application": "<string>",
  "object": "<string>",
  "teamId": "<string>",
  "channelId": "<string>"
}
```

### Test Cases { API-008: POST {{baseUrl}}/codeMapping }

| ID | Category | Description | Request Override | Expected Result |
|----|----------|-------------|------------------|-----------------|
| TC-001 | Positive | Valid POST request | Method: POST | 200-299 Success |
| TC-002 | Negative | Invalid HTTP method | Method: GET/POST mismatch | 405 Method Not Allowed |
| TC-003 | Negative | Missing request body | Body: None | 400 Bad Request |
| TC-004 | Negative | Invalid JSON body | Body: malformed JSON | 400 Bad Request |
| TC-005 | Negative | Invalid Content-Type | Content-Type: text/plain | 415 Unsupported Media Type |
| TC-006 | Performance | Response time check | Method: POST | < 3s |

---

## API-009: GET {{baseUrl}}/codeMapping/{id}

### Description

Retrieve a specific code mapping by its ID

### Request { API-009: GET {{baseUrl}}/codeMapping/{id} }

- Method: GET
- URL: `http://numservice-qa.appvity.com/numbering-service/api/v1/codeMapping/{id}`
- Body: None

### Test Cases { API-009: GET {{baseUrl}}/codeMapping/{id} }

| ID | Category | Description | Request Override | Expected Result |
|----|----------|-------------|------------------|-----------------|
| TC-001 | Positive | Valid GET request | Method: GET | 200-299 Success |
| TC-002 | Negative | Invalid HTTP method | Method: GET/POST mismatch | 405 Method Not Allowed |
| TC-003 | Negative | Invalid id | Path: id = invalid-id | 400 or 404 |
| TC-004 | Negative | Missing id | Path: id = None | 400 Bad Request |
| TC-005 | Security | SQL injection in path param | Path: id = ' OR 1=1 | Safely handled |
| TC-006 | Performance | Response time check | Method: GET | < 3s |

---

## API-010: PATCH {{baseUrl}}/codeMapping/{id}

### Description

Update a code mapping by ID

### Request { API-010: PATCH {{baseUrl}}/codeMapping/{id} }

- Method: PATCH
- URL: `http://numservice-qa.appvity.com/numbering-service/api/v1/codeMapping/{id}`
- Body:
```json
{
  "code": "<string>"
}
```

### Test Cases { API-010: PATCH {{baseUrl}}/codeMapping/{id} }

| ID | Category | Description | Request Override | Expected Result |
|----|----------|-------------|------------------|-----------------|
| TC-001 | Positive | Valid PATCH request | Method: PATCH | 200-299 Success |
| TC-002 | Negative | Invalid HTTP method | Method: GET/POST mismatch | 405 Method Not Allowed |
| TC-003 | Negative | Invalid id | Path: id = invalid-id | 400 or 404 |
| TC-004 | Negative | Missing id | Path: id = None | 400 Bad Request |
| TC-005 | Security | SQL injection in path param | Path: id = ' OR 1=1 | Safely handled |
| TC-006 | Negative | Missing request body | Body: None | 400 Bad Request |
| TC-007 | Negative | Invalid JSON body | Body: malformed JSON | 400 Bad Request |
| TC-008 | Negative | Invalid Content-Type | Content-Type: text/plain | 415 Unsupported Media Type |
| TC-009 | Performance | Response time check | Method: PATCH | < 3s |

---

## API-011: DELETE {{baseUrl}}/codeMapping/{id}

### Description

Delete a code mapping by ID

### Request { API-011: DELETE {{baseUrl}}/codeMapping/{id} }

- Method: DELETE
- URL: `http://numservice-qa.appvity.com/numbering-service/api/v1/codeMapping/{id}`
- Body: None

### Test Cases { API-011: DELETE {{baseUrl}}/codeMapping/{id} }

| ID | Category | Description | Request Override | Expected Result |
|----|----------|-------------|------------------|-----------------|
| TC-001 | Positive | Valid DELETE request | Method: DELETE | 200-299 Success |
| TC-002 | Negative | Invalid HTTP method | Method: GET/POST mismatch | 405 Method Not Allowed |
| TC-003 | Negative | Invalid id | Path: id = invalid-id | 400 or 404 |
| TC-004 | Negative | Missing id | Path: id = None | 400 Bad Request |
| TC-005 | Security | SQL injection in path param | Path: id = ' OR 1=1 | Safely handled |
| TC-006 | Performance | Response time check | Method: DELETE | < 3s |

---

## API-012: GET {{baseUrl}}/requestNumber

### Description

Retrieve all request numbers with optional OData query parameters

### Request { API-012: GET {{baseUrl}}/requestNumber }

- Method: GET
- URL: `http://numservice-qa.appvity.com/numbering-service/api/v1/requestNumber`
- Body: None

### Test Cases { API-012: GET {{baseUrl}}/requestNumber }

| ID | Category | Description | Request Override | Expected Result |
|----|----------|-------------|------------------|-----------------|
| TC-001 | Positive | Valid GET request | Method: GET | 200-299 Success |
| TC-002 | Negative | Invalid HTTP method | Method: GET/POST mismatch | 405 Method Not Allowed |
| TC-003 | Security | SQL injection in query | Query: injection test | Safely handled |
| TC-004 | Performance | Response time check | Method: GET | < 3s |

---

## API-013: POST {{baseUrl}}/requestNumber

### Description

Create a new request number

### Request { API-013: POST {{baseUrl}}/requestNumber }

- Method: POST
- URL: `http://numservice-qa.appvity.com/numbering-service/api/v1/requestNumber`
- Body:
```json
{
  "_id": "<string>",
  "tenantId": "<string>",
  "application": "<string>",
  "object": "<string>",
  "createdBy": {
    "_id": "<string>",
    "username": "<string>"
  },
  "teamId": "<string>",
  "channelId": "<string>"
}
```

### Test Cases { API-013: POST {{baseUrl}}/requestNumber }

| ID | Category | Description | Request Override | Expected Result |
|----|----------|-------------|------------------|-----------------|
| TC-001 | Positive | Valid POST request | Method: POST | 200-299 Success |
| TC-002 | Negative | Invalid HTTP method | Method: GET/POST mismatch | 405 Method Not Allowed |
| TC-003 | Negative | Missing request body | Body: None | 400 Bad Request |
| TC-004 | Negative | Invalid JSON body | Body: malformed JSON | 400 Bad Request |
| TC-005 | Negative | Invalid Content-Type | Content-Type: text/plain | 415 Unsupported Media Type |
| TC-006 | Performance | Response time check | Method: POST | < 3s |

---

## API-014: GET {{baseUrl}}/requestNumber/search

### Description

Get all request numbers by search keyword

### Request { API-014: GET {{baseUrl}}/requestNumber/search }

- Method: GET
- URL: `http://numservice-qa.appvity.com/numbering-service/api/v1/requestNumber/search`
- Body: None

### Test Cases { API-014: GET {{baseUrl}}/requestNumber/search }

| ID | Category | Description | Request Override | Expected Result |
|----|----------|-------------|------------------|-----------------|
| TC-001 | Positive | Valid GET request | Method: GET | 200-299 Success |
| TC-002 | Negative | Invalid HTTP method | Method: GET/POST mismatch | 405 Method Not Allowed |
| TC-003 | Security | SQL injection in query | Query: injection test | Safely handled |
| TC-004 | Performance | Response time check | Method: GET | < 3s |

---

## API-015: POST {{baseUrl}}/requestNumber/batch

### Description

Create multiple request numbers in batch

### Request { API-015: POST {{baseUrl}}/requestNumber/batch }

- Method: POST
- URL: `http://numservice-qa.appvity.com/numbering-service/api/v1/requestNumber/batch`
- Body:
```json
{
  "targets": [
    {
      "_id": "<string>",
      "tenantId": "<string>",
      "application": "<string>",
      "object": "<string>",
      "createdBy": {
        "_id": "<string>",
        "username": "<string>"
      },
      "teamId": "<string>",
      "channelId": "<string>"
    },
    {
      "_id": "<string>",
      "tenantId": "<string>",
      "application": "<string>",
      "object": "<string>",
      "createdBy": {
        "_id": "<string>",
        "username": "<string>"
      },
      "teamId": "<string>",
      "channelId": "<string>"
    }
  ],
  "method": "sequential",
  "execItem": 20
}
```

### Test Cases { API-015: POST {{baseUrl}}/requestNumber/batch }

| ID | Category | Description | Request Override | Expected Result |
|----|----------|-------------|------------------|-----------------|
| TC-001 | Positive | Valid POST request | Method: POST | 200-299 Success |
| TC-002 | Negative | Invalid HTTP method | Method: GET/POST mismatch | 405 Method Not Allowed |
| TC-003 | Negative | Missing request body | Body: None | 400 Bad Request |
| TC-004 | Negative | Invalid JSON body | Body: malformed JSON | 400 Bad Request |
| TC-005 | Negative | Invalid Content-Type | Content-Type: text/plain | 415 Unsupported Media Type |
| TC-006 | Performance | Response time check | Method: POST | < 3s |

---

## API-016: GET {{baseUrl}}/sequentialNumber

### Description

Retrieve all sequential numbers with optional OData query parameters

### Request { API-016: GET {{baseUrl}}/sequentialNumber }

- Method: GET
- URL: `http://numservice-qa.appvity.com/numbering-service/api/v1/sequentialNumber`
- Body: None

### Test Cases { API-016: GET {{baseUrl}}/sequentialNumber }

| ID | Category | Description | Request Override | Expected Result |
|----|----------|-------------|------------------|-----------------|
| TC-001 | Positive | Valid GET request | Method: GET | 200-299 Success |
| TC-002 | Negative | Invalid HTTP method | Method: GET/POST mismatch | 405 Method Not Allowed |
| TC-003 | Security | SQL injection in query | Query: injection test | Safely handled |
| TC-004 | Performance | Response time check | Method: GET | < 3s |

---

## API-017: POST {{baseUrl}}/sequentialNumber

### Description

Create a new sequential number

### Request { API-017: POST {{baseUrl}}/sequentialNumber }

- Method: POST
- URL: `http://numservice-qa.appvity.com/numbering-service/api/v1/sequentialNumber`
- Body:
```json
{
  "sequentialNumberDef": "<string>",
  "sequentialNumber": "<number>"
}
```

### Test Cases { API-017: POST {{baseUrl}}/sequentialNumber }

| ID | Category | Description | Request Override | Expected Result |
|----|----------|-------------|------------------|-----------------|
| TC-001 | Positive | Valid POST request | Method: POST | 200-299 Success |
| TC-002 | Negative | Invalid HTTP method | Method: GET/POST mismatch | 405 Method Not Allowed |
| TC-003 | Negative | Missing request body | Body: None | 400 Bad Request |
| TC-004 | Negative | Invalid JSON body | Body: malformed JSON | 400 Bad Request |
| TC-005 | Negative | Invalid Content-Type | Content-Type: text/plain | 415 Unsupported Media Type |
| TC-006 | Performance | Response time check | Method: POST | < 3s |

---

## API-018: GET {{baseUrl}}/sequentialNumber/{id}

### Description

Retrieve a specific sequential number by its ID

### Request { API-018: GET {{baseUrl}}/sequentialNumber/{id} }

- Method: GET
- URL: `http://numservice-qa.appvity.com/numbering-service/api/v1/sequentialNumber/{id}`
- Body: None

### Test Cases { API-018: GET {{baseUrl}}/sequentialNumber/{id} }

| ID | Category | Description | Request Override | Expected Result |
|----|----------|-------------|------------------|-----------------|
| TC-001 | Positive | Valid GET request | Method: GET | 200-299 Success |
| TC-002 | Negative | Invalid HTTP method | Method: GET/POST mismatch | 405 Method Not Allowed |
| TC-003 | Negative | Invalid id | Path: id = invalid-id | 400 or 404 |
| TC-004 | Negative | Missing id | Path: id = None | 400 Bad Request |
| TC-005 | Security | SQL injection in path param | Path: id = ' OR 1=1 | Safely handled |
| TC-006 | Performance | Response time check | Method: GET | < 3s |

---

## API-019: PATCH {{baseUrl}}/sequentialNumber/{id}

### Description

Update a sequential number by ID

### Request { API-019: PATCH {{baseUrl}}/sequentialNumber/{id} }

- Method: PATCH
- URL: `http://numservice-qa.appvity.com/numbering-service/api/v1/sequentialNumber/{id}`
- Body:
```json
{
  "sequentialNumber": "<number>"
}
```

### Test Cases { API-019: PATCH {{baseUrl}}/sequentialNumber/{id} }

| ID | Category | Description | Request Override | Expected Result |
|----|----------|-------------|------------------|-----------------|
| TC-001 | Positive | Valid PATCH request | Method: PATCH | 200-299 Success |
| TC-002 | Negative | Invalid HTTP method | Method: GET/POST mismatch | 405 Method Not Allowed |
| TC-003 | Negative | Invalid id | Path: id = invalid-id | 400 or 404 |
| TC-004 | Negative | Missing id | Path: id = None | 400 Bad Request |
| TC-005 | Security | SQL injection in path param | Path: id = ' OR 1=1 | Safely handled |
| TC-006 | Negative | Missing request body | Body: None | 400 Bad Request |
| TC-007 | Negative | Invalid JSON body | Body: malformed JSON | 400 Bad Request |
| TC-008 | Negative | Invalid Content-Type | Content-Type: text/plain | 415 Unsupported Media Type |
| TC-009 | Performance | Response time check | Method: PATCH | < 3s |

---

## API-020: DELETE {{baseUrl}}/sequentialNumber/{id}

### Description

Delete a sequential number by ID

### Request { API-020: DELETE {{baseUrl}}/sequentialNumber/{id} }

- Method: DELETE
- URL: `http://numservice-qa.appvity.com/numbering-service/api/v1/sequentialNumber/{id}`
- Body: None

### Test Cases { API-020: DELETE {{baseUrl}}/sequentialNumber/{id} }

| ID | Category | Description | Request Override | Expected Result |
|----|----------|-------------|------------------|-----------------|
| TC-001 | Positive | Valid DELETE request | Method: DELETE | 200-299 Success |
| TC-002 | Negative | Invalid HTTP method | Method: GET/POST mismatch | 405 Method Not Allowed |
| TC-003 | Negative | Invalid id | Path: id = invalid-id | 400 or 404 |
| TC-004 | Negative | Missing id | Path: id = None | 400 Bad Request |
| TC-005 | Security | SQL injection in path param | Path: id = ' OR 1=1 | Safely handled |
| TC-006 | Performance | Response time check | Method: DELETE | < 3s |

---

## API-021: GET {{baseUrl}}/runningNumber

### Description

Retrieve all running numbers with optional OData query parameters

### Request { API-021: GET {{baseUrl}}/runningNumber }

- Method: GET
- URL: `http://numservice-qa.appvity.com/numbering-service/api/v1/runningNumber`
- Body: None

### Test Cases { API-021: GET {{baseUrl}}/runningNumber }

| ID | Category | Description | Request Override | Expected Result |
|----|----------|-------------|------------------|-----------------|
| TC-001 | Positive | Valid GET request | Method: GET | 200-299 Success |
| TC-002 | Negative | Invalid HTTP method | Method: GET/POST mismatch | 405 Method Not Allowed |
| TC-003 | Security | SQL injection in query | Query: injection test | Safely handled |
| TC-004 | Performance | Response time check | Method: GET | < 3s |

---

## API-022: POST {{baseUrl}}/runningNumber

### Description

Create a new running number

### Request { API-022: POST {{baseUrl}}/runningNumber }

- Method: POST
- URL: `http://numservice-qa.appvity.com/numbering-service/api/v1/runningNumber`
- Body:
```json
{
  "runningNumberDef": "<string>",
  "runningNumber": "<number>"
}
```

### Test Cases { API-022: POST {{baseUrl}}/runningNumber }

| ID | Category | Description | Request Override | Expected Result |
|----|----------|-------------|------------------|-----------------|
| TC-001 | Positive | Valid POST request | Method: POST | 200-299 Success |
| TC-002 | Negative | Invalid HTTP method | Method: GET/POST mismatch | 405 Method Not Allowed |
| TC-003 | Negative | Missing request body | Body: None | 400 Bad Request |
| TC-004 | Negative | Invalid JSON body | Body: malformed JSON | 400 Bad Request |
| TC-005 | Negative | Invalid Content-Type | Content-Type: text/plain | 415 Unsupported Media Type |
| TC-006 | Performance | Response time check | Method: POST | < 3s |

---

## API-023: GET {{baseUrl}}/runningNumber/{id}

### Description

Retrieve a specific running number by its ID

### Request { API-023: GET {{baseUrl}}/runningNumber/{id} }

- Method: GET
- URL: `http://numservice-qa.appvity.com/numbering-service/api/v1/runningNumber/{id}`
- Body: None

### Test Cases { API-023: GET {{baseUrl}}/runningNumber/{id} }

| ID | Category | Description | Request Override | Expected Result |
|----|----------|-------------|------------------|-----------------|
| TC-001 | Positive | Valid GET request | Method: GET | 200-299 Success |
| TC-002 | Negative | Invalid HTTP method | Method: GET/POST mismatch | 405 Method Not Allowed |
| TC-003 | Negative | Invalid id | Path: id = invalid-id | 400 or 404 |
| TC-004 | Negative | Missing id | Path: id = None | 400 Bad Request |
| TC-005 | Security | SQL injection in path param | Path: id = ' OR 1=1 | Safely handled |
| TC-006 | Performance | Response time check | Method: GET | < 3s |

---

## API-024: PATCH {{baseUrl}}/runningNumber/{id}

### Description

Update a running number by ID

### Request { API-024: PATCH {{baseUrl}}/runningNumber/{id} }

- Method: PATCH
- URL: `http://numservice-qa.appvity.com/numbering-service/api/v1/runningNumber/{id}`
- Body:
```json
{
  "runningNumber": "<number>"
}
```

### Test Cases { API-024: PATCH {{baseUrl}}/runningNumber/{id} }

| ID | Category | Description | Request Override | Expected Result |
|----|----------|-------------|------------------|-----------------|
| TC-001 | Positive | Valid PATCH request | Method: PATCH | 200-299 Success |
| TC-002 | Negative | Invalid HTTP method | Method: GET/POST mismatch | 405 Method Not Allowed |
| TC-003 | Negative | Invalid id | Path: id = invalid-id | 400 or 404 |
| TC-004 | Negative | Missing id | Path: id = None | 400 Bad Request |
| TC-005 | Security | SQL injection in path param | Path: id = ' OR 1=1 | Safely handled |
| TC-006 | Negative | Missing request body | Body: None | 400 Bad Request |
| TC-007 | Negative | Invalid JSON body | Body: malformed JSON | 400 Bad Request |
| TC-008 | Negative | Invalid Content-Type | Content-Type: text/plain | 415 Unsupported Media Type |
| TC-009 | Performance | Response time check | Method: PATCH | < 3s |

---

## API-025: DELETE {{baseUrl}}/runningNumber/{id}

### Description

Delete a running number by ID

### Request { API-025: DELETE {{baseUrl}}/runningNumber/{id} }

- Method: DELETE
- URL: `http://numservice-qa.appvity.com/numbering-service/api/v1/runningNumber/{id}`
- Body: None

### Test Cases { API-025: DELETE {{baseUrl}}/runningNumber/{id} }

| ID | Category | Description | Request Override | Expected Result |
|----|----------|-------------|------------------|-----------------|
| TC-001 | Positive | Valid DELETE request | Method: DELETE | 200-299 Success |
| TC-002 | Negative | Invalid HTTP method | Method: GET/POST mismatch | 405 Method Not Allowed |
| TC-003 | Negative | Invalid id | Path: id = invalid-id | 400 or 404 |
| TC-004 | Negative | Missing id | Path: id = None | 400 Bad Request |
| TC-005 | Security | SQL injection in path param | Path: id = ' OR 1=1 | Safely handled |
| TC-006 | Performance | Response time check | Method: DELETE | < 3s |

---
