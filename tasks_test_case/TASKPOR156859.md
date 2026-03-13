# API Test Specifications

This document defines REST APIs to be tested automatically by Codex AI. Each API block is independent and includes expectations and test scenarios.

---


## API-001: Task 156859: REST API > PLUS-3989 Portal > Reports > GET Feature Usage - BE
### Description

### Request { API-001:  GET Feature Usage }

- Method: GET
- URL: `{{base_url}}/v2/web/odata/SEPAGlobalSettings/SE.GetReportFeatureUsage`
- Headers:
  - Content-Type: `application/json`
  - Authorization: `{{auth_token}}`
  - X-Sev2-Search:
  - X-Sev2-StartDate:
  - X-Sev2-EndDate:
  - X-Sev2-Skip:
  - X-Sev2-Top:
  - X-Sev2-OrderBy:
  - X-Sev2-Mode: `workspacesonly`
- Params: NONE
- Body: NONE


### Test Cases { API-001:  GET Feature Usage }

| ID     | Category | Description                              | Request Override (Method / Params / Body)                                                                                                                       | Expected Result                         |
| ------ | -------- | ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| TC-001 | Positive | Get report with mode workspacesandtotals | **Method:** GET<br>**Headers:** `X-Sev2-StartDate=2026-01-01`, `X-Sev2-EndDate=2026-01-31`, `X-Sev2-Skip=0`, `X-Sev2-Top=20`, `X-Sev2-Mode=workspacesandtotals` | 200; workspace data and totals returned |
| TC-002 | Positive | Get report with mode totalsonly          | **Method:** GET<br>**Headers:** `X-Sev2-StartDate=2026-01-01`, `X-Sev2-EndDate=2026-01-31`, `X-Sev2-Mode=totalsonly`                                            | 200; totals only returned               |
| TC-003 | Positive | Get report with mode workspacesonly      | **Method:** GET<br>**Headers:** `X-Sev2-StartDate=2026-01-01`, `X-Sev2-EndDate=2026-01-31`, `X-Sev2-Skip=0`, `X-Sev2-Top=20`, `X-Sev2-Mode=workspacesonly`      | 200; workspace data only                |
| TC-004 | Positive | Search by keyword                        | **Method:** GET<br>**Headers:** `X-Sev2-Search=workspaceA`, `X-Sev2-StartDate=2026-01-01`, `X-Sev2-EndDate=2026-01-31`, `X-Sev2-Mode=workspacesonly`            | 200; filtered results returned          |
| TC-005 | Positive | Order by workspaceName ascending         | **Method:** GET<br>**Headers:** `X-Sev2-OrderBy=workspaceName asc`, `X-Sev2-StartDate=2026-01-01`, `X-Sev2-EndDate=2026-01-31`, `X-Sev2-Mode=workspacesonly`    | 200; data sorted ascending              |
| TC-006 | Positive | Order by eventName descending            | **Method:** GET<br>**Headers:** `X-Sev2-OrderBy=eventName desc`, `X-Sev2-StartDate=2026-01-01`, `X-Sev2-EndDate=2026-01-31`, `X-Sev2-Mode=workspacesonly`       | 200                                     |
| TC-007 | Positive | First page pagination                    | **Method:** GET<br>**Headers:** `X-Sev2-Skip=0`, `X-Sev2-Top=10`, `X-Sev2-StartDate=2026-01-01`, `X-Sev2-EndDate=2026-01-31`, `X-Sev2-Mode=workspacesonly`      | 200; first page returned                |
| TC-008 | Positive | Middle page pagination                   | **Method:** GET<br>**Headers:** `X-Sev2-Skip=10`, `X-Sev2-Top=10`, `X-Sev2-Mode=workspacesonly`                                                                 | 200                                     |
| TC-009 | Boundary | Large page size                          | **Method:** GET<br>**Headers:** `X-Sev2-Top=1000`, `X-Sev2-Mode=workspacesonly`                                                                                 | 200; valid response                     |
| TC-010 | Negative | Missing start date                       | **Method:** GET<br>**Headers:** `X-Sev2-EndDate=2026-01-31`, `X-Sev2-Mode=workspacesonly`                                                                       | 400                                     |
| TC-011 | Positive | Missing end date                         | **Method:** GET<br>**Headers:** `X-Sev2-StartDate=2026-01-01`, `X-Sev2-Mode=workspacesonly`                                                                     | 200                                     |
| TC-012 | Negative | Invalid start date format                | **Method:** GET<br>**Headers:** `X-Sev2-StartDate=467`, `X-Sev2-EndDate=2026-01-31`, `X-Sev2-Mode=workspacesonly`                                               | 400                                     |
| TC-013 | Negative | Invalid end date format                  | **Method:** GET<br>**Headers:** `X-Sev2-EndDate=6yty`, `X-Sev2-StartDate=2026-01-01`, `X-Sev2-Mode=workspacesonly`                                              | 400                                     |
| TC-014 | Negative | Start date greater than end date         | **Method:** GET<br>**Headers:** `X-Sev2-StartDate=2026-02-01`, `X-Sev2-EndDate=2026-01-01`, `X-Sev2-Mode=workspacesonly`                                        | 400                                     |
| TC-015 | Negative | Invalid mode value                       | **Method:** GET<br>**Headers:** `X-Sev2-Mode=test`                                                                                                              | 400                                     |
| TC-016 | Boundary | Same start and end date                  | **Method:** GET<br>**Headers:** `X-Sev2-StartDate=2026-01-15`, `X-Sev2-EndDate=2026-01-15`, `X-Sev2-Mode=workspacesonly`                                        | 200                                     |
| TC-017 | Boundary | Extremely large date range               | **Method:** GET<br>**Headers:** `X-Sev2-StartDate=2023-01-01`, `X-Sev2-EndDate=2026-01-31`, `X-Sev2-Mode=workspacesandtotals`                                   | 200; performance acceptable             |
| TC-018 | Boundary | Skip greater than total records          | **Method:** GET<br>**Headers:** `X-Sev2-Skip=999999`, `X-Sev2-Mode=workspacesonly`                                                                              | 200; empty dataset                      |
| TC-019 | Security | SQL injection in search                  | **Method:** GET<br>**Headers:** `X-Sev2-Search=' OR 1=1`, `X-Sev2-Mode=workspacesonly`                                                                          | 200 or sanitized                        |
| TC-020 | Security | Script injection attempt                 | **Method:** GET<br>**Headers:** `X-Sev2-Search=<script>alert(1)</script>`                                                                                       | 200 or sanitized                        |


