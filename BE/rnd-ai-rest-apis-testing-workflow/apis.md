# API Test Specifications

This document defines REST APIs to be tested automatically by Codex AI.
Each API block is independent and includes expectations and test scenarios.

---

## API-001: Ping Service

### Description

Health check endpoint to verify the service is running.

### Request

- **Method:** POST
- **URL:** localhost:3000/ping
- **Headers:**
  - Content-Type: application/json
- **Authentication:** None
- **Body:** None

### Expectations

- **Status Code:** 2xx
- **Response Body:** Optional

### Test Cases

| ID     | Type     | Description          | Expected                        |
|--------|----------|----------------------|---------------------------------|
| TC-001 | Positive | Valid POST request   | Status code is in range 200–299 |
| TC-002 | Negative | Invalid method (GET) | Status code is not 2xx          |

---
