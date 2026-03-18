## API-001: Task 156957: Global Setting> Sign in

### Description

### Request { API-001: Global Setting> Sign in }

- Method: POST
- URL: `{{base_url}}/v2/web/odata/SEPAGlobalSettings/SE.PatchGlobalSetting`
- Headers:
  - Content-Type: `application/json`
  - Authorization: `{{auth_token}}`
- Params: NONE
- Body:

```json
{
    "setting": {
        "key": "InvitationCodeVerifyLimit",
        "value": "Disabled"
    }
}
```
### Test Cases { API-001: Global Setting> Sign in }

| ID     | Category  | Description                                              | Request Override (Method / Headers / Body)                                                                                            | Expected Result |
| ------ | --------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| TC-001 | Positive  | Update global settings with valid values                 | **Method:** POST<br>**Body:** `{"setting":{"key":"InvitationCodeVerifyLimit","value":"Disabled"}}`                                    | 200/204         |
| TC-002 | Positive  | Update retry delay seconds                               | **Method:** POST<br>**Body:** `{"setting":{"key":"InvitationCodeVerifyRetryDelaySeconds","value":"30"}}`                              | 200/204         |
| TC-003 | Positive  | Update invitation code expire minutes                    | **Method:** POST<br>**Body:** `{"setting":{"key":"InvitationCodeExpireMinutes","value":"10"}}`                                        | 200/204         |
| TC-004 | Boundary  | Retry delay with minimum value                           | **Method:** POST<br>**Body:** `{"setting":{"key":"InvitationCodeVerifyRetryDelaySeconds","value":"1"}}`                               | 200/204         |
| TC-005 | Boundary  | Retry delay with large value                             | **Method:** POST<br>**Body:** `{"setting":{"key":"InvitationCodeVerifyRetryDelaySeconds","value":"3600"}}`                            | 200/204         |
| TC-006 | Boundary  | Expire minutes with large value                          | **Method:** POST<br>**Body:** `{"setting":{"key":"InvitationCodeExpireMinutes","value":"1440"}}`                                      | 200/204         |
| TC-007 | Negative  | Missing key field                                        | **Method:** POST<br>**Body:** `{"setting":{"value":"10"}}`                                                                            | 400             |
| TC-008 | Negative  | Missing value field                                      | **Method:** POST<br>**Body:** `{"setting":{"key":"InvitationCodeExpireMinutes"}}`                                                     | 400             |
| TC-009 | Negative  | Invalid key name                                         | **Method:** POST<br>**Body:** `{"setting":{"key":"InvalidSettingKey","value":"10"}}`                                                  | 400             |
| TC-010 | Negative  | Invalid value type                                       | **Method:** POST<br>**Body:** `{"setting":{"key":"InvitationCodeExpireMinutes","value":"abc"}}`                                       | 400             |
| TC-011 | Negative  | Empty body                                               | **Method:** POST<br>**Body:** `{}`                                                                                                    | 400             |
| TC-012 | Negative  | Malformed JSON body                                      | **Method:** POST<br>**Body:** `{ invalid json`                                                                                        | 400             |
| TC-013 | Negative  | Invalid value type InvitationCodeVerifyLimit             | **Method:** POST<br>**Body:** `{"setting":{"key":"InvitationCodeVerifyLimit","value":"abc"}}`                                         | 400             |
| TC-014 | Auth      | Missing Authorization header                             | **Method:** POST<br>**Headers:** Authorization=None<br>**Body:** `{"setting":{"key":"InvitationCodeExpireMinutes","value":"10"}}`     | 401             |
| TC-015 | Auth      | Invalid authorization token                              | **Method:** POST<br>**Headers:** Authorization=InvalidToken<br>Body: `{"setting":{"key":"InvitationCodeExpireMinutes","value":"10"}}` | 401             |
| TC-016 | Negative  | Invalid value type InvitationCodeVerifyRetryDelaySeconds | **Method:** POST<br>**Body:** `{"setting":{"key":"InvitationCodeVerifyRetryDelaySeconds","value":"abc"}}`                             | 400             |
| TC-017 | Stability | Repeat valid request multiple times                      | **Method:** POST<br>**Body:** `{"setting":{"key":"InvitationCodeExpireMinutes","value":"10"}}`                                        | 200/204         |
