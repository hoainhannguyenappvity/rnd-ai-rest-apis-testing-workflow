# API Test Results

- Total APIs tested: 7
- Total test cases executed (Postman scripts): 134
- Passed: 120
- Failed: 14
- Pass rate: 89.6%

## API-001: KMI - CHECK ALL RULE GEOFENCE-PROJECT
Test cases executed: 22

| Test Case | Method | Endpoint | Status | Expected | Actual | Time (ms) |
| --- | --- | --- | --- | --- | --- | --- |
| TC-001 - Set rule options successfully with valid data | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.CheckedAllOptions | Pass | 200 | 200 | 1161 |
| TC-002 - Set `checkedAllGeofences` = false | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.CheckedAllOptions | Pass | 200 | 200 | 313 |
| TC-003 - Unauthorized request | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.CheckedAllOptions | Pass | 401 | 401 | 288 |
| TC-004 - Missing required field `ruleId` | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.CheckedAllOptions | Pass | 403 | 403 | 431 |
| TC-005 - Missing required field `projectId` | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.CheckedAllOptions | Pass | 404 | 404 | 302 |
| TC-006 - Invalid `ruleId` | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.CheckedAllOptions | Pass | 403 | 403 | 504 |
| TC-007 - Invalid `projectId` | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.CheckedAllOptions | Pass | 404 | 404 | 300 |
| TC-008 - Invalid data type for `checkedAllGeofences` | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.CheckedAllOptions | Pass | 400 | 400 | 296 |
| TC-009 - Empty `targetIds` when `checkedAllGeofences` = true | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.CheckedAllOptions | Pass | 200 | 200 | 315 |
| TC-010 - Provide specific `targetIds` | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.CheckedAllOptions | Pass | 200 | 200 | 338 |
| TC-011 - Invalid format for `targetIds` | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.CheckedAllOptions | Pass | 404 | 404 | 318 |
| TC-012 - Valid `alertTypeIds` list | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.CheckedAllOptions | Pass | 200 | 200 | 351 |
| TC-013 - Invalid `alertTypeIds` format | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.CheckedAllOptions | Pass | 404 | 404 | 360 |
| TC-014 - Injection payload in `targetIds` | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.CheckedAllOptions | Pass | 404 | 404 | 321 |
| TC-015 - Injection payload in `alertTypeIds` | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.CheckedAllOptions | Pass | 404 | 404 | 344 |
| TC-016 - Invalid Content-Type | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.CheckedAllOptions | Pass | 415 | 415 | 295 |
| TC-017 - Invalid JSON body | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.CheckedAllOptions | Pass | 400 | 400 | 293 |
| TC-018 - Invalid HTTP method | GET | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.CheckedAllOptions | Pass | 404 | 404 | 276 |
| TC-019 - Set rule options response time | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.CheckedAllOptions | Pass | 200 | 200 | 329 |
| TC-020 - Extra unknown field in request body | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.CheckedAllOptions | Fail | 400 or 403 or 404 | 200 | 308 |
| TC-021 - Other workspace `ruleId` | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.CheckedAllOptions | Pass | 403 | 403 | 420 |
| TC-022 - Other workspace `projectId` | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.CheckedAllOptions | Pass | 403 | 403 | 422 |

## API-002: KMI - CHECK ALL RULE POI-PROJECT
Test cases executed: 22

