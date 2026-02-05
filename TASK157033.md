# API Test Specifications

This document defines REST APIs to be tested automatically by Codex AI. Each API block is independent and includes expectations and test scenarios.

---


## API-001: Task 157033: REST API > PLUS-4255 Portal > Global Settings > GET API Keys List - BE
### Description

### Request { API-001:  GET API Keys List }

- Method: GET
- URL: `{{base_url}}/v2/web/odata/SEPAGlobalSettings/SE.GetSystemApiKey`
- Headers:
  - Content-Type: `application/json`
  - Authorization: `{{auth_token}}`
- Params: 
  - $count:
  - $top:
  - $orderby:
- Body: NONE


### Test Cases { API-001:  GET API Keys List }

| ID     | Category | Description                               | Request Override (Method / Params / Body)                           | Expected Result                 |
| ------ | -------- | ----------------------------------------- | ------------------------------------------------------------------- | ------------------------------- |
| TC-001 | Positive | Get system API key list successfully      | **Method:** GET                                                     | 200; API key list returned      |
| TC-002 | Positive | Get system API key list with total count  | **Method:** GET<br>**Params:** `$count=true`                        | 200; total count included       |
| TC-003 | Positive | Get API keys with pagination              | **Method:** GET<br>**Params:** `$top=10`                            | 200; first 10 records returned  |
| TC-004 | Positive | Get API keys with pagination offset       | **Method:** GET<br>**Params:** `$top=10`, `$skip=10`                | 200; paginated results returned |
| TC-005 | Positive | Order API keys by name ascending          | **Method:** GET<br>**Params:** `$orderby=name asc`                  | 200; sorted result              |
| TC-006 | Positive | Order API keys by created date descending | **Method:** GET<br>**Params:** `$orderby=created desc`              | 200; sorted result              |
| TC-007 | Boundary | Large pagination size                     | **Method:** GET<br>**Params:** `$top=1000`                          | 200; valid response             |
| TC-008 | Boundary | Skip greater than total records           | **Method:** GET<br>**Params:** `$skip=999999`                       | 200; empty dataset              |
| TC-009 | Negative | Invalid $top value format                 | **Method:** GET<br>**Params:** `$top=abc`                           | 400/500                         |
| TC-010 | Negative | Invalid $skip value format                | **Method:** GET<br>**Params:** `$skip=xyz`                          | 400/500                         |
| TC-011 | Negative | Invalid $orderby field                    | **Method:** GET<br>**Params:** `$orderby=invalidField asc`          | 400/500                         |
| TC-012 | Negative | Invalid $count value                      | **Method:** GET<br>**Params:** `$count=test`                        | 400/500                         |
| TC-013 | Security | Injection attempt in orderby parameter    | **Method:** GET<br>**Params:** `$orderby=name; DROP TABLE users`    | 400 or 500                      |
| TC-014 | Security | Script injection attempt                  | **Method:** GET<br>**Params:** `$orderby=<script>alert(1)</script>` | 400 or 500                      |




## API-002: Task 157033: REST API > PLUS-4255 Portal > Global Settings > EXPORT API Keys List - BE

### Description

### Request { API-002: EXPORT API Keys List }

- Method: GET
- URL: `{{base_url}}/v2/web/odata/SEPAGlobalSettings/SE.ExportSystemApiKey`
- Headers:
  - Content-Type: `application/json`
  - Authorization: `{{auth_token}}`
  - X-Sev2-FileType:
  - X-Sev2-OffsetClient:
  - X-Sev2-SelectColumn: name,description,apiKey,created 
- Params: NONE
- Body: NONE

### Test Cases { API-002: EXPORT API Keys List }

| ID     | Category | Description                                    | Request Override (Method / Headers / Body)                                                                                                                     | Expected Result             |
| ------ | -------- | ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| TC-001 | Positive | Export API keys successfully with CSV format   | **Method:** GET/POST<br>**Headers:** `X-Sev2-FileType=csv`, `X-Sev2-SelectColumn=name,description,apiKey,created`<br>**Body:** NONE                            | 200; CSV file generated     |
| TC-002 | Positive | Export API keys successfully with Excel format | **Method:** GET/POST<br>**Headers:** `X-Sev2-FileType=xlsx`, `X-Sev2-SelectColumn=name,description,apiKey,created`<br>**Body:** NONE                           | 200; Excel file generated   |
| TC-003 | Positive | Export API keys with client timezone offset    | **Method:** GET/POST<br>**Headers:** `X-Sev2-FileType=csv`, `X-Sev2-OffsetClient=420`, `X-Sev2-SelectColumn=name,description,apiKey,created`<br>**Body:** NONE | 200; date/time adjusted     |
| TC-004 | Negative | Missing FileType header                        | **Method:** GET/POST<br>**Headers:** `X-Sev2-SelectColumn=name,description,apiKey,created`<br>**Body:** NONE                                                   | 400/404                     |
| TC-005 | Negative | Invalid FileType value                         | **Method:** GET/POST<br>**Headers:** `X-Sev2-FileType=pdf`, `X-Sev2-SelectColumn=name,description,apiKey,created`<br>**Body:** NONE                            | 400/404                     |
| TC-006 | Negative | Missing SelectColumn header                    | **Method:** GET/POST<br>**Headers:** `X-Sev2-FileType=csv`<br>**Body:** NONE                                                                                   | 400                         |
| TC-007 | Negative | Invalid SelectColumn value                     | **Method:** GET/POST<br>**Headers:** `X-Sev2-FileType=csv`, `X-Sev2-SelectColumn=invalidColumn`<br>**Body:** NONE                                              | 400                         |
| TC-008 | Boundary | Export with single column                      | **Method:** GET/POST<br>**Headers:** `X-Sev2-FileType=csv`, `X-Sev2-SelectColumn=name`<br>**Body:** NONE                                                       | 200; single column exported |
| TC-009 | Boundary | Export with large dataset                      | **Method:** GET/POST<br>**Headers:** `X-Sev2-FileType=csv`, `X-Sev2-SelectColumn=name,description,apiKey,created`<br>**Body:** NONE                            | 200; performance acceptable |
| TC-010 | Security | Injection attempt in SelectColumn              | **Method:** GET/POST<br>**Headers:** `X-Sev2-FileType=csv`, `X-Sev2-SelectColumn=name;DROP TABLE users`<br>**Body:** NONE                                      | 400 or sanitized            |
| TC-011 | Security | Script injection in SelectColumn               | **Method:** GET/POST<br>**Headers:** `X-Sev2-FileType=csv`, `X-Sev2-SelectColumn=<script>alert(1)</script>`<br>**Body:** NONE                                  | 400 or sanitized            |
