# API Test Specifications

This document defines REST APIs to be tested automatically by Codex AI. Each API block is independent and includes expectations and test scenarios.

---

## API-001: KMI - CREATE SITE

### Description

### Request { API-001: KMI - CREATE SITE }

- Method: POST
- URL: `{{base_url}}/v2/web/odata/SESites`
- Headers:
  - Content-Type: `application/json`
  - Authorization: `{{auth_token}}`
- Params: None
- Body:

```json
{
  "name": "Site",
  "description": "Des"
}
```

### Test Cases { API-001: KMI - CREATE SITE }

| ID     | Category    | Description                              | Request Override (Method / Headers / Body)                                                                                 | Expected Result                                                      |
| ------ | ----------- | ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| TC-001 | Positive    | Create site successfully with valid data | **Method:** POST<br>**Body:** `{ "name": "Site {{$timestamp}}", "description": "Des" }`                                    | 201 Created (or 200 OK); site is created; response contains id       |
| TC-002 | Negative    | Unauthorized request                     | **Method:** POST<br>**Headers:** Authorization = None<br>**Body:** `{ "name": "Site", "description": "Des" }`              | 401 Unauthorized (or 403); site is not created                       |
| TC-003 | Negative    | Missing required field `name`            | **Method:** POST<br>**Body:** `{ "description": "Des" }`                                                                   | 400/422 validation error for `name`; site is not created             |
| TC-004 | Negative    | `name` is an empty string                | **Method:** POST<br>**Body:** `{ "name": "", "description": "Des" }`                                                       | 400/422 validation error for `name`; site is not created             |
| TC-005 | Negative    | `name` contains only whitespace          | **Method:** POST<br>**Body:** `{ "name": "   ", "description": "Des" }`                                                    | 400/422 validation error for `name`; site is not created             |
| TC-006 | Negative    | Duplicate site name                      | **Pre-condition:** Site "LT Site" exists<br>**Method:** POST<br>**Body:** `{ "name": "Site", "description": "duplicate" }` | 409 Conflict (or 400); duplicate site is not created                 |
| TC-007 | Negative    | Invalid Content-Type                     | **Method:** POST<br>**Headers:** Content-Type: text/plain<br>**Body:** `{ "name": "Site", "description": "Des" }`          | 415 Unsupported Media Type (or 400)                                  |
| TC-008 | Negative    | Invalid JSON body                        | **Method:** POST<br>**Body:** malformed JSON                                                                               | 400 Bad Request; site is not created                                 |
| TC-009 | Negative    | Description exceeds maximum length       | **Method:** POST<br>**Body:** `{ "name": "Site", "description": "<very long string>" }`                                    | 400/422 validation error for `description`                           |
| TC-010 | Security    | Injection payload in `name`              | **Method:** POST<br>**Body:** `{ "name": "' OR 1=1 --", "description": "test" }`                                           | Request rejected (400/422) or safely handled                         |
| TC-011 | Performance | Create site response time                | **Method:** POST<br>**Body:** `{ "name": "LT Site Perf", "description": "performance test" }`                              | 200/201; response time < 3 seconds                                   |
| TC-012 | Negative    | Invalid HTTP method on create endpoint   | **Method:** GET<br>**Body:** None                                                                                          | 405 Method Not Allowed                                               |
| TC-013 | Negative    | Valid characters in `name`               | **Method:** POST<br>**Body:** `{ "name": "<Site/~!@#$%^&*()>", "description": "valid chars" }`                             | 201 Created (or 200 OK); site is created                             |
| TC-014 | Positive    | Description omitted                      | **Method:** POST<br>**Body:** `{ "name": "LT Site No Desc" }`                                                              | 201 Created (or 200 OK); site created with empty/default description |

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
| TC-001 | Positive    | Create team successfully with valid data | **Method:** POST<br>**Body:** `{ "name": "Teams {{$timestamp}}", "description": "" }`                                     | 201 Created (or 200 OK); team is created; response contains id/key and correct `name`, `description` |
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
| TC-013 | Negative    | valid characters in `name`               | **Method:** POST<br>**Body:** `{ "name": "<Team>/?", "description": "invalid chars" }`                                    | 201 Created (or 200 OK); team is created                                                             |
| TC-014 | Positive    | Description omitted                      | **Method:** POST<br>**Body:** `{ "name": "No Description" }`                                                              | 201 Created (or 200 OK); team is created with default/empty `description`                            |

---