| Test Case | Method | Endpoint | Status | Expected | Actual | Time (ms) |
| --- | --- | --- | --- | --- | --- | --- |
| TC-001 - Set rule options successfully with valid data | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.CheckedAllOptions | Pass | 200 | 200 | 357 |
| TC-002 - Set `checkedAllPOIs` = false | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.CheckedAllOptions | Pass | 200 | 200 | 342 |
| TC-003 - Unauthorized request | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.CheckedAllOptions | Pass | 401 | 401 | 288 |
| TC-004 - Missing required field `ruleId` | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.CheckedAllOptions | Pass | 403 | 403 | 428 |
| TC-005 - Missing required field `projectId` | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.CheckedAllOptions | Pass | 404 | 404 | 299 |
| TC-006 - Invalid `ruleId` | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.CheckedAllOptions | Pass | 403 | 403 | 424 |
| TC-007 - Invalid `projectId` | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.CheckedAllOptions | Pass | 404 | 404 | 306 |
| TC-008 - Invalid data type for `checkedAllPOIs` | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.CheckedAllOptions | Pass | 400 | 400 | 304 |
| TC-009 - Empty `targetIds` when `checkedAllPOIs` = true | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.CheckedAllOptions | Pass | 200 | 200 | 316 |
| TC-010 - Provide specific `targetIds` | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.CheckedAllOptions | Pass | 200 | 200 | 309 |
| TC-011 - Invalid format for `targetIds` | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.CheckedAllOptions | Pass | 404 | 404 | 298 |
| TC-012 - Valid `alertTypeIds` list | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.CheckedAllOptions | Pass | 200 | 200 | 526 |
| TC-013 - Invalid `alertTypeIds` format | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.CheckedAllOptions | Pass | 404 | 404 | 298 |
| TC-014 - Injection payload in `targetIds` | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.CheckedAllOptions | Pass | 404 | 404 | 336 |
| TC-015 - Injection payload in `alertTypeIds` | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.CheckedAllOptions | Pass | 404 | 404 | 356 |
| TC-016 - Invalid Content-Type | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.CheckedAllOptions | Pass | 415 | 415 | 297 |
| TC-017 - Invalid JSON body | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.CheckedAllOptions | Pass | 400 | 400 | 295 |
| TC-018 - Invalid HTTP method | GET | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.CheckedAllOptions | Pass | 404 | 404 | 270 |
| TC-019 - Set rule options response time | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.CheckedAllOptions | Pass | 200 | 200 | 321 |
| TC-020 - Extra unknown field in request body | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.CheckedAllOptions | Fail | 400 or 403 or 404 | 200 | 369 |
| TC-021 - Other workspace `ruleId` | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.CheckedAllOptions | Pass | 403 | 403 | 435 |
| TC-022 - Other workspace `projectId` | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.CheckedAllOptions | Pass | 403 | 403 | 432 |

## API-003: KMI - CHECK ALL RULE GEOFENCE-SUBSITE
Test cases executed: 22

| Test Case | Method | Endpoint | Status | Expected | Actual | Time (ms) |
| --- | --- | --- | --- | --- | --- | --- |
| TC-001 - Set rule options successfully with valid data | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.CheckedAllOptions | Pass | 200 | 200 | 380 |
| TC-002 - Set `checkedAllGeofences` = false | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.CheckedAllOptions | Pass | 200 | 200 | 315 |
| TC-003 - Unauthorized request | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.CheckedAllOptions | Pass | 401 | 401 | 286 |
| TC-004 - Missing required field `ruleId` | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.CheckedAllOptions | Pass | 403 | 403 | 582 |
| TC-005 - Missing required field `subsiteId` | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.CheckedAllOptions | Pass | 404 | 404 | 304 |
| TC-006 - Other workspace `ruleId` | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.CheckedAllOptions | Pass | 403 | 403 | 418 |
| TC-007 - Other workspace `subsiteId` | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.CheckedAllOptions | Pass | 404 | 404 | 300 |
| TC-008 - Invalid data type for `checkedAllGeofences` | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.CheckedAllOptions | Pass | 400 | 400 | 293 |
| TC-009 - Empty `targetIds` when `checkedAllGeofences` = true | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.CheckedAllOptions | Pass | 200 | 200 | 313 |
| TC-010 - Provide specific `targetIds` | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.CheckedAllOptions | Pass | 200 | 200 | 351 |
| TC-011 - Invalid format for `targetIds` | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.CheckedAllOptions | Pass | 404 | 404 | 304 |
| TC-012 - Valid `alertTypeIds` list | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.CheckedAllOptions | Pass | 200 | 200 | 315 |
| TC-013 - Invalid `alertTypeIds` format | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.CheckedAllOptions | Pass | 404 | 404 | 299 |
| TC-014 - Injection payload in `targetIds` | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.CheckedAllOptions | Pass | 404 | 404 | 298 |
| TC-015 - Injection payload in `alertTypeIds` | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.CheckedAllOptions | Pass | 404 | 404 | 300 |
| TC-016 - Invalid Content-Type | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.CheckedAllOptions | Pass | 415 | 415 | 310 |
| TC-017 - Invalid JSON body | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.CheckedAllOptions | Pass | 400 | 400 | 296 |
| TC-018 - Invalid HTTP method | GET | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.CheckedAllOptions | Pass | 404 | 404 | 270 |
| TC-019 - Set rule options response time | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.CheckedAllOptions | Pass | 200 | 200 | 313 |
| TC-020 - Extra unknown field in request body | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.CheckedAllOptions | Fail | 400 or 403 or 404 | 200 | 311 |
| TC-021 - Other workspace `ruleId` | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.CheckedAllOptions | Pass | 403 | 403 | 420 |
| TC-022 - Other workspace `subsiteId` | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.CheckedAllOptions | Pass | 403 | 403 | 509 |

