# Newman Test Results

## APIs Tested
- API-001: Task 156901: REST API > PLUS-4173 Web > History Report > Limit recent shapes per device - BE
- Endpoint: https://selidasitetestapi.360awareqa.com/v2/web/odata/SEUsers/SE.GetReportHistoryOptShapeOnly
- Method: GET

## Test Cases Executed
| API | Test Case | Method | Endpoint | Status | Expected | Actual | Time (ms) | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| API-001 | TC-001 - Get report history with valid mandatory filters | GET | /v2/web/odata/SEUsers/SE.GetReportHistoryOptShapeOnly | Pass | 200 | 200 | 835 | Status code matches expected |
| API-001 | TC-002 - Filter by motion type | GET | /v2/web/odata/SEUsers/SE.GetReportHistoryOptShapeOnly | Pass | 200 | 200 | 319 | Status code matches expected |
| API-001 | TC-003 - Filter by speed range | GET | /v2/web/odata/SEUsers/SE.GetReportHistoryOptShapeOnly | Pass | 200 | 200 | 339 | Status code matches expected |
| API-001 | TC-004 - Include invalid GPS data | GET | /v2/web/odata/SEUsers/SE.GetReportHistoryOptShapeOnly | Pass | 200 | 200 | 295 | Status code matches expected |
| API-001 | TC-005 - Filter by day of week | GET | /v2/web/odata/SEUsers/SE.GetReportHistoryOptShapeOnly | Pass | 200 | 200 | 288 | Status code matches expected |
| API-001 | TC-006 - Apply search keyword filter | GET | /v2/web/odata/SEUsers/SE.GetReportHistoryOptShapeOnly | Pass | 200 | 200 | 369 | Status code matches expected |
| API-001 | TC-007 - Limit number of returned shapes | GET | /v2/web/odata/SEUsers/SE.GetReportHistoryOptShapeOnly | Fail | 200 | 400 | 384 | Expected 200 but received 400 |
| API-001 | TC-008 - Limit number of returned records | GET | /v2/web/odata/SEUsers/SE.GetReportHistoryOptShapeOnly | Pass | 200 | 200 | 290 | Status code matches expected |
| API-001 | TC-009 - Apply timezone offset | GET | /v2/web/odata/SEUsers/SE.GetReportHistoryOptShapeOnly | Pass | 200 | 200 | 301 | Status code matches expected |
| API-001 | TC-010 - SpeedMin equals SpeedMax | GET | /v2/web/odata/SEUsers/SE.GetReportHistoryOptShapeOnly | Pass | 200 | 200 | 314 | Status code matches expected |
| API-001 | TC-011 - Large date range | GET | /v2/web/odata/SEUsers/SE.GetReportHistoryOptShapeOnly | Pass | 200 | 200 | 288 | Status code matches expected |
| API-001 | TC-012 - Top value exceeds dataset size | GET | /v2/web/odata/SEUsers/SE.GetReportHistoryOptShapeOnly | Fail | 200 | 400 | 332 | Expected 200 but received 400 |
| API-001 | TC-013 - Get from main report- Missing ProjectId | GET | /v2/web/odata/SEUsers/SE.GetReportHistoryOptShapeOnly | Pass | 200 | 200 | 299 | Status code matches expected |
| API-001 | TC-014 - Missing TargetIds | GET | /v2/web/odata/SEUsers/SE.GetReportHistoryOptShapeOnly | Pass | 500 | 500 | 394 | Status code matches expected |
| API-001 | TC-015 - Invalid date format | GET | /v2/web/odata/SEUsers/SE.GetReportHistoryOptShapeOnly | Fail | 400 | 200 | 346 | Expected 400 but received 200 |
| API-001 | TC-016 - StartDate greater than EndDate | GET | /v2/web/odata/SEUsers/SE.GetReportHistoryOptShapeOnly | Fail | 400 | 200 | 294 | Expected 400 but received 200 |
| API-001 | TC-017 - Invalid SpeedMin format | GET | /v2/web/odata/SEUsers/SE.GetReportHistoryOptShapeOnly | Fail | 400 | 200 | 288 | Expected 400 but received 200 |
| API-001 | TC-018 - SpeedMin greater than SpeedMax | GET | /v2/web/odata/SEUsers/SE.GetReportHistoryOptShapeOnly | Fail | 400 | 200 | 290 | Expected 400 but received 200 |
| API-001 | TC-019 - Injection attempt in search parameter | GET | /v2/web/odata/SEUsers/SE.GetReportHistoryOptShapeOnly | Fail | 400/500 | 200 | 348 | Expected 400 or 500 but received 200 |
| API-001 | TC-020 - Script injection attempt | GET | /v2/web/odata/SEUsers/SE.GetReportHistoryOptShapeOnly | Fail | 400/500 | 200 | 344 | Expected 400 or 500 but received 200 |

## Newman Output Excerpts
```
+--------------------------------------------------------------------+
¦                         ¦            executed ¦             failed ¦
+-------------------------+---------------------+--------------------¦
¦              iterations ¦                   1 ¦                  0 ¦
¦                requests ¦                  20 ¦                  0 ¦
¦            test-scripts ¦                  20 ¦                  0 ¦
¦              assertions ¦                  20 ¦                  8 ¦
+--------------------------------------------------------------------+

total run duration: 8.5s
average response time: 347ms [min: 288ms, max: 835ms, s.d.: 116ms]

Failure details:
1) TC-007 - Limit number of returned shapes: expected 200, got 400
2) TC-012 - Top value exceeds dataset size: expected 200, got 400
3) TC-015 - Invalid date format: expected 400, got 200
4) TC-016 - StartDate greater than EndDate: expected 400, got 200
5) TC-017 - Invalid SpeedMin format: expected 400, got 200
6) TC-018 - SpeedMin greater than SpeedMax: expected 400, got 200
7) TC-019 - Injection attempt in search parameter: expected 400/500, got 200
8) TC-020 - Script injection attempt: expected 400/500, got 200
```
