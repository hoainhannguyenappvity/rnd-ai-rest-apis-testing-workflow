# API Test Specifications

This document defines REST APIs to be tested automatically by Codex AI. Each API block is independent and includes expectations and test scenarios.

---

## API-001: Task TBD: REST API > Portal > AI Chatbot > GET Telemetry Report

### Description

Get telemetry report data for AI Chatbot with OData query options such as paging, sorting, count, and filter.

### Request { API-001: GET Telemetry Report }

- Method: GET
- URL: `{{base_url}}/v2/web/odata/SEAIChatbot/SE.GetTelemetryReport`
- Headers:
  - Content-Type: `application/json`
  - Authorization: `{{auth_token}}`
- Params:
  - $count: `true`
  - $top: `10`
  - $orderby: `timestamp desc`
  - $filter:
- Body: NONE

### Test Cases { API-001: GET Telemetry Report }

| ID     | Category    | Description                              | Request Override (Method / Params / Body)                                                                                             | Expected Result                          |
| ------ | ----------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| TC-001 | Positive    | Get telemetry report with default paging | **Method:** GET<br>**Params:** `$count=true`, `$top=10`, `$orderby=timestamp desc`                                                    | 200; telemetry records returned          |
| TC-002 | Positive    | Get telemetry report first page          | **Method:** GET<br>**Params:** `$count=true`, `$top=10`, `$skip=0`, `$orderby=timestamp desc`                                         | 200; first page returned                 |
| TC-003 | Positive    | Get telemetry report second page         | **Method:** GET<br>**Params:** `$count=true`, `$top=10`, `$skip=10`, `$orderby=timestamp desc`                                        | 200; second page returned                |
| TC-004 | Positive    | Order telemetry by timestamp ascending   | **Method:** GET<br>**Params:** `$count=true`, `$top=10`, `$orderby=timestamp asc`                                                     | 200; sorted ascending                    |
| TC-005 | Positive    | Filter by successful requests            | **Method:** GET<br>**Params:** `$count=true`, `$top=10`, `$orderby=timestamp desc`, `$filter=success eq true`                         | 200; only successful records returned    |
| TC-006 | Positive    | Filter by model name                     | **Method:** GET<br>**Params:** `$count=true`, `$top=10`, `$orderby=timestamp desc`, `$filter=modelName eq 'gpt-4o'`                   | 200; filtered model records returned     |
| TC-007 | Positive    | Filter by workspace name                 | **Method:** GET<br>**Params:** `$count=true`, `$top=10`, `$orderby=timestamp desc`, `$filter=workspaceName eq 'Demo Workspace'`       | 200; filtered workspace records returned |
| TC-008 | Positive    | Filter by application type               | **Method:** GET<br>**Params:** `$count=true`, `$top=10`, `$orderby=timestamp desc`, `$filter=applicationType eq 'portal'`             | 200; filtered application type returned  |
| TC-009 | Negative    | Missing authorization                    | **Method:** GET<br>**Headers:** Authorization=None                                                                                    | 401/403                                  |
| TC-010 | Security    | OData injection in filter                | **Method:** GET<br>**Params:** `$count=true`, `$top=10`, `$orderby=timestamp desc`, `$filter=workspaceName eq 'x' or 1 eq 1`          | 400/403/422; safely handled              |
| TC-011 | Security    | Script payload in filter                 | **Method:** GET<br>**Params:** `$count=true`, `$top=10`, `$orderby=timestamp desc`, `$filter=username eq '<script>alert(1)</script>'` | 400/403/422; safely handled              |
| TC-012 | Performance | Response time under threshold            | **Method:** GET<br>**Params:** `$count=true`, `$top=10`, `$orderby=timestamp desc`                                                    | 200; response time < 3 seconds           |


## API-002: Task TBD: REST API > Portal > AI Chatbot > EXPORT Telemetry Report

### Description

Export telemetry report data for AI Chatbot with selected columns, file type, client offset, and optional OData filtering.

### Request { API-002: EXPORT Telemetry Report }

- Method: GET
- URL: `{{base_url}}/v2/web/odata/SEAIChatbot/SE.ExportTelemetryReport`
- Headers:
  - Content-Type: `application/json`
  - Authorization: `{{auth_token}}`
  - X-Sev2-FileType: `csv`
  - X-Sev2-OffsetClient: `420`
  - X-Sev2-SelectColumn: `workspaceID,workspaceName,applicationType,timestamp,elapsedTime,success,modelName,tokenUsage,completionReason,userId,username,sessionId,errorDetails,requestParameters,clientPlatform,clientVersion,queryResponseLength,ipAddress,httpMethod,headers,callerAttribution,backendServiceVersion`
- Params:
  - $filter:
- Body: NONE