## API-004: KMI - CHECK ALL RULE POI-SUBSITE
Test cases executed: 22

| Test Case | Method | Endpoint | Status | Expected | Actual | Time (ms) |
| --- | --- | --- | --- | --- | --- | --- |
| TC-001 - Set rule options successfully with valid data | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.CheckedAllOptions | Pass | 200 | 200 | 382 |
| TC-002 - Set `checkedAllPOIs` = false | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.CheckedAllOptions | Pass | 200 | 200 | 307 |
| TC-003 - Unauthorized request | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.CheckedAllOptions | Pass | 401 | 401 | 285 |
| TC-004 - Missing required field `ruleId` | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.CheckedAllOptions | Pass | 403 | 403 | 418 |
| TC-005 - Missing required field `subsiteId` | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.CheckedAllOptions | Pass | 404 | 404 | 299 |
| TC-006 - Other workspace `ruleId` | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.CheckedAllOptions | Pass | 403 | 403 | 603 |
| TC-007 - Other workspace `subsiteId` | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.CheckedAllOptions | Pass | 404 | 404 | 317 |
| TC-008 - Invalid data type for `checkedAllPOIs` | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.CheckedAllOptions | Pass | 400 | 400 | 295 |
| TC-009 - Empty `targetIds` when `checkedAllPOIs` = true | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.CheckedAllOptions | Pass | 200 | 200 | 317 |
| TC-010 - Provide specific `targetIds` | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.CheckedAllOptions | Pass | 200 | 200 | 316 |
| TC-011 - Invalid format for `targetIds` | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.CheckedAllOptions | Pass | 404 | 404 | 296 |
| TC-012 - Valid `alertTypeIds` list | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.CheckedAllOptions | Pass | 200 | 200 | 313 |
| TC-013 - Invalid `alertTypeIds` format | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.CheckedAllOptions | Pass | 404 | 404 | 296 |
| TC-014 - Injection payload in `targetIds` | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.CheckedAllOptions | Pass | 404 | 404 | 300 |
| TC-015 - Injection payload in `alertTypeIds` | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.CheckedAllOptions | Pass | 404 | 404 | 297 |
| TC-016 - Invalid Content-Type | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.CheckedAllOptions | Pass | 415 | 415 | 293 |
| TC-017 - Invalid JSON body | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.CheckedAllOptions | Pass | 400 | 400 | 295 |
| TC-018 - Invalid HTTP method | GET | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.CheckedAllOptions | Pass | 404 | 404 | 269 |
| TC-019 - Set rule options response time | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.CheckedAllOptions | Pass | 200 | 200 | 362 |
| TC-020 - Extra unknown field in request body | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.CheckedAllOptions | Fail | 400 or 403 or 404 | 200 | 361 |
| TC-021 - Other workspace `ruleId` | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.CheckedAllOptions | Pass | 403 | 403 | 429 |
| TC-022 - Other workspace `subsiteId` | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.CheckedAllOptions | Pass | 403 | 403 | 421 |

## API-005: KMI - GET SUBSITE CHECK OPTIONS
Test cases executed: 12

