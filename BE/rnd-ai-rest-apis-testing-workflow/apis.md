# API Test Specifications

- This document defines REST APIs to be tested automatically by Codex AI.
- Each API block is independent and includes expectations and test scenarios.

---

## Variables

- Name: `base_url`
  - Value: `https://autotesting.360awareqa.com`

- Name: `auth_token`
  - Value: `Bearer xxx`

---

## API-001: KMI - GET USERS

### Description

GET USERS

### Request

- Method: GET
- URL: `{{base_url}}/v2/web/odata/SEPAOrgs/SE.GetUsers`
- Headers:
  - Content-Type: `application/json`
  - Authorization: `{{auth_token}}`
- Params:
  - $top: `1`
- Body: None

### Test Cases

| ID     | Category    | Description                | Request /Method / Params / Validation/ Query | Expected Result                          |
| ------ | ----------- | -------------------------- | -------------------------------------------- | ---------------------------------------- |
| TC-001 | Positive    | Valid GET request          | No params                                    | Status code is in range 200–299          |
| TC-002 | Negative    | Invalid method (GET)       | GET                                          | Status code is not 2xx                   |
| TC-003 | Negative    | Unauthorized request       | Unauthorized token                           | Status code is 401                       |
| TC-004 | Positive    | Get top 1 user             | ?$top=1                                      | 200 OK, returns exactly 1 user           |
| TC-005 | Positive    | Count total users          | $count=true                                  | 200 OK, includes total count in response |
| TC-006 | Negative    | Invalid method POST        | POST                                         | 405 Method Not Allowed                   |
| TC-007 | Performance | Large page size            | ?$top=1000                                   | 200 OK, response time < 3s               |
| TC-008 | Performance | Deep pagination            | ?$skip=5000&$top=10                          | 200 OK, response time acceptable         |
| TC-009 | Data        | Response schema validation | Check JSON structure                         | Matches defined schema                   |

---

---

## API-002: KMI - CREATE TEAM

### Description

CREATE TEAM

### Request

- Method: POST
- URL: `{{base_url}}/v2/web/odata/SETeams`
- Headers:
  - Content-Type: `application/json`
  - Authorization: `{{auth_token}}`
- Body:

```json
{
  "name": "CREATE BY CODEX",
  "description": ""
}
```

### Test Cases

| ID     | Category | Description                   | Request /Method / Params / Validation/ Query | Expected Result                 |
| ------ | -------- | ----------------------------- | -------------------------------------------- | ------------------------------- |
| TC-001 | Positive | Valid GET request             | GET                                          | Status code is in range 200–299 |
| TC-002 | Negative | Invalid method (GET)          | GET                                          | Status code is not 2xx          |
| TC-003 | Negative | Unauthorized request          | Unauthorized token                           | Status code is 401              |
| TC-004 | Negative | Missing required field 'name' |                                              | Status 400 - Bad Request        |
| TC-005 | Negative | Duplicate team name           |                                              | Status 409 - Conflict           |
| TC-006 | Negative | Invalid JSON format           |                                              | Status 400 - Bad Request        |
| TC-007 | Negative | Expired/invalid auth token    |                                              | Status 401 - Unauthorized       |
| TC-008 | Positive | Create team with description  |                                              | Status 201 - Created            |
| TC-009 | Negative | Name exceeds max length       |                                              | Status 400 - Bad Request        |
| TC-010 | Negative | Empty/null name value         |                                              | Status 400 - Bad Request        |

---

---

## API-002: KMI - CREATE PROJECT

### Description

CREATE PROJECT

### Request

- Method: POST
- URL: `{{base_url}}/v2/web/odata/SEProjects`
- Headers:
  - Content-Type: `application/json`
  - Authorization: `{{auth_token}}`
- Body:

```json
{
  "name": "PROJECT",
  "description": "",
  "startDate": "2026-01-01T05:00:00Z",
  "code": "1000",
  "office": "APPVITY",
  "status": "Active",
  "enableSavePhotoCollects": 1,
  "enableSaveStreamOnlyCollects": 1,
  "enableSaveStreamAndRecordCollects": 1,
  "passwordType": "system",
  "teamID": 6452
}
```

### Test Cases

| ID     | Category | Description          | Request /Method / Params / Validation/ Query | Expected Result                 |
| ------ | -------- | -------------------- | -------------------------------------------- | ------------------------------- |
| TC-001 | Positive | Valid GET request    | GET                                          | Status code is in range 200–299 |
| TC-002 | Negative | Invalid method (GET) | GET                                          | Status code is not 2xx          |
| TC-003 | Negative | Unauthorized request | Unauthorized token                           | Status code is 401              |

---
