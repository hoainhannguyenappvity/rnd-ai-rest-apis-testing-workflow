# API Test Specifications

- This document defines REST APIs to be tested automatically by Codex AI.
- Each API block is independent and includes expectations and test scenarios.

---

## Variables

- Name: `base_url`
  - Value: `https://qaweb360plus.360awareqa.com`

- Name: `auth_token`
  - Value: `Bearer xxx`

---

## API-001: KMI Users Service

### Description

KMI Users

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

| ID     | Type     | Description                | Expected                        |
|--------|----------|----------------------------|---------------------------------|
| TC-001 | Positive | Valid GET request          | Status code is in range 200–299 |
| TC-002 | Negative | Invalid method (GET)       | Status code is not 2xx          |
| TC-003 | Negative | Unauthorized request       | Status code is 401              |

---
