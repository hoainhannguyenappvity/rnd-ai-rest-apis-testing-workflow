
## API-001: Task 154665: REST API > PLUS-3346 AFP > High volume of API calls to SE.GetPermissionUserOnEntity from a custom role

### Description

### Request { API-001: KMI - GetDeviceGroup }

- Method: POST
- URL: `{{base_url}}/v2/web/odata/SETargets/SE.GetDeviceGroup`
- Headers:
  - Content-Type: `application/json`
  - Authorization: `{{auth_token}}`
- Params: None
- Body:

```json
{
  "deviceGroupPara": {
    "deviceIds": [
      {
        "deviceId": 106455,
        "typeDeviceCode": 1
      },
      {
        "deviceId": 106446,
        "typeDeviceCode": 1
      }
    ]
  }
}
```

### Test Cases { API-001: KMI - GetDeviceGroup }

| ID     | Category    | Description                                          | Request Override (Method / Headers / Body)                                                                                                            | Expected Result                                                            |
| ------ | ----------- | ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| TC-001 | Positive    | Get device group with valid data                     | **Method:** POST<br>**Body:** `{ "deviceGroupPara":{ "deviceIds":[{"deviceId":106455,"typeDeviceCode":1},{"deviceId":106446,"typeDeviceCode":1}] } }` | 2xx; device group data returned successfully                               |
| TC-002 | Negative    | Unauthorized request                                 | **Method:** POST<br>**Headers:** Authorization=None<br>**Body:** base body                                                                            | 401                                                                        |
| TC-003 | Positive    | Missing required field `deviceGroupPara`             | **Method:** POST<br>**Body:** { }                                                                                                                     | 400/403/404; validation error                                              |
| TC-004 | Positive    | Missing `deviceIds` list                             | **Method:** POST<br>**Body:** `{ "deviceGroupPara":{ } }`                                                                                             | 200 OK                                                                     |
| TC-005 | Positive    | Empty `deviceIds` list                               | **Method:** POST<br>**Body:** `{ "deviceGroupPara":{ "deviceIds":[] } }`                                                                              | 200 OK                                                                     |
| TC-006 | Positive    | Missing `deviceId` in item                           | **Method:** POST<br>**Body:** `{ "deviceGroupPara":{ "deviceIds":[{"typeDeviceCode":1}] } }`                                                          | 200 OK                                                                     |
| TC-007 | Positive    | Missing `typeDeviceCode` in item                     | **Method:** POST<br>**Body:** `{ "deviceGroupPara":{ "deviceIds":[{"deviceId":106455}] } }`                                                           | 200 OK                                                                     |
| TC-008 | Negative    | Invalid `deviceId`                                   | **Method:** POST<br>**Body:** `{ "deviceGroupPara":{ "deviceIds":[{"deviceId":-1,"typeDeviceCode":1}] } }`                                            | 400/403/404; validation error                                              |
| TC-009 | Negative    | Invalid `typeDeviceCode`                             | **Method:** POST<br>**Body:** `{ "deviceGroupPara":{ "deviceIds":[{"deviceId":106455,"typeDeviceCode":999}] } }`                                      | 400/403/404; validation error                                              |
| TC-010 | Negative    | Invalid data type for `deviceId`                     | **Method:** POST<br>**Body:** `{ "deviceGroupPara":{ "deviceIds":[{"deviceId":"abc","typeDeviceCode":1}] } }`                                         | 400/403/404; validation error                                              |
| TC-011 | Negative    | Invalid data type for `typeDeviceCode`               | **Method:** POST<br>**Body:** `{ "deviceGroupPara":{ "deviceIds":[{"deviceId":106455,"typeDeviceCode":"one"}] } }`                                    | 400/403/404; validation error                                              |
| TC-012 | Security    | Injection payload in `deviceId`                      | **Method:** POST<br>**Body:** `{ "deviceGroupPara":{ "deviceIds":[{"deviceId":"106455 OR 1=1","typeDeviceCode":1}] } }`                               | 400/403/404; rejected or safely handled;                                   |
| TC-013 | Security    | Injection payload in `typeDeviceCode`                | **Method:** POST<br>**Body:** `{ "deviceGroupPara":{ "deviceIds":[{"deviceId":106455,"typeDeviceCode":"1 OR 1=1"}] } }`                               | 400/403/404; rejected or safely handled;                                   |
| TC-014 | Negative    | Invalid Content-Type                                 | **Method:** POST<br>**Headers:** Content-Type=text/plain<br>**Body:** base body                                                                       | 400/403/404; unsupported media type                                        |
| TC-015 | Negative    | Invalid JSON body                                    | **Method:** POST<br>**Body:** malformed JSON                                                                                                          | 400/403/404; bad request                                                   |
| TC-016 | Negative    | Invalid HTTP method                                  | **Method:** GET<br>**Body:** None                                                                                                                     | 400/403/404/415; method not allowed                                        |
| TC-017 | Performance | Get device group response time                       | **Method:** POST<br>**Body:** `{ "deviceGroupPara":{ "deviceIds":[{"deviceId":106455,"typeDeviceCode":1},{"deviceId":106446,"typeDeviceCode":1}] } }` | 200/204; response time < 3 seconds                                         |
| TC-018 | Negative    | DeviceId from other workspace (single item)          | **Method:** POST<br>**Body:** `{ "deviceGroupPara":{ "deviceIds":[{"deviceId":20272,"typeDeviceCode":1}] } }`                                         | 400/403/404; request rejected or no access to device                       |
| TC-019 | Negative    | DeviceId from other workspace (both items)           | **Method:** POST<br>**Body:** `{ "deviceGroupPara":{ "deviceIds":[{"deviceId":20272,"typeDeviceCode":1},{"deviceId":999002,"typeDeviceCode":5}] } }`  | 400/403/404; request rejected or devices not found in workspace            |
| TC-020 | Negative    | Mix valid device + other-workspace device            | **Method:** POST<br>**Body:** `{ "deviceGroupPara":{ "deviceIds":[{"deviceId":20272,"typeDeviceCode":1},{"deviceId":999001,"typeDeviceCode":5}] } }`  | 400/403/404; request rejected or only valid device returned (no data leak) |
| TC-021 | Negative    | Other workspace deviceId with correct typeDeviceCode | **Method:** POST<br>**Body:** `{ "deviceGroupPara":{ "deviceIds":[{"deviceId":20272,"typeDeviceCode":1}] } }`                                         | 400/403/404; request rejected; no cross-workspace access                   |
| TC-022 | Negative    | Other workspace deviceId with wrong typeDeviceCode   | **Method:** POST<br>**Body:** `{ "deviceGroupPara":{ "deviceIds":[{"deviceId":20272,"typeDeviceCode":999}] } }`                                       | 400/403/404; request rejected                                              |
