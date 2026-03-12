# API Test Specifications

This document defines REST APIs to be tested automatically by Codex AI. Each API block is independent and includes expectations and test scenarios.

---


## API-001: Task 156852: REST API > PLUS-3985 Portal > Reports > GET User Engagement - BE
### Description

### Request { API-001:  GET User Engagement }

- Method: GET
- URL: `{{base_url}}/v2/web/odata/SEPAGlobalSettings/SE.GetReportUserEngagement`
- Headers:
  - Content-Type: `application/json`
  - Authorization: `{{auth_token}}`
  - X-Sev2-Search:
  - X-Sev2-StartDate:
  - X-Sev2-EndDate:
  - X-Sev2-Skip:
  - X-Sev2-Top:
  - X-Sev2-OrderBy:
  - X-Sev2-Mode: 
- Params: NONE
- Body: NONE


### Test Cases { API-001:  GET User Engagement }

| ID     | Category | Description                                                | Request Override (Method / Params / Body)                                                                                                                       | Expected Result                           |
| ------ | -------- | ---------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| TC-001 | Positive | Get report with mode workspacesandtotals                   | **Method:** GET<br>**Headers:** `X-Sev2-StartDate=2026-01-01`, `X-Sev2-EndDate=2026-01-31`, `X-Sev2-Mode=workspacesandtotals`                                   | 200; workspace data and totals returned   |
| TC-002 | Positive | Get report with mode workspacesandtotals using pagination  | **Method:** GET<br>**Headers:** `X-Sev2-Skip=0`, `X-Sev2-Top=50`, `X-Sev2-StartDate=2026-01-01`, `X-Sev2-EndDate=2026-01-31`, `X-Sev2-Mode=workspacesandtotals` | 200; paginated workspace data with totals |
| TC-003 | Positive | Get report with mode workspacesandtotals using search      | **Method:** GET<br>**Headers:** `X-Sev2-Search=test`, `X-Sev2-StartDate=2026-01-01`, `X-Sev2-EndDate=2026-01-31`, `X-Sev2-Mode=workspacesandtotals`             | 200; filtered workspace data with totals  |
| TC-004 | Positive | Get report with mode totalsonly                            | **Method:** GET<br>**Headers:** `X-Sev2-StartDate=2026-01-01`, `X-Sev2-EndDate=2026-01-31`, `X-Sev2-Mode=totalsonly`                                            | 200; totals returned only                 |
| TC-005 | Positive | Get report with mode totalsonly with pagination parameters | **Method:** GET<br>**Headers:** `X-Sev2-Skip=0`, `X-Sev2-Top=50`, `X-Sev2-StartDate=2026-01-01`, `X-Sev2-EndDate=2026-01-31`, `X-Sev2-Mode=totalsonly`          | 200; totals returned                      |
| TC-006 | Positive | Get report with mode workspacesonly                        | **Method:** GET<br>**Headers:** `X-Sev2-StartDate=2026-01-01`, `X-Sev2-EndDate=2026-01-31`, `X-Sev2-Mode=workspacesonly`                                        | 200; workspace data returned only         |
| TC-007 | Positive | Get report with mode workspacesonly using pagination       | **Method:** GET<br>**Headers:** `X-Sev2-Skip=0`, `X-Sev2-Top=50`, `X-Sev2-StartDate=2026-01-01`, `X-Sev2-EndDate=2026-01-31`, `X-Sev2-Mode=workspacesonly`      | 200; paginated workspace data             |
| TC-008 | Positive | Get report with ordering                                   | **Method:** GET<br>**Headers:** `X-Sev2-OrderBy=date desc`, `X-Sev2-StartDate=2026-01-01`, `X-Sev2-EndDate=2026-01-31`, `X-Sev2-Mode=workspacesonly`            | 200; sorted workspace data                |
| TC-009 | Negative | Invalid mode value                                         | **Method:** GET<br>**Headers:** `X-Sev2-StartDate=2026-01-01`, `X-Sev2-EndDate=2026-01-31`, `X-Sev2-Mode=invalid`                                               | 400 / 404                                 |
| TC-010 | Negative | Missing mode parameter                                     | **Method:** GET<br>**Headers:** `X-Sev2-StartDate=2026-01-01`, `X-Sev2-EndDate=2026-01-31`                                                                      | 400                                       |
| TC-011 | Negative | Invalid start date format                                  | **Method:** GET<br>**Headers:** `X-Sev2-StartDate=abc`, `X-Sev2-EndDate=2026-01-31`, `X-Sev2-Mode=workspacesandtotals`                                          | 400                                       |
| TC-012 | Negative | Invalid end date format                                    | **Method:** GET<br>**Headers:** `X-Sev2-StartDate=2026-01-01`, `X-Sev2-EndDate=abc`, `X-Sev2-Mode=workspacesandtotals`                                          | 400                                       |
| TC-013 | Negative | Start date greater than end date                           | **Method:** GET<br>**Headers:** `X-Sev2-StartDate=2026-01-31`, `X-Sev2-EndDate=2026-01-01`, `X-Sev2-Mode=workspacesandtotals`                                   | 400                                       |
| TC-014 | Security | Injection attempt in search parameter                      | **Method:** GET                                                                                                                                                 |                                           |



