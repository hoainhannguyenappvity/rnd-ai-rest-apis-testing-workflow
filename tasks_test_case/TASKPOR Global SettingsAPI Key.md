# API Test Specifications

This document defines REST APIs to be tested automatically by Codex AI. Each API block is independent and includes expectations and test scenarios.

---


## API-001: Task 157032: REST API > PLUS-4257 Portal > Global Settings > Create API Key Dialog - BE

### Description

### Request { API-001: Create API Key Dialog }

- Method: POST
- URL: `{{base_url}}/v2/web/odata/SEPAGlobalSettings/SE.CreateSystemApiKey`
- Headers:
  - Content-Type: `application/json`
  - Authorization: `{{auth_token}}`
- Params: None
- Body:

```json
{
    "paraCreateSystemApiKey":{
        "name": "Selida Test",
        "description": "Test123"
    }
}
```

### Test Cases { API-001: Create API Key Dialog }

| ID     | Category      | Description                                        | Request Override (Method / Params / Body)                                                                                                                                            | Expected Result                 |
| ------ | ------------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------- |
| TC-001 | Positive      | Create system API key successfully with valid data | **Method:** POST<br>**Body:** `{ "paraCreateSystemApiKey": { "name":"Selida Test", "description":"Test123" } }`                                                                      | 200; API key created            |
| TC-002 | Positive      | Create API key with minimum valid data             | **Method:** POST<br>**Body:** `{ "paraCreateSystemApiKey": { "name":"Test Key", "description":"" } }`                                                                                | 200                             |
| TC-003 | Positive      | Create API key with long description               | **Method:** POST<br>**Body:** `{ "paraCreateSystemApiKey": { "name":"Test Key", "description":"Long description text" } }`                                                           | 200                             |
| TC-004 | Negative      | Missing name field                                 | **Method:** POST<br>**Body:** `{ "paraCreateSystemApiKey": { "description":"Test123" } }`                                                                                            | 400                             |
| TC-005 | Negative      | Missing paraCreateSystemApiKey object              | **Method:** POST<br>**Body:** `{}`                                                                                                                                                   | 400/404                         |
| TC-006 | Negative      | Empty name value                                   | **Method:** POST<br>**Body:** `{ "paraCreateSystemApiKey": { "name":"", "description":"Test123" } }`                                                                                 | 400                             |
| TC-007 | Negative      | Name exceeds maximum length                        | **Method:** POST<br>**Body:** `{ "paraCreateSystemApiKey": { "name":"VeryLongNameExceedingLimit1234567890123445678901234456789", "description":"Test123" } }`                        | 400                             |
| TC-008 | Negative      | Description exceeds maximum length                 | **Method:** POST<br>**Body:** `{ "paraCreateSystemApiKey": { "name":"Test Key", "description":"Very long description exceeding limit - 123456789012356789012345689001234456789" } }` | 400                             |
| TC-009 | Security      | Injection attempt in name field                    | **Method:** POST<br>**Body:** `{ "paraCreateSystemApiKey": { "name":"' OR 1=1", "description":"Test123" } }`                                                                         | 400 or sanitized                |
| TC-010 | Security      | Script injection attempt in description            | **Method:** POST<br>**Body:** `{ "paraCreateSystemApiKey": { "name":"Test Key", "description":"<script>alert(1)</script>" } }`                                                       | 400 or sanitized                |
| TC-011 | Boundary      | Name with special characters                       | **Method:** POST<br>**Body:** `{ "paraCreateSystemApiKey": { "name":"Key_@#123", "description":"Test123" } }`                                                                        | 200 or validation handled       |
| TC-012 | Boundary      | Name with leading/trailing spaces                  | **Method:** POST<br>**Body:** `{ "paraCreateSystemApiKey": { "name":"  Test Key  ", "description":"Test123" } }`                                                                     | 200; spaces trimmed or accepted |
| TC-013 | Business Rule | Duplicate API key name                             | **Method:** POST<br>**Body:** `{ "paraCreateSystemApiKey": { "name":"Test Key", "description":"Duplicate" } }`                                                                       | 400 or handled per rule         |




## API-002: Task 157032: REST API > PLUS-4257 Portal > Global Settings > Edit API Key Dialog - BE

### Description

### Request { API-002: Edit API Key Dialog }

- Method: POST
- URL: `{{base_url}}/v2/web/odata/SEPAGlobalSettings/SE.UpdateSystemApiKey`
- Headers:
  - Content-Type: `application/json`
  - Authorization: `{{auth_token}}`
- Params: None
- Body:

```json
{
    "paraUpdateSystemApiKey":{
    "id": 41,
        "name": "Test11",
        "description": "Test123111"
    }
}
```

### Test Cases { API-002: KMI - Edit API Key Dialog }

