# API Test Specifications

This document defines REST APIs to be tested automatically by Codex AI. Each API block is independent and includes expectations and test scenarios.

---

## API-001: REST API > PLUS-4122 Device List > Quick Action > Forward > Device Forward Template - BE

### Description

### Request { API-001: GET Quick Action > Forward > Device Forward Template }

- Method: GET
- URL: `{{base_url}}/v2/web/odata/SETargetForwardTemplates/SE.GetTargetForwardTemplates?$count=true&$top=500&$orderby=name%20asc`
- Headers:
  - Content-Type: `application/json`
  - Authorization: `{{auth_token}}`
- Params: None
- Body: None

### Test Cases { API-001: GET Quick Action > Forward > Device Forward Template }

| ID     | Category    | Description                               | Request Override (Method / Headers / Body)                                                                                         | Expected Result                          |
| ------ | ----------- | ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| TC-001 | Positive    | Get target forward templates successfully | **Method:** GET                                                                                                                    | 200; response contains list of templates |
| TC-002 | Positive    | Get templates with count enabled          | **Method:** GET<br>**URL:** `{{base_url}}/v2/web/odata/SETargetForwardTemplates/SE.GetTargetForwardTemplates?$count=true`          | 200; response includes total count       |
| TC-003 | Positive    | Get templates with pagination             | **Method:** GET<br>**URL:** `{{base_url}}/v2/web/odata/SETargetForwardTemplates/SE.GetTargetForwardTemplates?$top=100`             | 200; maximum 100 items returned          |
| TC-004 | Positive    | Get templates ordered by name ascending   | **Method:** GET<br>**URL:** `{{base_url}}/v2/web/odata/SETargetForwardTemplates/SE.GetTargetForwardTemplates?$orderby=name asc`    | 200; items sorted by name ASC            |
| TC-005 | Negative    | Unauthorized request                      | **Method:** GET<br>**Headers:** Authorization=None                                                                                 | 401 or 403; request rejected             |
| TC-006 | Negative    | Invalid `$top` value                      | **Method:** GET<br>**URL:** `{{base_url}}/v2/web/odata/SETargetForwardTemplates/SE.GetTargetForwardTemplates?$top=-1`              | 500                                      |
| TC-007 | Negative    | Invalid `$orderby` field                  | **Method:** GET<br>**URL:** `{{base_url}}/v2/web/odata/SETargetForwardTemplates/SE.GetTargetForwardTemplates?$orderby=unknown asc` | 500                                      |
| TC-008 | Negative    | Invalid query parameter format            | **Method:** GET<br>**URL:** `{{base_url}}/v2/web/odata/SETargetForwardTemplates/SE.GetTargetForwardTemplates?$top=abc`             | 500                                      |
| TC-009 | Negative    | Invalid Content-Type                      | **Method:** GET<br>**Headers:** Content-Type=text/plain                                                                            | 415                                      |
| TC-010 | Negative    | Invalid HTTP method                       | **Method:** POST                                                                                                                   | 405 or 403 or 404                        |
| TC-011 | Security    | Injection payload in query                | **Method:** GET<br>**URL:** `{{base_url}}/v2/web/odata/SETargetForwardTemplates/SE.GetTargetForwardTemplates?$orderby=name OR 1=1` | 500                                      |
| TC-012 | Performance | Get templates response time               | **Method:** GET                                                                                                                    | 200; response time < 3 seconds           |

## API-002: REST API > PLUS-4117 Settings > Templates > Device Forwarding List - BE

### Description

### Request { API-002: EXPORT Device Forwarding List }

- Method: GET
- URL: `{{base_url}}/v2/web/odata/SETargetForwardTemplates/SE.ExportTemplate?&$orderby=created%20desc`
- Headers:
  - Content-Type: `application/json`
  - Authorization: `{{auth_token}}`
  - X-Sev2-FileType: `CSV`
  - X-Sev2-StartDate:
  - X-Sev2-EndDate:
  - X-Sev2-OffsetClient: 
  - X-Sev2-SelectColumn: name,description,method,isDefault,email,format,frequency,zipPayload,servicePassword,server,port,maintainConnection,encryption,encryptionKey,url,username,password,created
- Params: None
- Body: None

### Test Cases { API-002: EXPORT Device Forwarding List }

