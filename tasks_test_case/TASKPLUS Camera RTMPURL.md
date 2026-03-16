# API Test Specifications

This document defines REST APIs to be tested automatically by Codex AI. Each API block is independent and includes expectations and test scenarios.

---

## API-001: REST API > PLUS-3978 Manage > Devices > Create Camera > Stream Source Type

### Description

### Request { API-001: Create Camera > Stream Source Type }

- Method: GET
- URL: `{{baseUrl}}/v2/web/odata/SEVMSCameras/SE.GetRTMPUrl(serial='123123')`
- Headers:
  - Content-Type: `application/json`
  - Authorization: `{{auth_token}}`
- Params: None
- Body: None

### Test Cases { API-001: Create Camera > Stream Source Type }

| ID     | Category | Description                    | Request Override (Method / Headers / URL)                                                             | Expected Result                                                                     |
| ------ | -------- | ------------------------------ | ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| TC-001 | Positive | GetRTMPUrl - Happy path        | **Method:** GET                                                                                       | 200; request successful; response contains RtmpUrl (string, starts with rtmp/rtmps) |
| TC-002 | Negative | GetRTMPUrl - Serial missing    | **Method:** GET<br>**URL:** `{{baseUrl}}/v2/web/odata/SEVMSCameras/SE.GetRTMPUrl`                     | 400/403/404; client error; error mentions serial                                    |
| TC-003 | Negative | GetRTMPUrl - Serial whitespace | **Method:** GET<br>**URL:** `{{baseUrl}}/v2/web/odata/SEVMSCameras/SE.GetRTMPUrl(serial='1234 wret')` | 400/403/404; client error; error mentions serial                                    |
| TC-004 | Negative | GetRTMPUrl - Permission denied | **Method:** GET<br>**Headers:** `Authorization=Bearer {{token_no_permission}}`                        | 401                                                                                 |