| Test Case | Method | Endpoint | Status | Expected | Actual | Time (ms) |
| --- | --- | --- | --- | --- | --- | --- |
| TC-001 - Get subsite checked options successfully | GET | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.GetSubSiteProjectCheckedOptions(ruleID=19979) | Pass | 200 | 200 | 304 |
| TC-002 - Get options with valid ruleID | GET | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.GetSubSiteProjectCheckedOptions(ruleID=19979) | Pass | 200 | 200 | 305 |
| TC-003 - Unauthorized request | GET | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.GetSubSiteProjectCheckedOptions(ruleID=19979) | Pass | 401 | 401 | 306 |
| TC-004 - Invalid ruleID (negative) | GET | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.GetSubSiteProjectCheckedOptions(ruleID=-1) | Pass | 403 | 403 | 418 |
| TC-005 - Invalid ruleID (non-numeric) | GET | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.GetSubSiteProjectCheckedOptions(ruleID=abc) | Pass | 404 | 404 | 270 |
| TC-006 - Rule not found | GET | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.GetSubSiteProjectCheckedOptions(ruleID=9999999) | Fail | 404 or 200 | 403 | 420 |
| TC-007 - Missing ruleID parameter | GET | https://selidasitetestapi.360awareqa.com/SE.GetSubSiteProjectCheckedOptions() | Fail | 400 or 403 or 404 | 200 | 268 |
| TC-008 - Invalid HTTP method | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.GetSubSiteProjectCheckedOptions(ruleID=19979) | Pass | 405 | 405 | 270 |
| TC-009 - Invalid Content-Type | GET | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.GetSubSiteProjectCheckedOptions(ruleID=19979) | Pass | 200 | 200 | 300 |
| TC-010 - Injection payload in ruleID |  |  | Fail | 400 or 403 or 404 |  |  |
| TC-011 - Rule ID from other workspace | GET | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.GetSubSiteProjectCheckedOptions(ruleID=18183) | Pass | 403 | 403 | 446 |
| TC-012 - Get subsite options response time | GET | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.GetSubSiteProjectCheckedOptions(ruleID=19979) | Pass | 200 | 200 | 437 |

## API-006: KMI - ADD ALERT
Test cases executed: 15

| Test Case | Method | Endpoint | Status | Expected | Actual | Time (ms) |
| --- | --- | --- | --- | --- | --- | --- |
| TC-001 - Add alert subscription with valid data | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.AddAlertSubscriptionWhenEditingRule | Pass | 200 | 200 | 3000 |
| TC-002 - Unauthorized request | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.AddAlertSubscriptionWhenEditingRule | Pass | 401 | 401 | 289 |
| TC-003 - Missing required field `ruleId` | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.AddAlertSubscriptionWhenEditingRule | Pass | 403 | 403 | 495 |
| TC-004 - Missing required field `triggerType` | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.AddAlertSubscriptionWhenEditingRule | Pass | 400 | 400 | 322 |
| TC-005 - Missing required field `projectId` | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.AddAlertSubscriptionWhenEditingRule | Fail | 400 or 403 or 404 | 200 | 303 |
| TC-006 - Invalid `ruleId` | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.AddAlertSubscriptionWhenEditingRule | Pass | 403 | 403 | 429 |
| TC-007 - Invalid `triggerType` | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.AddAlertSubscriptionWhenEditingRule | Pass | 400 | 400 | 300 |
| TC-008 - Invalid data type for `triggerType` | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.AddAlertSubscriptionWhenEditingRule | Pass | 400 | 400 | 299 |
| TC-009 - Other workspace `projectId` | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.AddAlertSubscriptionWhenEditingRule | Fail | 400 or 403 or 404 | 200 | 309 |
| TC-010 - Other workspace `ruleId` | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.AddAlertSubscriptionWhenEditingRule | Pass | 403 | 403 | 430 |
| TC-011 - Injection payload in `triggerType` | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.AddAlertSubscriptionWhenEditingRule | Pass | 400 | 400 | 298 |
| TC-012 - Invalid Content-Type | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.AddAlertSubscriptionWhenEditingRule | Fail | 400 or 403 or 404 | 415 | 293 |
| TC-013 - Invalid JSON body | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.AddAlertSubscriptionWhenEditingRule | Pass | 400 | 400 | 295 |
| TC-014 - Invalid HTTP method | GET | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.AddAlertSubscriptionWhenEditingRule | Pass | 404 | 404 | 269 |
| TC-015 - Add alert subscription response time | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.AddAlertSubscriptionWhenEditingRule | Pass | 200 | 200 | 862 |

