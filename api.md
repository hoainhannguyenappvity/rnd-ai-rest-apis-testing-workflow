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

- `TC-001`:
  - Category: Positive
  - Description: Valid GET request
  - Request Override:
    - Method: GET
  - Expected Result:
    - Status code is in range 200–299

- `TC-002`:
  - Category: Negative
  - Description: Unauthorized request
  - Request Override:
    - Headers:
      - Authorization: None
  - Expected Result:
    - Status code is 401

- `TC-003`:
  - Category: Positive
  - Description: Get top 1 user
  - Request Override:
    - Params:
      - $top: 1
  - Expected Result:
    - 200 OK, returns exactly 1 user

- `TC-004`:
  - Category: Positive
  - Description: Count total users
  - Request Override:
    - Params:
      - $count: true
  - Expected Result:
    - 200 OK, includes total count in response

- `TC-005`:
  - Category: Negative
  - Description: Invalid method POST
  - Request Override:
    - Method: POST
    - Body: None
  - Expected Result:
    - 405 Method Not Allowed

- `TC-006`:
  - Category: Performance
  - Description: Large page size
  - Request Override:
    - Params:
      - $top: 1000
      - $count: true
  - Expected Result:
    - 200 OK, response time < 3s

- `TC-007`:
  - Category: Performance
  - Description: Deep pagination
  - Request Override:
    - Params:
      - $skip: 5000
      - $top: 10
      - $count: true
  - Expected Result:
    - 200 OK, response time acceptable

---