## API-002: Task 156852: REST API > PLUS-3985 Portal > Reports > EXPORT User Engagement - BE

### Description

### Request { API-002: KMI - EXPORT User Engagement }

- Method: GET
- URL: `{{base_url}}/v2/web/odata/SEPAGlobalSettings/SE.ExportReportUserEngagement`
- Headers:
  - Content-Type: `application/json`
  - Authorization: `{{auth_token}}`
  - X-Sev2-Search
  - X-Sev2-StartDate:
  - X-Sev2-EndDate:
  - X-Sev2-OffsetClient:
  - X-Sev2-SelectColumn: 
  - X-Sev2-FileType
  - X-Sev2-OrderBy:
  - X-Sev2-Mode: 
- Params: NONE
- Body: NONE

### Test Cases { API-002: KMI - EXPORT User Engagement }

| ID     | Category | Description                                          | Request Override (Method / Params / Body)                                                                                                                                                                                                      | Expected Result                        |
| ------ | -------- | ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| TC-001 | Positive | Export report with mode workspacesandtotals CSV file | **Method:** GET<br>**Headers:** `X-Sev2-StartDate=2026-01-01`, `X-Sev2-EndDate=2026-01-31`, `X-Sev2-SelectColumn=date,workspaceName,workspaceID,dau,wau,mau,dauMauRatio,wauMauRatio`, `X-Sev2-FileType=csv`, `X-Sev2-Mode=workspacesandtotals` | 200; CSV file downloaded               |
| TC-002 | Positive | Export report with mode totalsonly CSV file          | **Method:** GET<br>**Headers:** `X-Sev2-StartDate=2026-01-01`, `X-Sev2-EndDate=2026-01-31`, `X-Sev2-SelectColumn=date,dau,wau,mau`, `X-Sev2-FileType=csv`, `X-Sev2-Mode=totalsonly`                                                            | 200; CSV file downloaded               |
| TC-003 | Positive | Export report with mode workspacesonly CSV file      | **Method:** GET<br>**Headers:** `X-Sev2-StartDate=2026-01-01`, `X-Sev2-EndDate=2026-01-31`, `X-Sev2-SelectColumn=date,workspaceName,dau,wau,mau`, `X-Sev2-FileType=csv`, `X-Sev2-Mode=workspacesonly`                                          | 200; CSV file downloaded               |
| TC-004 | Positive | Export report with search filter                     | **Method:** GET<br>**Headers:** `X-Sev2-Search=test`, `X-Sev2-StartDate=2026-01-01`, `X-Sev2-EndDate=2026-01-31`, `X-Sev2-FileType=csv`, `X-Sev2-Mode=workspacesandtotals`                                                                     | 200; filtered file exported            |
| TC-005 | Positive | Export report with ordering                          | **Method:** GET<br>**Headers:** `X-Sev2-OrderBy=date desc`, `X-Sev2-StartDate=2026-01-01`, `X-Sev2-EndDate=2026-01-31`, `X-Sev2-FileType=csv`, `X-Sev2-Mode=workspacesonly`                                                                    | 200; ordered data exported             |
| TC-006 | Positive | Export report with client timezone offset            | **Method:** GET<br>**Headers:** `X-Sev2-OffsetClient=420`, `X-Sev2-StartDate=2026-01-01`, `X-Sev2-EndDate=2026-01-31`, `X-Sev2-FileType=csv`, `X-Sev2-Mode=workspacesandtotals`                                                                | 200; timezone-adjusted data exported   |
| TC-007 | Negative | Invalid mode value                                   | **Method:** GET<br>**Headers:** `X-Sev2-StartDate=2026-01-01`, `X-Sev2-EndDate=2026-01-31`, `X-Sev2-FileType=csv`, `X-Sev2-Mode=invalid`                                                                                                       | 400 / 404                              |
| TC-008 | Negative | Missing file type                                    | **Method:** GET<br>**Headers:** `X-Sev2-StartDate=2026-01-01`, `X-Sev2-EndDate=2026-01-31`, `X-Sev2-Mode=workspacesandtotals`                                                                                                                  | 400 /404                               |
| TC-009 | Negative | Unsupported file type                                | **Method:** GET<br>**Headers:** `X-Sev2-StartDate=2026-01-01`, `X-Sev2-EndDate=2026-01-31`, `X-Sev2-FileType=txt`, `X-Sev2-Mode=workspacesandtotals`                                                                                           | 400                                    |
| TC-010 | Negative | Invalid start date format                            | **Method:** GET<br>**Headers:** `X-Sev2-StartDate=abc`, `X-Sev2-EndDate=2026-01-31`, `X-Sev2-FileType=csv`, `X-Sev2-Mode=workspacesandtotals`                                                                                                  | 400                                    |
| TC-011 | Negative | Invalid end date format                              | **Method:** GET<br>**Headers:** `X-Sev2-StartDate=2026-01-01`, `X-Sev2-EndDate=abc`, `X-Sev2-FileType=csv`, `X-Sev2-Mode=workspacesandtotals`                                                                                                  | 400                                    |
| TC-012 | Negative | Start date greater than end date                     | **Method:** GET<br>**Headers:** `X-Sev2-StartDate=2026-01-31`, `X-Sev2-EndDate=2026-01-01`, `X-Sev2-FileType=csv`, `X-Sev2-Mode=workspacesandtotals`                                                                                           | 400                                    |
| TC-013 | Negative | Invalid select column value                          | **Method:** GET<br>**Headers:** `X-Sev2-SelectColumn=invalidColumn`, `X-Sev2-StartDate=2026-01-01`, `X-Sev2-EndDate=2026-01-31`, `X-Sev2-FileType=csv`, `X-Sev2-Mode=workspacesandtotals`                                                      | 400                                    |
| TC-014 | Security | Injection attempt in search parameter                | **Method:** GET<br>**Headers:** `X-Sev2-Search=' OR 1=1`, `X-Sev2-StartDate=2026-01-01`, `X-Sev2-EndDate=2026-01-31`, `X-Sev2-FileType=csv`, `X-Sev2-Mode=workspacesandtotals`                                                                 | 200 or safely handled                  |
| TC-015 | Boundary | Same start and end date                              | **Method:** GET<br>**Headers:** `X-Sev2-StartDate=2026-01-15`, `X-Sev2-EndDate=2026-01-15`, `X-Sev2-FileType=csv`, `X-Sev2-Mode=workspacesonly`                                                                                                | 200                                    |
| TC-016 | Boundary | Large date range export                              | **Method:** GET<br>**Headers:** `X-Sev2-StartDate=2024-01-01`, `X-Sev2-EndDate=2026-01-31`, `X-Sev2-FileType=csv`, `X-Sev2-Mode=workspacesandtotals`                                                                                           | 200 or performance validation          |
| TC-017 | Boundary | Empty search result export                           | **Method:** GET<br>**Headers:** `X-Sev2-Search=NoDataFound`, `X-Sev2-StartDate=2026-01-01`, `X-Sev2-EndDate=2026-01-31`, `X-Sev2-FileType=csv`, `X-Sev2-Mode=workspacesandtotals`                                                              | 200; file generated with empty dataset |

