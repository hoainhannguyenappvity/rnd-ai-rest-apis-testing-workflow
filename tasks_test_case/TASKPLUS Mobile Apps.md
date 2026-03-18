# API Test Specifications

This document defines REST APIs to be tested automatically by Codex AI. Each API block is independent and includes expectations and test scenarios.

---


## API-001: KMI - Mobile Apps > Edit App Dialog

### Description

### Request { API-001: KMI - Mobile Apps > Edit App Dialog }

- Method: POST
- URL: `{{base_url}}/v2/web/odata/SEMobileApps`
- Headers:
  - Content-Type: `application/json`
  - Authorization: `{{auth_token}}`
- Params: None
- Body:

```json
{
    "appID": "CP11",
    "isDefault": 0,
    "organizationID": 16846
}
```

### Test Cases { API-001: KMI - Mobile Apps > Edit App Dialog }

| ID     | Category | Description                                    | Request Override (Method / Headers / Body)                                                                                        | Expected Result |
| ------ | -------- | ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| TC-001 | Positive | Create mobile app successfully with valid data | **Method:** POST<br>**Body:** `{ "appID":"CP11", "isDefault":0, "organizationID":16846 }`                                         | 200 / 201 / 204 |
| TC-002 | Positive | Create mobile app with default flag enabled    | **Method:** POST<br>**Body:** `{ "appID":"CP11", "isDefault":1, "organizationID":16846 }`                                         | 200 / 201 / 204 |
| TC-003 | Negative | Unauthorized request                           | **Method:** POST<br>**Headers:** Authorization=None<br>**Body:** `{ "appID":"CP11", "isDefault":0, "organizationID":16846 }`      | 401             |
| TC-004 | Negative | Missing required field `appID`                 | **Method:** POST<br>**Body:** `{ "isDefault":0, "organizationID":16846 }`                                                         | 400             |
| TC-005 | Negative | Missing required field `organizationID`        | **Method:** POST<br>**Body:** `{ "appID":"CP11", "isDefault":0 }`                                                                 | 400             |
| TC-006 | Positive | Missing required field `isDefault`             | **Method:** POST<br>**Body:** `{ "appID":"CP11", "organizationID":16846 }`                                                        | 200             |
| TC-007 | Negative | Invalid data type for `appID`                  | **Method:** POST<br>**Body:** `{ "appID":12345, "isDefault":0, "organizationID":16846 }`                                          | 400             |
| TC-008 | Negative | Invalid data type for `isDefault`              | **Method:** POST<br>**Body:** `{ "appID":"CP11", "isDefault":"true", "organizationID":16846 }`                                    | 400             |
| TC-009 | Negative | Invalid data type for `organizationID`         | **Method:** POST<br>**Body:** `{ "appID":"CP11", "isDefault":0, "organizationID":"ABC" }`                                         | 400             |
| TC-010 | Negative | Organization does not exist                    | **Method:** POST<br>**Body:** `{ "appID":"CP11", "isDefault":0, "organizationID":999999 }`                                        | 404/400         |
| TC-011 | Negative | Invalid Content-Type                           | **Method:** POST<br>**Headers:** Content-Type=text/plain<br>**Body:** `{ "appID":"CP11", "isDefault":0, "organizationID":16846 }` | 415/400         |
| TC-012 | Negative | Malformed JSON body                            | **Method:** POST<br>**Body:** `{ "appID":"CP11", "isDefault":0, "organizationID":16846`                                           | 400             |
| TC-014 | Negative | Invalid HTTP method                            | **Method:** GET                                                                                                                   | 405/404         |
| TC-015 | Security | Injection payload in `appID`                   | **Method:** POST<br>**Body:** `{ "appID":"CP11' OR 1=1 --", "isDefault":0, "organizationID":16846 }`                              | 400/404/422     |
| TC-016 | Boundary | appID exceeds max length                       | **Method:** POST<br>**Body:** `{ "appID":"CP111111111111111111111111111111111111", "isDefault":0, "organizationID":16846 }`       | 404/400         |
| TC-018 | Boundary | organizationID = 0                             | **Method:** POST<br>**Body:** `{ "appID":"CP11", "isDefault":0, "organizationID":0 }`                                             | 404/400         |
| TC-018 | Boundary | organizationID negative                        | **Method:** POST<br>**Body:** `{ "appID":"CP11", "isDefault":0, "organizationID":-1 }`                                            | 404/400         |
| TC-019 | Boundary | isDefault invalid value                        | **Method:** POST<br>**Body:** `{ "appID":"CP11", "isDefault":5, "organizationID":16846 }`                                         | 404/400         |




## API-002: KMI - CHECK Update app open meesages

### Description

### Request { API-002: KMI - CHECK Update app open meesages }

- Method: POST
- URL: `{{base_url}}/v2/web/odata/SEPAOrgs/SE.UpdateAppOpenMessage`
- Headers:
  - Content-Type: `application/json`
  - Authorization: `{{auth_token}}`
- Params: None
- Body:

