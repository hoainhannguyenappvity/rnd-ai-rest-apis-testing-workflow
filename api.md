# API Test Specifications

This document defines REST APIs to be tested automatically by Codex AI. Each API block is independent and includes expectations and test scenarios.

---

## API-001: KMI - GET USERS

### Description

GET USERS API retrieves a list of users from the KMI system. It supports pagination and filtering through OData query parameters.

### Request { API-001: KMI - GET USERS }

- Method: GET
- URL: `{{base_url}}/v2/web/odata/SEPAOrgs/SE.GetUsers`
- Headers:
  - Content-Type: `application/json`
  - Authorization: `{{auth_token}}`
- Params:
  - $top: `1`
- Body: None

### Test Cases { API-001: KMI - GET USERS }

| ID     | Category    | Description          | Request Override (Method / Params / Headers)   | Expected Result                  |
| ------ | ----------- | -------------------- | ---------------------------------------------- | -------------------------------- |
| TC-001 | Positive    | Valid GET request    | Method: GET                                    | Status code 200–299              |
| TC-002 | Negative    | Unauthorized request | Headers: Authorization = None                  | 401 Unauthorized                 |
| TC-003 | Positive    | Get top 1 user       | Params: `$top=1`                               | 200 OK, exactly 1 user returned  |
| TC-004 | Positive    | Count total users    | Params: `$count=true`                          | 200 OK, includes total count     |
| TC-005 | Negative    | Invalid method POST  | Method: POST                                   | 405 Method Not Allowed           |
| TC-006 | Performance | Large page size      | Params: `$top=1000`, `$count=true`             | 200 OK, response time < 3s       |
| TC-007 | Performance | Deep pagination      | Params: `$skip=5000`, `$top=10`, `$count=true` | 200 OK, response time acceptable |

---

---

## API-002: KMI - CREATE TEAM

### Description

### Request { API-002: KMI - CREATE TEAM }

- Method: POST
- URL: `{{base_url}}/v2/web/odata/SETeams`
- Headers:
  - Content-Type: `application/json`
  - Authorization: `{{auth_token}}`
- Params: None
- Body:

```json
{ "name": "Teams", "description": "" }
```

### Test Cases { API-002: KMI - CREATE TEAM }

| ID     | Category    | Description                              | Request Override (Method / Headers / Body)                                                                                | Expected Result                                                                                      |
| ------ | ----------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| TC-001 | Positive    | Create team successfully with valid data | **Method:** POST<br>**Body:** `{ "name": "Create By Codex", "description": "" }`                                          | 201 Created (or 200 OK); team is created; response contains id/key and correct `name`, `description` |
| TC-002 | Negative    | Unauthorized request                     | **Method:** POST<br>**Headers:** Authorization: None<br>**Body:** `{ "name": "Teams", "description": "" }`                | 401 Unauthorized (or 403); team is not created                                                       |
| TC-003 | Negative    | Missing required field `name`            | **Method:** POST<br>**Body:** `{ "description": "abc" }`                                                                  | 400/422; validation error for missing `name`; team is not created                                    |
| TC-004 | Negative    | `name` is an empty string                | **Method:** POST<br>**Body:** `{ "name": "", "description": "abc" }`                                                      | 400/422; validation error for `name`; team is not created                                            |
| TC-005 | Negative    | `name` contains only whitespace          | **Method:** POST<br>**Body:** `{ "name": "   ", "description": "abc" }`                                                   | 400/422; validation error for `name`; team is not created                                            |
| TC-006 | Negative    | Duplicate team name                      | **Pre-condition:** Team "Teams" exists<br>**Method:** POST<br>**Body:** `{ "name": "Teams", "description": "duplicate" }` | 409 Conflict (or 400); duplicate team is not created                                                 |
| TC-007 | Negative    | Invalid Content-Type                     | **Method:** POST<br>**Headers:** Content-Type: text/plain<br>**Body:** `{ "name": "Teams", "description": "" }`           | 415 Unsupported Media Type (or 400); team is not created                                             |
| TC-008 | Negative    | Invalid JSON body                        | **Method:** POST<br>**Body:** malformed JSON                                                                              | 400 Bad Request; team is not created                                                                 |
| TC-009 | Negative    | `description` exceeds maximum length     | **Method:** POST<br>**Body:** `{ "name": "Team Long Desc", "description": "<very long string>" }`                         | 400/422; validation error for `description`; team is not created                                     |
| TC-010 | Security    | Injection payload in `name`              | **Method:** POST<br>**Body:** `{ "name": "Teams' OR '1'='1", "description": "test" }`                                     | No 5xx error; request rejected (400/422) or safely handled                                           |
| TC-011 | Performance | Create team response time                | **Method:** POST<br>**Body:** `{ "name": "Teams Perf", "description": "performance test" }`                               | 200/201; response time < 3 seconds                                                                   |
| TC-012 | Negative    | Invalid HTTP method on create endpoint   | **Method:** GET<br>**Body:** None                                                                                         | 405 Method Not Allowed (or appropriate 4xx); team is not created                                     |
| TC-013 | Negative    | Invalid characters in `name`             | **Method:** POST<br>**Body:** `{ "name": "<Team>/?", "description": "invalid chars" }`                                    | 400/422; validation error for `name`; team is not created                                            |
| TC-014 | Positive    | Description omitted                      | **Method:** POST<br>**Body:** `{ "name": "No Description" }`                                                              | 201 Created (or 200 OK); team is created with default/empty `description`                            |

---