### Test Cases { API-002: EXPORT Telemetry Report }

| ID     | Category    | Description                             | Request Override (Method / Params / Body)                                                                                                                                                                                                                                                                                                                                                             | Expected Result                       |
| ------ | ----------- | --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| TC-001 | Positive    | Export telemetry report as CSV          | **Method:** GET<br>**Headers:** `X-Sev2-FileType=csv`, `X-Sev2-OffsetClient=420`, `X-Sev2-SelectColumn=workspaceID,workspaceName,applicationType,timestamp,elapsedTime,success,modelName,tokenUsage,completionReason,userId,username,sessionId,errorDetails,requestParameters,clientPlatform,clientVersion,queryResponseLength,ipAddress,httpMethod,headers,callerAttribution,backendServiceVersion`  | 200; CSV export generated             |
| TC-002 | Positive    | Export telemetry report as XLSX         | **Method:** GET<br>**Headers:** `X-Sev2-FileType=xlsx`, `X-Sev2-OffsetClient=420`, `X-Sev2-SelectColumn=workspaceID,workspaceName,applicationType,timestamp,elapsedTime,success,modelName,tokenUsage,completionReason,userId,username,sessionId,errorDetails,requestParameters,clientPlatform,clientVersion,queryResponseLength,ipAddress,httpMethod,headers,callerAttribution,backendServiceVersion` | 200; XLSX export generated            |
| TC-003 | Positive    | Export successful telemetry only        | **Method:** GET<br>**Headers:** `X-Sev2-FileType=csv`, `X-Sev2-OffsetClient=420`<br>**Params:** `$filter=success eq true`                                                                                                                                                                                                                                                                             | 200; filtered export generated        |
| TC-004 | Positive    | Export telemetry filtered by model name | **Method:** GET<br>**Headers:** `X-Sev2-FileType=csv`, `X-Sev2-OffsetClient=420`<br>**Params:** `$filter=modelName eq 'gpt-4o'`                                                                                                                                                                                                                                                                       | 200; filtered export generated        |
| TC-005 | Positive    | Export telemetry filtered by workspace  | **Method:** GET<br>**Headers:** `X-Sev2-FileType=csv`, `X-Sev2-OffsetClient=420`<br>**Params:** `$filter=workspaceName eq 'Demo Workspace'`                                                                                                                                                                                                                                                           | 200; filtered export generated        |
| TC-006 | Negative    | Missing authorization                   | **Method:** GET<br>**Headers:** Authorization=None                                                                                                                                                                                                                                                                                                                                                    | 401/403                               |
| TC-007 | Negative    | Missing file type                       | **Method:** GET<br>**Headers:** `X-Sev2-FileType=None`, `X-Sev2-OffsetClient=420`                                                                                                                                                                                                                                                                                                                     | 400/404                               |
| TC-008 | Negative    | Invalid file type                       | **Method:** GET<br>**Headers:** `X-Sev2-FileType=pdf`, `X-Sev2-OffsetClient=420`                                                                                                                                                                                                                                                                                                                      | 400/404/415                           |
| TC-009 | Negative    | Missing select column                   | **Method:** GET<br>**Headers:** `X-Sev2-FileType=csv`, `X-Sev2-SelectColumn=None`                                                                                                                                                                                                                                                                                                                     | 400/404                               |
| TC-010 | Negative    | Invalid select column field             | **Method:** GET<br>**Headers:** `X-Sev2-FileType=csv`, `X-Sev2-SelectColumn=invalidColumn`                                                                                                                                                                                                                                                                                                            | 400/404                               |
| TC-011 | Negative    | Invalid offset client                   | **Method:** GET<br>**Headers:** `X-Sev2-FileType=csv`, `X-Sev2-OffsetClient=INVALID`                                                                                                                                                                                                                                                                                                                  | 400                                   |
| TC-012 | Security    | OData injection in export filter        | **Method:** GET<br>**Headers:** `X-Sev2-FileType=csv`, `X-Sev2-OffsetClient=420`<br>**Params:** `$filter=workspaceName eq 'x' or 1 eq 1`                                                                                                                                                                                                                                                              | 400/403/422; safely handled           |
| TC-013 | Security    | Script payload in export filter         | **Method:** GET<br>**Headers:** `X-Sev2-FileType=csv`, `X-Sev2-OffsetClient=420`<br>**Params:** `$filter=username eq '<script>alert(1)</script>'`                                                                                                                                                                                                                                                     | 400/403/422; safely handled           |
| TC-014 | Performance | Export response time under threshold    | **Method:** GET<br>**Headers:** `X-Sev2-FileType=csv`, `X-Sev2-OffsetClient=420`                                                                                                                                                                                                                                                                                                                      | 200; export response time < 5 seconds |