| ID     | Category      | Description                                        | Request Override (Method / Params / Body)                                                                                                                                                  | Expected Result                 |
| ------ | ------------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------- |
| TC-001 | Positive      | Update system API key successfully with valid data | **Method:** POST<br>**Body:** `{ "paraUpdateSystemApiKey": { "id":41, "name":"Test11", "description":"Test123111" } }`                                                                     | 200; API key updated            |
| TC-002 | Positive      | Update API key description only                    | **Method:** POST<br>**Body:** `{ "paraUpdateSystemApiKey": { "id":41, "name":"Selida Test", "description":"Updated description" } }`                                                       | 200                             |
| TC-003 | Positive      | Update API key with empty description              | **Method:** POST<br>**Body:** `{ "paraUpdateSystemApiKey": { "id":41, "name":"Test11", "description":"" } }`                                                                               | 200                             |
| TC-004 | Negative      | Missing id field                                   | **Method:** POST<br>**Body:** `{ "paraUpdateSystemApiKey": { "name":"Test11", "description":"Test123111" } }`                                                                              | 400/404                         |
| TC-005 | Negative      | Missing paraUpdateSystemApiKey object              | **Method:** POST<br>**Body:** `{}`                                                                                                                                                         | 400/404                         |
| TC-006 | Negative      | Invalid id format                                  | **Method:** POST<br>**Body:** `{ "paraUpdateSystemApiKey": { "id":"abc", "name":"Test11", "description":"Test123111" } }`                                                                  | 400/404                         |
| TC-007 | Negative      | API key id does not exist                          | **Method:** POST<br>**Body:** `{ "paraUpdateSystemApiKey": { "id":999999, "name":"Test11", "description":"Test123111" } }`                                                                 | 400/404                         |
| TC-008 | Negative      | Empty name value                                   | **Method:** POST<br>**Body:** `{ "paraUpdateSystemApiKey": { "id":41, "name":"", "description":"Test123111" } }`                                                                           | 400/404                         |
| TC-009 | Negative      | Name exceeds maximum length                        | **Method:** POST<br>**Body:** `{ "paraUpdateSystemApiKey": { "id":41, "name":"VeryLongNameExceedingLimit12345678912345678912345677890", "description":"Test123111" } }`                    | 400/404                         |
| TC-010 | Negative      | Description exceeds maximum length                 | **Method:** POST<br>**Body:** `{ "paraUpdateSystemApiKey": { "id":41, "name":"Test11", "description":"Very long description exceeding limit-1234567890123456789012345678901234567890" } }` | 400/404                         |
| TC-011 | Security      | Injection attempt in name field                    | **Method:** POST<br>**Body:** `{ "paraUpdateSystemApiKey": { "id":41, "name":"' OR 1=1", "description":"Test123111" } }`                                                                   | 400 or sanitized                |
| TC-012 | Security      | Script injection attempt in description            | **Method:** POST<br>**Body:** `{ "paraUpdateSystemApiKey": { "id":41, "name":"Test11", "description":"<script>alert(1)</script>" } }`                                                      | 400 or sanitized                |
| TC-013 | Boundary      | Name with special characters                       | **Method:** POST<br>**Body:** `{ "paraUpdateSystemApiKey": { "id":41, "name":"Key_@#123", "description":"Test123111" } }`                                                                  | 200 or validation handled       |
| TC-014 | Boundary      | Name with leading/trailing spaces                  | **Method:** POST<br>**Body:** `{ "paraUpdateSystemApiKey": { "id":41, "name":"  Test11  ", "description":"Test123111" } }`                                                                 | 200; spaces trimmed or accepted |
| TC-015 | Business Rule | Update API key name to duplicate existing name     | **Method:** POST<br>**Body:** `{ "paraUpdateSystemApiKey": { "id":41, "name":"Test Key", "description":"Duplicate test" } }`                                                               | 400 or handled per rule         |


## API-003: Task 157032: REST API > PLUS-4257 Portal > Global Settings > Delete API Key Dialog - BE

### Description

### Request { API-003: Delete API Key Dialog }

- Method: POST
- URL: `{{base_url}}/v2/web/odata/SEPAGlobalSettings/SE.DeleteSystemApiKey`
- Headers:
  - Content-Type: `application/json`
  - Authorization: `{{auth_token}}`
- Params: None
- Body: 
```json
{
    "paraDeleteSystemApiKey":{
    "id": 70
    }
}
```
### Test Cases { API-003: KMI - Delete API Key Dialog }

| ID     | Category | Description                                      | Request Override (Method / Params / Body)                                                          | Expected Result      |
| ------ | -------- | ------------------------------------------------ | -------------------------------------------------------------------------------------------------- | -------------------- |
| TC-001 | Positive | Delete system API key successfully with valid id | **Method:** POST<br>**Body:** `{ "paraDeleteSystemApiKey": { "id":71 } }`                          | 200; API key deleted |
| TC-002 | Negative | Missing id field                                 | **Method:** POST<br>**Body:** `{ "paraDeleteSystemApiKey": {} }`                                   | 400/404              |
| TC-003 | Negative | Missing paraDeleteSystemApiKey object            | **Method:** POST<br>**Body:** `{}`                                                                 | 400/404              |
| TC-004 | Negative | Invalid id format                                | **Method:** POST<br>**Body:** `{ "paraDeleteSystemApiKey": { "id":"abc" } }`                       | 400/404              |
| TC-005 | Negative | API key id does not exist                        | **Method:** POST<br>**Body:** `{ "paraDeleteSystemApiKey": { "id":999999 } }`                      | 404                  |
| TC-006 | Security | Injection attempt in id field                    | **Method:** POST<br>**Body:** `{ "paraDeleteSystemApiKey": { "id":"71 OR 1=1" } }`                 | 400 or sanitized     |
| TC-007 | Security | Script injection attempt in id field             | **Method:** POST<br>**Body:** `{ "paraDeleteSystemApiKey": { "id":"<script>alert(1)</script>" } }` | 400 or sanitized     |
| TC-008 | Boundary | Delete largest valid id value                    | **Method:** POST<br>**Body:** `{ "paraDeleteSystemApiKey": { "id":2147483647 } }`                  | 200 or 404           |