## API-002: Task 156859: REST API > PLUS-3989 Portal > Reports > EXPORT Feature Usage - BE

### Description

### Request { API-002: KMI - EXPORT Feature Usage }

- Method: GET
- URL: `{{base_url}}/v2/web/odata/SEPAGlobalSettings/SE.ExportReportFeatureUsage`
- Headers:
  - Content-Type: `application/json`
  - Authorization: `{{auth_token}}`
  - X-Sev2-Search:
  - X-Sev2-StartDate: `2026-01-01`
  - X-Sev2-EndDate: `2026-01-31`
  - X-Sev2-OffsetClient:
  - X-Sev2-SelectColumn: `workspaceName,workspaceID,eventName,entityTypeName,eventCount,totalUniqueUsers`
  - X-Sev2-FileType: `csv`
  - X-Sev2-OrderBy: `eventCount desc`
  - X-Sev2-Mode: `workspacesonly`
- Params: NONE
- Body: NONE

### Test Cases { API-002: KMI - EXPORT Feature Usage }

| ID     | Category | Description                                 | Request Override (Method / Params / Body)                                                                                                                                                                                                                                                    | Expected Result                 |
| ------ | -------- | ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| TC-001 | Positive | Export report with mode workspacesandtotals | **Method:** GET<br>**Headers:** `X-Sev2-OrderBy=eventCount desc`, `X-Sev2-StartDate=2026-01-01`, `X-Sev2-EndDate=2026-01-31`, `X-Sev2-SelectColumn=workspaceName,workspaceID,eventName,entityTypeName,eventCount,totalUniqueUsers`, `X-Sev2-FileType=csv`, `X-Sev2-Mode=workspacesandtotals` | 200; export file generated      |
| TC-002 | Positive | Export report with mode totalsonly          | **Method:** GET<br>**Headers:** `X-Sev2-OrderBy=eventCount desc`, `X-Sev2-StartDate=2026-01-01`, `X-Sev2-EndDate=2026-01-31`, `X-Sev2-SelectColumn=workspaceName,workspaceID,eventName,entityTypeName,eventCount,totalUniqueUsers`, `X-Sev2-FileType=csv`, `X-Sev2-Mode=totalsonly`          | 200; totals export generated    |
| TC-003 | Positive | Export report with mode workspacesonly      | **Method:** GET<br>**Headers:** `X-Sev2-OrderBy=eventCount desc`, `X-Sev2-StartDate=2026-01-01`, `X-Sev2-EndDate=2026-01-31`, `X-Sev2-SelectColumn=workspaceName,workspaceID,eventName,entityTypeName,eventCount,totalUniqueUsers`, `X-Sev2-FileType=csv`, `X-Sev2-Mode=workspacesonly`      | 200; workspace export generated |
| TC-004 | Positive | Export report with ordering                 | **Method:** GET<br>**Headers:** `X-Sev2-OrderBy=eventCount desc`, `X-Sev2-StartDate=2026-01-01`, `X-Sev2-EndDate=2026-01-31`, `X-Sev2-FileType=csv`, `X-Sev2-Mode=workspacesonly`                                                                                                            | 200                             |
| TC-005 | Positive | Export report with search filter            | **Method:** GET<br>**Headers:** `X-Sev2-Search=workspaceA`, `X-Sev2-StartDate=2026-01-01`, `X-Sev2-EndDate=2026-01-31`, `X-Sev2-FileType=csv`, `X-Sev2-Mode=workspacesonly`                                                                                                                  | 200; filtered export            |
| TC-006 | Positive | Export report with client offset            | **Method:** GET<br>**Headers:** `X-Sev2-OffsetClient=420`, `X-Sev2-StartDate=2026-01-01`, `X-Sev2-EndDate=2026-01-31`, `X-Sev2-FileType=csv`, `X-Sev2-Mode=workspacesonly`                                                                                                                   | 200                             |
| TC-007 | Positive | Export report with Excel format             | **Method:** GET<br>**Headers:** `X-Sev2-FileType=xlsx`, `X-Sev2-StartDate=2026-01-01`, `X-Sev2-EndDate=2026-01-31`, `X-Sev2-Mode=workspacesonly`                                                                                                                                             | 200; Excel file generated       |
| TC-008 | Negative | Missing StartDate                           | **Method:** GET<br>**Headers:** `X-Sev2-EndDate=2026-01-31`, `X-Sev2-Mode=workspacesonly`                                                                                                                                                                                                    | 400                             |
| TC-009 | Negative | Missing EndDate                             | **Method:** GET<br>**Headers:** `X-Sev2-StartDate=2026-01-01`, `X-Sev2-Mode=workspacesonly`                                                                                                                                                                                                  | 400                             |
| TC-010 | Negative | Invalid StartDate format                    | **Method:** GET<br>**Headers:** `X-Sev2-StartDate=01-01-2026`, `X-Sev2-EndDate=2026-01-31`, `X-Sev2-Mode=workspacesonly`                                                                                                                                                                     | 400                             |
| TC-011 | Negative | Invalid EndDate format                      | **Method:** GET<br>**Headers:** `X-Sev2-EndDate=31-01-2026`, `X-Sev2-Mode=workspacesonly`                                                                                                                                                                                                    | 400                             |
| TC-012 | Negative | StartDate greater than EndDate              | **Method:** GET<br>**Headers:** `X-Sev2-StartDate=2026-02-01`, `X-Sev2-EndDate=2026-01-01`, `X-Sev2-Mode=workspacesonly`                                                                                                                                                                     | 400                             |
| TC-013 | Negative | Invalid FileType value                      | **Method:** GET<br>**Headers:** `X-Sev2-FileType=pdf`, `X-Sev2-Mode=workspacesonly`                                                                                                                                                                                                          | 400/404                         |
| TC-014 | Negative | Missing FileType                            | **Method:** GET<br>**Headers:** `X-Sev2-StartDate=2026-01-01`, `X-Sev2-EndDate=2026-01-31`                                                                                                                                                                                                   | 400/404                         |
| TC-015 | Negative | Invalid SelectColumn field                  | **Method:** GET<br>**Headers:** `X-Sev2-SelectColumn=invalidColumn`, `X-Sev2-Mode=workspacesonly`                                                                                                                                                                                            | 400/404                         |
| TC-016 | Negative | Invalid Mode value                          | **Method:** GET<br>**Headers:** `X-Sev2-Mode=test`                                                                                                                                                                                                                                           | 400/404                         |
| TC-017 | Boundary | Same StartDate and EndDate                  | **Method:** GET<br>**Headers:** `X-Sev2-StartDate=2026-01-15`, `X-Sev2-EndDate=2026-01-15`, `X-Sev2-Mode=workspacesonly`                                                                                                                                                                     | 200                             |
| TC-017 | Boundary | Large date range export                     | **Method:** GET<br>**Headers:** `X-Sev2-StartDate=2023-01-01`, `X-Sev2-EndDate=2026-01-31`, `X-Sev2-Mode=workspacesandtotals`                                                                                                                                                                | 200 or performance validation   |
| TC-018 | Security | Injection attempt in search parameter       | **Method:** GET<br>**Headers:** `X-Sev2-Search=' OR 1=1`, `X-Sev2-Mode=workspacesonly`                                                                                                                                                                                                       | 400 or sanitized                |
| TC-019 | Security | Script injection in search                  | **Method:** GET<br>**Headers:** `X-Sev2-Search=<script>alert(1)</script>`                                                                                                                                                                                                                    | 400 or sanitized                |