| ID     | Category    | Description                                      | Request Override (Method / Headers / Body)                                                                               | Expected Result                              |
| ------ | ----------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- |
| TC-001 | Positive    | Export templates successfully with valid headers | **Method:** GET                                                                                                          | 200; file exported successfully              |
| TC-002 | Positive    | Export templates ordered by created desc         | **Method:** GET<br>**URL:** `{{base_url}}/v2/web/odata/SETargetForwardTemplates/SE.ExportTemplate?$orderby=created desc` | 200; exported data ordered by created desc   |
| TC-003 | Positive    | Export with date range filter                    | **Method:** GET<br>**Headers:** `X-Sev2-StartDate=2024-01-01, X-Sev2-EndDate=2024-12-31`                                 | 200; exported data within date range         |
| TC-004 | Positive    | Export with specific select columns              | **Method:** GET<br>**Headers:** `X-Sev2-SelectColumn=name,description,method`                                            | 200; exported file contains selected columns |
| TC-005 | Positive    | Export with offset client applied                | **Method:** GET<br>**Headers:** `X-Sev2-OffsetClient=7`                                                                  | 200; exported data adjusted by offset        |
| TC-006 | Negative    | Unauthorized request                             | **Method:** GET<br>**Headers:** Authorization=None`                                                                      | 401 or 403                                   |
| TC-007 | Negative    | Missing required FileType header                 | **Method:** GET<br>**Headers:** `X-Sev2-FileType=None `                                                                  | 400 or 403 or 404                            |
| TC-008 | Negative    | Invalid FileType value                           | **Method:** GET<br>**Headers:** `X-Sev2-FileType=invalid `                                                               | 400 or 403 or 404                            |
| TC-009 | Negative    | Invalid date range                               | **Method:** GET<br>**Headers:** `X-Sev2-StartDate=2025-12-31, X-Sev2-EndDate=2025-01-01`                                 | 400 or 403                                   |
| TC-010 | Negative    | Invalid select column name                       | **Method:** GET<br>**Headers:** `X-Sev2-SelectColumn=invalidColumn`                                                      | 400 or 403                                   |
| TC-011 | Negative    | Invalid Content-Type                             | **Method:** GET<br>**Headers:** Content-Type=text/plain                                                                  | 415                                          |
| TC-012 | Negative    | Invalid HTTP method                              | **Method:** POST                                                                                                         | 405 or 403 or 404                            |
| TC-013 | Security    | Injection payload in SelectColumn                | **Method:** GET<br>**Headers:** `X-Sev2-SelectColumn=name; DROP TABLE X;`                                                | 400 or 403                                   |
| TC-014 | Security    | Injection payload in date header                 | **Method:** GET<br>**Headers:** `X-Sev2-StartDate=2024-01-01 OR 1=1`                                                     | 400 or 403                                   |
| TC-015 | Performance | Export templates response time                   | **Method:** GET                                                                                                          | 200; response time < 3 seconds               |



## API-003: Task 156867: REST API > PLUS-4118 Settings > Templates > Device Forwarding Create

### Description

### Request { API-003: CREATE Device Forwarding  }

- Method: POST
- URL: `{{base_url}}/v2/web/odata/SETargetForwardTemplates/SE.CreateTemplate`
- Headers:
  - Content-Type: `application/json`
  - Authorization: `{{auth_token}}`
- Body: 
 ```json
{
    "paraCreateTemplate": {
        "name": "test {{$timestamp}}",
        "description": "",
        "method": "EMAIL",
        "destination": "thuytrangle2205@gmail.com",
        "format": "CSV",
        "frequency": 0,
        "zipPayload": 0,
        "password": null,
        "isDefault": false
    }
}
```

### Test Cases { API-003: CREATE Device Forwarding  }

| ID     | Category    | Description                               | Request Override (Method / Headers / Body)                                                                                                                                                                                                              | Expected Result                       |
| ------ | ----------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| TC-001 | Positive    | Create template successfully (EMAIL)      | **Method:** POST<br>**Body:** `{ "paraCreateTemplate": { "name":"Email Alerts Default","description":"Email forwarding template","method":"EMAIL","destination":"alerts@example.com","format":"JSON","frequency":60,"isDefault":true,"active":true } }` | 200 OK; template created successfully |
| TC-002 | Positive    | Create template successfully (SERVER)     | **Method:** POST<br>**Body:** `{ "paraCreateTemplate": { "name":"Remote Server CSV","description":"SFTP push","method":"SERVER","destination":"10.0.0.122","format":"CSV","frequency":300,"isDefault":false,"active":true } }`                          | 200 OK; template created successfully |
| TC-003 | Positive    | Create template successfully (WEBSERVICE) | **Method:** POST<br>**Body:** `{ "paraCreateTemplate": { "name":"Webhook JSON","description":"Push to webhook","method":"WEBSERVICE","destination":"https://api.example.com/ingest","format":"JSON","frequency":60,"isDefault":false,"active":true } }` | 200 OK; template created successfully |
| TC-004 | Negative    | Unauthorized request                      | **Method:** POST<br>**Headers:** Authorization=None<br>**Body:** `{ "paraCreateTemplate": { "name":"No Auth","method":"EMAIL" } }`                                                                                                                      | 401 or 403                            |
| TC-005 | Negative    | Missing paraCreateTemplate                | **Method:** POST<br>**Body:** `{}`                                                                                                                                                                                                                      | 404                                   |
| TC-006 | Negative    | paraCreateTemplate wrong type             | **Method:** POST<br>**Body:** `{ "paraCreateTemplate":"invalid" }`                                                                                                                                                                                      | 400                                   |
| TC-007 | Negative    | Missing required field `method`           | **Method:** POST<br>**Body:** `{ "paraCreateTemplate": { "name":"Missing Method","destination":"alerts@example.com" } }`                                                                                                                                | 400                                   |
| TC-008 | Negative    | Invalid method value                      | **Method:** POST<br>**Body:** `{ "paraCreateTemplate": { "name":"Invalid Method","method":"FTP","destination":"example.com" } }`                                                                                                                        | 400/404                               |
| TC-009 | Negative    | Invalid data type for `frequency`         | **Method:** POST<br>**Body:** `{ "paraCreateTemplate": { "name":"Bad Frequency","method":"EMAIL","destination":"a@b.com","frequency":"sixty" } }`                                                                                                       | 400                                   |
| TC-010 | Negative    | Invalid Content-Type                      | **Method:** POST<br>**Headers:** Content-Type=text/plain<br>**Body:** `{ "paraCreateTemplate": { "name":"Bad CT","method":"EMAIL" } }`                                                                                                                  | 415                                   |
| TC-011 | Security    | Injection payload in name                 | **Method:** POST<br>**Body:** `{ "paraCreateTemplate": { "name":"test OR 1=1","method":"EMAIL","destination":"a@b.com" } }`                                                                                                                             | 400 or 403                            |
| TC-012 | Performance | Create template response time             | **Method:** POST<br>**Body:** `{ "paraCreateTemplate": { "name":"Perf Test","method":"EMAIL","destination":"a@b.com" } }`                                                                                                                               | 200 OK; response time < 3 seconds     |

## API-004: Task 156867: REST API > PLUS-4118 Settings > Templates > Device Forwarding Edit

### Description

### Request { API-004: UPDATE Device Forwarding  }

- Method: POST
- URL: `{{base_url}}/v2/web/odata/SETargetForwardTemplates(348)/SE.UpdateTemplate`
- Headers:
  - Content-Type: `application/json`
  - Authorization: `{{auth_token}}`
- Body:

```json
{
    "paraUpdateTemplate": {
        "name": "Email Alerts Default",
        "description": "Email forwarding template",
        "method": "EMAIL",
        "destination": "alerts@example.com",
        "format": "JSON",
        "frequency": 60,
        "zipPayload": null,
        "password": null,
        "isDefault": true
    }
}
```
### Test Cases { API-004: UPDATE Device Forwarding  }


| ID     | Category | Description                                        | Request Override (Method / Headers / Body)                                                                                                                                                                                                                                                                                                                  | Expected Result |
| ------ | -------- | -------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| TC-001 | Positive | Update template successfully (method = EMAIL)      | **Method:** POST<br>**Body:**`{ "paraUpdateTemplate": { "name":"Email Alerts Updated", "description":"Email forwarding template updated", "method":"EMAIL", "destination":"alerts@example.com~ops@example.com", "encType":"", "format":"JSON", "frequency":60, "zipPayload":0, "maintainConnection":0, "password":"", "isDefault":false, "active":true } }` | 200             |
| TC-002 | Positive | Update template successfully (method = SERVER)     | **Method:** POST<br>**Body:**`{ "paraUpdateTemplate": { "name":"Remote Server CSV Updated", "description":"SFTP push updated", "method":"SERVER", "destination":"10.0.0.122", "encType":"AES256~custom-key-123", "format":"CSV", "frequency":300, "maintainConnection":1, "isDefault":false, "active":true } }`                                             | 200             |
| TC-003 | Positive | Update template successfully (method = WEBSERVICE) | **Method:** POST<br>**Body:**`{ "paraUpdateTemplate": { "name":"Webhook JSON Updated", "description":"Push to webhook updated", "method":"WEBSERVICE", "destination":"https://api.example.com/ingest", "format":"JSON", "frequency":60, "isDefault":false, "active":true } }`                                                                               | 200             |
| TC-004 | Negative | Unauthorized (missing Authorization)               | **Method:** POST<br>**Headers:** Authorization=None<br>**Body:**`{ "paraUpdateTemplate": { "name":"No Token", "description":"", "method":"EMAIL", "destination":"alerts@example.com", "format":"JSON", "frequency":60, "isDefault":false, "active":true } }`                                                                                                | 401             |
| TC-005 | Negative | Template not found                                 | **Method:** POST<br>**URL:** `{{base_url}}/v2/web/odata/SETargetForwardTemplates(434)/UpdateTemplate`<br>**Body:**`{ "paraUpdateTemplate": { "name":"Any", "description":"", "method":"EMAIL", "destination":"alerts@example.com", "format":"JSON", "frequency":60, "isDefault":false, "active":true } }`                                                   | 404             |
| TC-006 | Negative | Missing paraUpdateTemplate                         | **Method:** POST<br>**Body:**`{}`                                                                                                                                                                                                                                                                                                                           | 404             |
| TC-007 | Negative | paraUpdateTemplate wrong type                      | **Method:** POST<br>**Body:**`{ "paraUpdateTemplate": "this-is-not-an-object" }`                                                                                                                                                                                                                                                                            | 400             |
| TC-008 | Negative | Missing required field: method                     | **Method:** POST<br>**Body:**`{ "paraUpdateTemplate": { "name":"Invalid Missing Method", "description":"", "destination":"alerts@example.com", "format":"JSON", "frequency":60, "isDefault":false, "active":true } }`                                                                                                                                       | 400             |
| TC-009 | Negative | Invalid method value                               | **Method:** POST<br>**Body:**`{ "paraUpdateTemplate": { "name":"Bad Method", "description":"", "method":"FTP", "destination":"example.com", "format":"JSON", "frequency":60, "isDefault":false, "active":true } }`                                                                                                                                          | 400/405/404     |
| TC-010 | Negative | Invalid Content-Type                               | **Method:** POST<br>**Headers:** Content-Type=text/plain<br>**Body:**`{ "paraUpdateTemplate": { "name":"Email Alerts Updated", "description":"Email forwarding template updated", "method":"EMAIL", "destination":"alerts@example.com", "format":"JSON", "frequency":60, "isDefault":false, "active":true } }`                                              | 415/400/404     |
| TC-011 | Negative | Invalid JSON body                                  | **Method:** POST<br>**Body:** malformed JSON                                                                                                                                                                                                                                                                                                                | 400/404         |


## API-005: Task 156867: REST API > PLUS-4118 Settings > Templates > Device Forwarding Copy

### Description

### Request { API-005: COPY Device Forwarding  }

- Method: POST
- URL: `{{base_url}}/v2/web/odata/SETargetForwardTemplates(348)/SE.CopyTemplate`
- Headers:
  - Content-Type: `application/json`
  - Authorization: `{{auth_token}}`
- Body: None

### Test Cases { API-005: COPY Device Forwarding  }


| ID     | Category    | Description                                      | Request Override (Method / Headers / Body / URL)                                                         | Expected Result                           |
| ------ | ----------- | ------------------------------------------------ | -------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| TC-001 | Positive    | Copy template successfully with valid templateId | **Method:** POST                                                                                         | 200 OK; new template created successfully |
| TC-005 | Negative    | Unauthorized request                             | **Method:** POST<br>**Headers:** Authorization=None                                                      | 401 or 403                                |
| TC-006 | Negative    | Template not found                               | **Method:** POST<br>**URL:** `{{base_url}}/v2/web/odata/SETargetForwardTemplates(99999999)/CopyTemplate` | 404                                       |
| TC-007 | Negative    | Invalid templateId (negative)                    | **Method:** POST<br>**URL:** `{{base_url}}/v2/web/odata/SETargetForwardTemplates(-1)/CopyTemplate`       | 400 or 404                                |
| TC-008 | Negative    | Invalid templateId (non-numeric)                 | **Method:** POST<br>**URL:** `{{base_url}}/v2/web/odata/SETargetForwardTemplates(abc)/CopyTemplate`      | 400 or 404                                |
| TC-009 | Negative    | Template from other workspace                    | **Method:** POST<br>**URL:** `{{base_url}}/v2/web/odata/SETargetForwardTemplates(18183)/CopyTemplate`    | 403 or 404                                |
| TC-010 | Negative    | Invalid HTTP method                              | **Method:** GET                                                                                          | 400 or 404 or 405                         |
| TC-011 | Negative    | Invalid Content-Type                             | **Method:** POST<br>**Headers:** Content-Type=text/plain                                                 | 415                                       |
| TC-012 | Security    | Injection payload in templateId                  | **Method:** POST<br>**URL:** `{{base_url}}/v2/web/odata/SETargetForwardTemplates(1 OR 1=1)/CopyTemplate` | 400 or 404                                |
| TC-013 | Performance | Copy template response time                      | **Method:** POST                                                                                         | 200 OK; response time < 3 seconds         |
