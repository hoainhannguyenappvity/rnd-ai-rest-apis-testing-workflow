# API Test Specifications

This document defines REST APIs to be tested automatically by Codex AI. Each API block is independent and includes expectations and test scenarios.

---

## API-001: Task 156901: REST API > PLUS-4173 Web > History Report > Limit recent shapes per device - BE

### Description

### Request { API-001: Limit recent shapes per device}

- Method: GET
- URL: `{{base_url}}/v2/web/odata/SEUsers/SE.GetReportHistoryOptShapeOnly`
- Headers:
  - Content-Type: `application/json`
  - Authorization: `{{auth_token}}`
  - X-Sev2-ProjectId: 
  - X-Sev2-TargetIds: 
  - X-Sev2-StartDate:
  - X-Sev2-EndDate:
  - X-Sev2-UserOffset:
  - X-Sev2-Motion:
  - X-Sev2-SpeedMin: 
  - X-Sev2-SpeedMax: 
  - X-Sev2-TopRecords:
  - X-Sev2-IncludeInvalidGPS:
  - X-Sev2-DayOfWeek:
  - X-Sev2-Top: `1`
  - X-Sev2-Search:
- Params: NONE
- Body: NONE
  
### Test Cases { API-001: Limit recent shapes per device}

| ID     | Category | Description                                     | Request Override (Method / Headers)                                                                                                                                      | Expected Result                 |
| ------ | -------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------- |
| TC-001 | Positive | Get report history with valid mandatory filters | **Method:** GET<br>**Headers:** `X-Sev2-ProjectId=17680`, `X-Sev2-TargetIds=106446`, `X-Sev2-StartDate=2026-01-01`, `X-Sev2-EndDate=2026-01-31`                          | 200; history data returned      |
| TC-002 | Positive | Filter by motion type                           | **Method:** GET<br>**Headers:** `X-Sev2-Motion=driving`, `X-Sev2-ProjectId=17680`, `X-Sev2-TargetIds=106446`, `X-Sev2-StartDate=2026-01-01`, `X-Sev2-EndDate=2026-01-31` | 200; filtered motion data       |
| TC-003 | Positive | Filter by speed range                           | **Method:** GET<br>**Headers:** `X-Sev2-SpeedMin=10`, `X-Sev2-SpeedMax=80`, `X-Sev2-ProjectId=17680`, `X-Sev2-TargetIds=106446`                                          | 200; results within speed range |
| TC-004 | Positive | Include invalid GPS data                        | **Method:** GET<br>**Headers:** `X-Sev2-IncludeInvalidGPS=true`, `X-Sev2-ProjectId=17680`, `X-Sev2-TargetIds=106446`                                                     | 200; invalid GPS data included  |
| TC-005 | Positive | Filter by day of week                           | **Method:** GET<br>**Headers:** `X-Sev2-DayOfWeek=Monday`, `X-Sev2-ProjectId=17680`, `X-Sev2-TargetIds=106446`                                                           | 200; results match selected day |
| TC-006 | Positive | Apply search keyword filter                     | **Method:** GET<br>**Headers:** `X-Sev2-Search=vehicleA`, `X-Sev2-ProjectId=17680`, `X-Sev2-TargetIds=106446`                                                            | 200; filtered results           |
| TC-007 | Positive | Limit number of returned shapes                 | **Method:** GET<br>**Headers:** `X-Sev2-Top=50`, `X-Sev2-ProjectId=17680`, `X-Sev2-TargetIds=106446`                                                                     | 200; limited dataset returned   |
| TC-008 | Positive | Limit number of returned records                | **Method:** GET<br>**Headers:** `X-Sev2-TopRecords=100`, `X-Sev2-ProjectId=17680`, `X-Sev2-TargetIds=106446`                                                             | 200                             |
| TC-009 | Positive | Apply timezone offset                           | **Method:** GET<br>**Headers:** `X-Sev2-UserOffset=420`, `X-Sev2-ProjectId=17680`, `X-Sev2-TargetIds=106446`                                                             | 200; timestamps adjusted        |
| TC-010 | Boundary | SpeedMin equals SpeedMax                        | **Method:** GET<br>**Headers:** `X-Sev2-SpeedMin=50`, `X-Sev2-SpeedMax=50`, `X-Sev2-ProjectId=17680`, `X-Sev2-TargetIds=106446`                                          | 200                             |
| TC-011 | Boundary | Large date range                                | **Method:** GET<br>**Headers:** `X-Sev2-StartDate=2024-01-01`, `X-Sev2-EndDate=2026-01-31`, `X-Sev2-ProjectId=17680`, `X-Sev2-TargetIds=106446`                          | 200; performance acceptable     |
| TC-012 | Boundary | Top value exceeds dataset size                  | **Method:** GET<br>**Headers:** `X-Sev2-Top=10000`, `X-Sev2-ProjectId=17680`, `X-Sev2-TargetIds=106446`                                                                  | 200; full dataset returned      |
| TC-013 | Positive | Get from main report- Missing ProjectId         | **Method:** GET<br>**Headers:** `X-Sev2-TargetIds=106446`, `X-Sev2-StartDate=2026-01-01`, `X-Sev2-EndDate=2026-01-31`                                                    | 200                             |
| TC-014 | Negative | Missing TargetIds                               | **Method:** GET<br>**Headers:** `X-Sev2-ProjectId=17680`, `X-Sev2-StartDate=2026-01-01`, `X-Sev2-EndDate=2026-01-31`                                                     | 400/500                         |
| TC-015 | Negative | Invalid date format                             | **Method:** GET<br>**Headers:** `X-Sev2-StartDate=abc`, `X-Sev2-EndDate=abc`, `X-Sev2-ProjectId=17680`, `X-Sev2-TargetIds=106446`                                        | 400                             |
| TC-016 | Negative | StartDate greater than EndDate                  | **Method:** GET<br>**Headers:** `X-Sev2-StartDate=2026-02-01`, `X-Sev2-EndDate=2026-01-01`, `X-Sev2-ProjectId=17680`, `X-Sev2-TargetIds=106446`                          | 400                             |
| TC-017 | Negative | Invalid SpeedMin format                         | **Method:** GET<br>**Headers:** `X-Sev2-SpeedMin=abc`, `X-Sev2-ProjectId=17680`, `X-Sev2-TargetIds=106446`                                                               | 400                             |
| TC-018 | Negative | SpeedMin greater than SpeedMax                  | **Method:** GET<br>**Headers:** `X-Sev2-SpeedMin=90`, `X-Sev2-SpeedMax=20`, `X-Sev2-ProjectId=1001`, `X-Sev2-TargetIds=106446`                                           | 400                             |
| TC-019 | Security | Injection attempt in search parameter           | **Method:** GET<br>**Headers:** `X-Sev2-Search=' OR 1=1`, `X-Sev2-ProjectId=17680`, `X-Sev2-TargetIds=106446`                                                            | 400 or 500                      |
| TC-020 | Security | Script injection attempt                        | **Method:** GET<br>**Headers:** `X-Sev2-Search=<script>alert(1)</script>`, `X-Sev2-ProjectId=17680`, `X-Sev2-TargetIds=106446`                                           | 400 or 500                      |
