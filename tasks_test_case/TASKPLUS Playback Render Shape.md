# API Test Specifications

This document defines REST APIs to be tested automatically by Codex AI. Each API block is independent and includes expectations and test scenarios.

---

## API-001: Task 156862: REST API > PLUS-3999 Web > Playback > Render Shape

### Description

### Request { API-001: GET Playback > Render Shape}

- Method: GET
- URL: `{{base_url}}/v2/web/odata/SETargets/SE.GetLocationInfo(targetId=106446,locationId=88185AAF-3FC6-42DB-B813-1FDF75580A54)`
- Headers:
  - Content-Type: `application/json`
  - Authorization: `{{auth_token}}`
- Params: 
  - $count: 
  - $orderby: 
  - $filter: 
- Body: NONE
  
### Test Cases { API-001: GET Playback > Render Shape}

| ID     | Category | Description                                                | Request Override (Method / Headers / Body)                                                                                                                                               | Expected Result             |
| ------ | -------- | ---------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| TC-001 | Positive | Get location info successfully with valid data             | **Method:** GET<br>**URL:** `{{base_url}}/v2/web/odata/SETargets/SE.GetLocationInfo(targetId=106446,locationId=88185AAF-3FC6-42DB-B813-1FDF75580A54)`                                    | 200; location info returned |
| TC-002 | Negative | Unauthorized request                                       | **Method:** GET<br>**Headers:** Authorization=None<br>**URL:** `{{base_url}}/v2/web/odata/SETargets/SE.GetLocationInfo(targetId=106446,locationId=88185AAF-3FC6-42DB-B813-1FDF75580A54)` | 401                         |
| TC-003 | Negative | Missing required parameter `targetId`                      | **Method:** GET<br>**URL:** `{{base_url}}/v2/web/odata/SETargets/SE.GetLocationInfo(locationId=88185AAF-3FC6-42DB-B813-1FDF75580A54)`                                                    | 400/404                     |
| TC-004 | Negative | Missing required parameter `locationId`                    | **Method:** GET<br>**URL:** `{{base_url}}/v2/web/odata/SETargets/SE.GetLocationInfo(targetId=106446)`                                                                                    | 400/404                     |
| TC-005 | Negative | Invalid format for `targetId`                              | **Method:** GET<br>**URL:** `{{base_url}}/v2/web/odata/SETargets/SE.GetLocationInfo(targetId='abc',locationId=88185AAF-3FC6-42DB-B813-1FDF75580A54)`                                     | 400/404                     |
| TC-006 | Negative | Invalid GUID format for `locationId`                       | **Method:** GET<br>**URL:** `{{base_url}}/v2/web/odata/SETargets/SE.GetLocationInfo(targetId=106446,locationId=12345)`                                                                   | 400/404                     |
| TC-007 | Negative | `targetId` does not exist                                  | **Method:** GET<br>**URL:** `{{base_url}}/v2/web/odata/SETargets/SE.GetLocationInfo(targetId=999999,locationId=88185AAF-3FC6-42DB-B813-1FDF75580A54)`                                    | 404                         |
| TC-008 | Negative | `locationId` does not exist                                | **Method:** GET<br>**URL:** `{{base_url}}/v2/web/odata/SETargets/SE.GetLocationInfo(targetId=106446,locationId={{random_guid}})`                                                         | 404                         |
| TC-009 | Negative | `locationId` belongs to another workspace/site             | **Method:** GET<br>**URL:** `{{base_url}}/v2/web/odata/SETargets/SE.GetLocationInfo(targetId=106446,locationId=9A9E8B1D-777F-4E91-897D-10177AA01FF4)`                                    | 403/404/500                 |
| TC-010 | Negative | `targetId` belongs to another workspace/site               | **Method:** GET<br>**URL:** `{{base_url}}/v2/web/odata/SETargets/SE.GetLocationInfo(targetId=106415,locationId=88185AAF-3FC6-42DB-B813-1FDF75580A54)`                                    | 403/404                     |
| TC-011 | Negative | `targetId` and `locationId` belong to different workspaces | **Method:** GET<br>**URL:** `{{base_url}}/v2/web/odata/SETargets/SE.GetLocationInfo(targetId=106415,locationId=9A9E8B1D-777F-4E91-897D-10177AA01FF4)`                                    | 403/404                     |
| TC-012 | Negative | Invalid HTTP method                                        | **Method:** POST<br>**URL:** `{{base_url}}/v2/web/odata/SETargets/SE.GetLocationInfo(targetId=106446,locationId=88185AAF-3FC6-42DB-B813-1FDF75580A54)`                                   | 405                         |
| TC-013 | Security | Injection payload in `locationId`                          | **Method:** GET<br>**URL:** `{{base_url}}/v2/web/odata/SETargets/SE.GetLocationInfo(targetId=106446,locationId=' OR 1=1 -- )`                                                            | 400/403/404; safely handled |