```json
{
    "updateAppOpenMessagePara": {
        "appId": "CP11",
        "orgId": 16846,
        "enableAppOpenMessage": false,
        "frequency": "0",
        "appOpenMessage": null
    }
}
```

### Test Cases { API-002: KMI - CHECK Update app open meesages }

| ID     | Category | Description                                           | Request Override (Method / Params / Body)                                                                                                                                       | Expected Result                   |
| ------ | -------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| TC-001 | Positive | Update app open message – frequency every app open    | **Method:** POST<br>**Body:** `{ "updateAppOpenMessagePara": { "appId": "CP11", "orgId": 16846, "enableAppOpenMessage": true, "frequency": "1", "appOpenMessage": "test1" } }`  | 200; message updated successfully |
| TC-002 | Positive | Update app open message – frequency once or on change | **Method:** POST<br>**Body:** `{ "updateAppOpenMessagePara": { "appId": "CP11", "orgId": 16846, "enableAppOpenMessage": true, "frequency": "0", "appOpenMessage": "test1" } }`  | 200; message updated successfully |
| TC-003 | Negative | Invalid frequency value                               | **Method:** POST<br>**Body:** `{ "updateAppOpenMessagePara": { "appId": "CP11", "orgId": 16846, "enableAppOpenMessage": true, "frequency": "99", "appOpenMessage": "test1" } }` | 404; frequency not found          |
| TC-004 | Negative | Missing appId                                         | **Method:** POST<br>**Body:** `{ "updateAppOpenMessagePara": { "appId": "", "orgId": 16846, "enableAppOpenMessage": true, "frequency": "1", "appOpenMessage": "test1" } }`      | 400 / 403                         |
| TC-005 | Negative | Invalid orgId                                         | **Method:** POST<br>**Body:** `{ "updateAppOpenMessagePara": { "appId": "CP11", "orgId": -1, "enableAppOpenMessage": true, "frequency": "1", "appOpenMessage": "test1" } }`     | 400 / 403                         |
| TC-006 | Security | Unauthorized request                                  | **Method:** POST<br>**Headers:** Authorization=None                                                                                                                             | 401 / 403                         |
| TC-007 | Boundary | Disable app open message                              | **Method:** POST<br>**Body:** `{ "updateAppOpenMessagePara": { "appId": "CP11", "orgId": 16846, "enableAppOpenMessage": false, "frequency": "1", "appOpenMessage": "test1" } }` | 200; message disabled             |
| TC-008 | Boundary | Empty appOpenMessage text                             | **Method:** POST<br>**Body:** `{ "updateAppOpenMessagePara": { "appId": "CP11", "orgId": 16846, "enableAppOpenMessage": true, "frequency": "1", "appOpenMessage": "" } }`       | 200 / 400                         |



## API-003: KMI - DELETE MobileApps

### Description

### Request { API-003: DELETE MobileApps }

- Method: DELETE
- URL: `{{base_url}}/v2/web/odata/SEMobileApps(5722)`
- Headers:
  - Content-Type: `application/json`
  - Authorization: `{{auth_token}}`
- Params: None
- Body: NONE

### Test Cases { API-003: KMI - DELETE MobileApps }

| ID     | Category | Description                                       | Request Override (Method / Params / Body)                                            | Expected Result                     |
| ------ | -------- | ------------------------------------------------- | ------------------------------------------------------------------------------------ | ----------------------------------- |
| TC-001 | Positive | Delete mobile app successfully with valid ID      | **Method:** DELETE                                                                   | 200 / 204; app deleted successfully |
| TC-002 | Negative | Unauthorized request                              | **Method:** DELETE<br>**Headers:** Authorization=None                                | 401                                 |
| TC-003 | Negative | App ID does not exist                             | **Method:** DELETE<br>**URL:** `{{base_url}}/v2/web/odata/SEMobileApps(999999)`      | 404                                 |
| TC-004 | Negative | Invalid App ID format (string instead of numeric) | **Method:** DELETE<br>**URL:** `{{base_url}}/v2/web/odata/SEMobileApps('abc')`       | 400/404                             |
| TC-005 | Negative | Invalid App ID value (negative number)            | **Method:** DELETE<br>**URL:** `{{base_url}}/v2/web/odata/SEMobileApps(-1)`          | 400/404                             |
| TC-006 | Negative | Missing App ID                                    | **Method:** DELETE<br>**URL:** `{{base_url}}/v2/web/odata/SEMobileApps()`            | 400/404                             |
| TC-007 | Security | Attempt SQL injection in App ID                   | **Method:** DELETE<br>**URL:** `{{base_url}}/v2/web/odata/SEMobileApps(5722 OR 1=1)` | 400 / 404; safely handled           |
| TC-008 | Negative | Invalid HTTP method                               | **Method:** GET<br>**URL:** `{{base_url}}/v2/web/odata/SEMobileApps(5722)`           | 405/404                             |
| TC-009 | Boundary | Delete already deleted app                        | **Method:** DELETE<br>**URL:** `{{base_url}}/v2/web/odata/SEMobileApps(5722)`        | 404 or 409 depending business logic |
