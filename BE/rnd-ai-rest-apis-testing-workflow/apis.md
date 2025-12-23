# API Test Specifications

This document defines REST APIs to be tested automatically by Codex AI.
Each API block is independent and includes expectations and test scenarios.

Note: Variables in format ${VARIABLE_NAME} will be replaced from .env file.

---

# Environment Variables Reference

The following variables are defined in .env:

${BASE_URL_LOCAL} - Local server URL
${BASE_URL} - Remote server URL
${AUTH_TOKEN} - Bearer authentication token
${TIMEOUT_MS} - Request timeout in milliseconds
${CONTENT_TYPE_JSON} - JSON content type
${STATUS_SUCCESS_MIN} - Minimum success status code
${STATUS_SUCCESS_MAX} - Maximum success status code
${STATUS_NOT_ALLOWED} - Method Not Allowed
${STATUS_NOT_FOUND} - Server could not find the resource

---

## API-001: Ping Service

### Description

Health check endpoint to verify the service is running.

### Request

- **Method:** POST
- **URL:** ${BASE_URL_LOCAL}/ping
- **Headers:**
  - Content-Type: ${CONTENT_TYPE_JSON}
- **Authentication:** None
- **Body:** None

### Expectations

- **Status Code:** 2xx
- **Response Body:** Optional

### Test Cases

| ID     | Type     | Description              | Expected                                            |
| ------ | -------- | ------------------------ | --------------------------------------------------- |
| TC-001 | Positive | Valid POST               | Status: ${STATUS_SUCCESS_MIN}-${STATUS_SUCCESS_MAX} |
| TC-002 | Negative | Invalid method (GET)     | Status: ${STATUS_NOT_ALLOWED}                       |
| TC-003 | Negative | Invalid endpoint (/pong) | Status: ${STATUS_NOT_FOUND}                         |
| TC-004 | Edge     | Request timeout          | Error after 5000ms                                  |

---

---

## API-002: Get Users Service

### Description

Get KMI Users

### Request

- **Method:** GET
- **URL:** ${BASE_URL}/v2/web/odata/SEPAOrgs/SE.GetUsers
- **Headers:**
  - Content-Type: ${CONTENT_TYPE_JSON}
  - Authorization: ${AUTH_TOKEN}
- **Authentication:** Bearer Token
- **Body:** None

### Expectations

- **Status Code:** 2xx
- **Response Body:** Optional

### Test Cases

| ID     | Type     | Description                                 | Expected                                            |
| ------ | -------- | ------------------------------------------- | --------------------------------------------------- |
| TC-001 | Positive | Valid GET                                   | Status: ${STATUS_SUCCESS_MIN}-${STATUS_SUCCESS_MAX} |
| TC-002 | Negative | Invalid method (GET)                        | Status: ${STATUS_NOT_ALLOWED}                       |
| TC-003 | Negative | Invalid endpoint (/SEPAOrgs/SE.GetUsersXXX) | Status: ${STATUS_NOT_FOUND}                         |
| TC-004 | Edge     | Request timeout                             | Error after 5000ms                                  |

---

## API-003: Create Site

### Description

Create Site

### Request

- **Method:** POST
- **URL:** ${BASE_URL}/v2/web/odata/SESites
- **Headers:**
- Content-Type: ${CONTENT_TYPE_JSON}
- Authorization: ${AUTH_TOKEN}
- **Authentication:** Bearer Token
- **Body:**:

```json
{ "name": "Site", "description": "" }
```

### Expectations

- **Status Code:** 2xx
- **Response Body:** Site object

### Test Cases

| ID     | Type     | Description                    | Expected                                            |
| ------ | -------- | ------------------------------ | --------------------------------------------------- |
| TC-001 | Positive | Create Site is Successfully    | Status: ${STATUS_SUCCESS_MIN}-${STATUS_SUCCESS_MAX} |
| TC-002 | Negative | Invalid method (POST)          | Status: ${STATUS_NOT_ALLOWED}                       |
| TC-003 | Negative | Invalid endpoint (/SESitesXXX) | Status: ${STATUS_NOT_FOUND}                         |
| TC-004 | Edge     | Request timeout                | Error after 5000ms                                  |

---