## API-007: KMI - HAS CHECK RULE
Test cases executed: 19

| Test Case | Method | Endpoint | Status | Expected | Actual | Time (ms) |
| --- | --- | --- | --- | --- | --- | --- |
| TC-001 - Check HasCheckAll successfully with valid data | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.HasCheckAll | Pass | 200 | 200 | 417 |
| TC-002 - Unauthorized request | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.HasCheckAll | Pass | 401 | 401 | 286 |
| TC-003 - Missing required field `projectId` | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.HasCheckAll | Pass | 404 | 404 | 311 |
| TC-004 - Missing required field `triggerType` | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.HasCheckAll | Pass | 400 | 400 | 294 |
| TC-005 - Missing required field `alertTypeIds` | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.HasCheckAll | Pass | 404 | 404 | 306 |
| TC-006 - Empty `targetIds` | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.HasCheckAll | Pass | 200 | 200 | 308 |
| TC-007 - Provide invalid `targetIds` | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.HasCheckAll | Pass | 404 | 404 | 298 |
| TC-008 - Invalid value for `targetIds` | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.HasCheckAll | Fail | 500 or 504 | 403 | 426 |
| TC-009 - Invalid format for `targetIds` | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.HasCheckAll | Pass | 404 | 404 | 299 |
| TC-010 - Invalid format for `alertTypeIds` | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.HasCheckAll | Pass | 404 | 404 | 354 |
| TC-011 - Other workspace `projectId` | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.HasCheckAll | Fail | 400 or 403 or 404 | 204 | 345 |
| TC-012 - Invalid `triggerType` value | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.HasCheckAll | Pass | 400 | 400 | 293 |
| TC-013 - Invalid data type for `triggerType` | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.HasCheckAll | Pass | 400 | 400 | 297 |
| TC-014 - Injection payload in `targetIds` | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.HasCheckAll | Pass | 404 | 404 | 314 |
| TC-015 - Injection payload in `alertTypeIds` | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.HasCheckAll | Pass | 404 | 404 | 308 |
| TC-016 - Invalid Content-Type | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.HasCheckAll | Fail | 400 or 403 or 404 | 415 | 294 |
| TC-017 - Invalid JSON body | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.HasCheckAll | Pass | 400 | 400 | 317 |
| TC-018 - Invalid HTTP method | GET | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.HasCheckAll | Pass | 404 | 404 | 270 |
| TC-019 - HasCheckAll response time | POST | https://selidasitetestapi.360awareqa.com/v2/web/odata/SERules/SE.HasCheckAll | Fail | 200 | 200 | 303 |

## Raw Newman Output (excerpt)

