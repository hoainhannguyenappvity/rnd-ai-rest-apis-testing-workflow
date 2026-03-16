## API-001: Task 155417: REST API > PLUS-3662 Web Map > UTP TI/LBS > Device Popup Change

### Description

### Request { API-001: KMI - GetLiveLinkInfo }

- Method: POST
- URL: `{{base_url}}/v2/web/odata/SEMapViews/SE.GetLiveLinkInfo?&k=oGdzwkXRyLtGpI3jluPPCA&pin=2205`
- Headers:
  - Content-Type: `application/json`
  - Authorization: `{{auth_token}}`
- Params: None
- Body: None

### Test Cases { API-001: KMI - GetLiveLinkInfo }

| ID     | Category    | Description                               | Request Override (Method / Headers / URL)                                                                                       | Expected Result                               |
| ------ | ----------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| TC-001 | Positive    | Get live link info with valid key and pin | **Method:** POST                                                                                                                | 200/204; live link info returned successfully |
| TC-002 | Negative    | Unauthorized request                      | **Method:** POST<br>**Headers:** Authorization=None                                                                             | 401; request rejected                         |
| TC-003 | Negative    | Missing required param `k`                | **Method:** POST<br>**URL:** `{{base_url}}/v2/web/odata/SEMapViews/SE.GetLiveLinkInfo?pin=2205`                                 | 400/404; validation error                     |
| TC-004 | Negative    | Missing required param `pin`              | **Method:** POST<br>**URL:** `{{base_url}}/v2/web/odata/SEMapViews/SE.GetLiveLinkInfo?k=oGdzwkXRyLtGpI3jluPPCA`                 | 400/404; validation error                     |
| TC-005 | Negative    | Invalid `k` value                         | **Method:** POST<br>**URL:** `{{base_url}}/v2/web/odata/SEMapViews/SE.GetLiveLinkInfo?k=INVALID_KEY&pin=2205`                   | 400/404/500; invalid or expired live link     |
| TC-006 | Negative    | Invalid `pin` value                       | **Method:** POST<br>**URL:** `{{base_url}}/v2/web/odata/SEMapViews/SE.GetLiveLinkInfo?k=oGdzwkXRyLtGpI3jluPPCA&pin=9999`        | 400/404; invalid pin                          |
| TC-007 | Negative    | Invalid data type for `pin`               | **Method:** POST<br>**URL:** `{{base_url}}/v2/web/odata/SEMapViews/SE.GetLiveLinkInfo?k=oGdzwkXRyLtGpI3jluPPCA&pin=abcd`        | 400/404; validation error                     |
| TC-008 | Negative    | Expired live link                         | **Method:** POST<br>**URL:** `{{base_url}}/v2/web/odata/SEMapViews/SE.GetLiveLinkInfo?k=EXPIRED_KEY&pin=2205`                   | 400/404/500; link expired or no longer valid  |
| TC-009 | Security    | Injection payload in `k`                  | **Method:** POST<br>**URL:** `{{base_url}}/v2/web/odata/SEMapViews/SE.GetLiveLinkInfo?k=oGdzwkXRyLtGpI3jluPPCA OR 1=1&pin=2205` | 500; request rejected or safely handled       |
| TC-010 | Security    | Injection payload in `pin`                | **Method:** POST<br>**URL:** `{{base_url}}/v2/web/odata/SEMapViews/SE.GetLiveLinkInfo?k=oGdzwkXRyLtGpI3jluPPCA&pin=2205 OR 1=1` | 400/404; request rejected or safely handled   |
| TC-011 | Negative    | Invalid HTTP method                       | **Method:** GET                                                                                                                 | 400/404; method not allowed                   |
| TC-012 | Performance | Get live link info response time          | **Method:** POST                                                                                                                | 200; response time < 3 seconds                |