```text
 total run duration: 59.6s                                       

 total data received: 14.57kB (approx)                           

 average response time: 367ms [min: 268ms, max: 3s, s.d.: 257ms] 


[31m   # [39m[31m failure        [39m[31m detail                                                                                                 [39m
[90m     [39m[90m                [39m[90m                                                                                                        [39m
 01.  AssertionError  Status code matches expected                                                                           
                      expected 200 to be one of [ 400, 403, 404 ]                                                            
                      at assertion:0 in test-script                                                                          
                      inside "API-001: KMI - CHECK ALL RULE GEOFENCE-PROJECT / TC-020 - Extra unknown field in request body" 
[90m     [39m[90m                [39m[90m                                                                                                        [39m
 02.  AssertionError  Status code matches expected                                                                           
                      expected 200 to be one of [ 400, 403, 404 ]                                                            
                      at assertion:0 in test-script                                                                          
                      inside "API-002: KMI - CHECK ALL RULE POI-PROJECT / TC-020 - Extra unknown field in request body"      
[90m     [39m[90m                [39m[90m                                                                                                        [39m
 03.  AssertionError  Status code matches expected                                                                           
                      expected 200 to be one of [ 400, 403, 404 ]                                                            
                      at assertion:0 in test-script                                                                          
                      inside "API-003: KMI - CHECK ALL RULE GEOFENCE-SUBSITE / TC-020 - Extra unknown field in request body" 
[90m     [39m[90m                [39m[90m                                                                                                        [39m
 04.  AssertionError  Status code matches expected                                                                           
                      expected 200 to be one of [ 400, 403, 404 ]                                                            
                      at assertion:0 in test-script                                                                          
                      inside "API-004: KMI - CHECK ALL RULE POI-SUBSITE / TC-020 - Extra unknown field in request body"      
[90m     [39m[90m                [39m[90m                                                                                                        [39m
 05.  AssertionError  Status code matches expected                                                                           
                      expected 403 to be one of [ 404, 200 ]                                                                 
                      at assertion:0 in test-script                                                                          
                      inside "API-005: KMI - GET SUBSITE CHECK OPTIONS / TC-006 - Rule not found"                            
[90m     [39m[90m                [39m[90m                                                                                                        [39m
 06.  AssertionError  Status code matches expected                                                                           
                      expected 200 to be one of [ 400, 403, 404 ]                                                            
                      at assertion:0 in test-script                                                                          
                      inside "API-005: KMI - GET SUBSITE CHECK OPTIONS / TC-007 - Missing ruleID parameter"                  
[90m     [39m[90m                [39m[90m                                                                                                        [39m
 07.  AssertionError  Status code matches expected                                                                           
                      expected 200 to be one of [ 400, 403, 404 ]                                                            
                      at assertion:0 in test-script                                                                          
                      inside "API-005: KMI - GET SUBSITE CHECK OPTIONS / TC-010 - Injection payload in ruleID"               
[90m     [39m[90m                [39m[90m                                                                                                        [39m
 08.  AssertionError  Status code matches expected                                                                           
                      expected 200 to be one of [ 400, 403, 404 ]                                                            
                      at assertion:0 in test-script                                                                          
                      inside "API-006: KMI - ADD ALERT / TC-005 - Missing required field `projectId`"                        
[90m     [39m[90m                [39m[90m                                                                                                        [39m
 09.  AssertionError  Status code matches expected                                                                           
                      expected 200 to be one of [ 400, 403, 404 ]                                                            
                      at assertion:0 in test-script                                                                          
                      inside "API-006: KMI - ADD ALERT / TC-009 - Other workspace `projectId`"                               
[90m     [39m[90m                [39m[90m                                                                                                        [39m
 10.  AssertionError  Status code matches expected                                                                           
                      expected 415 to be one of [ 400, 403, 404 ]                                                            
                      at assertion:0 in test-script                                                                          
                      inside "API-006: KMI - ADD ALERT / TC-012 - Invalid Content-Type"                                      
[90m     [39m[90m                [39m[90m                                                                                                        [39m
 11.  AssertionError  Status code matches expected                                                                           
                      expected 403 to be one of [ 500, 504 ]                                                                 
                      at assertion:0 in test-script                                                                          
                      inside "API-007: KMI - HAS CHECK RULE / TC-008 - Invalid value for `targetIds`"                        
[90m     [39m[90m                [39m[90m                                                                                                        [39m
 12.  AssertionError  Status code matches expected                                                                           
                      expected 204 to be one of [ 400, 403, 404 ]                                                            
                      at assertion:0 in test-script                                                                          
                      inside "API-007: KMI - HAS CHECK RULE / TC-011 - Other workspace `projectId`"                          
[90m     [39m[90m                [39m[90m                                                                                                        [39m
 13.  AssertionError  Status code matches expected                                                                           
                      expected 415 to be one of [ 400, 403, 404 ]                                                            
                      at assertion:0 in test-script                                                                          
                      inside "API-007: KMI - HAS CHECK RULE / TC-016 - Invalid Content-Type"                                 
```

Full raw output: reports/newman-output.txt