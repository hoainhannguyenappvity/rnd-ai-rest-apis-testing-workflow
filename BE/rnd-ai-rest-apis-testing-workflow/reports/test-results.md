# Test Results

Generated: 2025-12-23T08:06:46.172Z

Environment variables loaded: all present

## APIs
### API-001 - Ping Service

| Test ID | Type | Request | Expected | Actual | Status | Executed At |
| --- | --- | --- | --- | --- | --- | --- |
| TC-001 | Positive | POST http://localhost:3000/ping<br>Headers: {"Content-Type":"application/json"} | Status 200-299 | Status 200 | Body: {"success":true,"data":"pong"} | ✅ PASS | 2025-12-23T08:06:42.448Z |
| TC-002 | Negative | GET http://localhost:3000/ping<br>Headers: {"Content-Type":"application/json"} | Status 405 | Status 404 (expected 405) | Body: <!DOCTYPE html> <html lang="en"> <head> <meta charset="utf-8"> <title>Error</title> </head> <body> <pre>Cannot GET /ping</pre> </body> </html>  | ❌ FAIL | 2025-12-23T08:06:42.516Z |
| TC-003 | Negative | POST http://localhost:3000/pong<br>Headers: {"Content-Type":"application/json"} | Status 404 | Status 404 | Body: <!DOCTYPE html> <html lang="en"> <head> <meta charset="utf-8"> <title>Error</title> </head> <body> <pre>Cannot POST /pong</pre> </body> </html>  | ✅ PASS | 2025-12-23T08:06:42.521Z |
| TC-004 | Edge | POST http://localhost:3000/ping<br>Headers: {"Content-Type":"application/json"} | Timeout after 5000ms | Status 200 (response received, timeout expected) | Body: {"success":true,"data":"pong"} | ❌ FAIL | 2025-12-23T08:06:42.524Z |

### API-002 - Get List Users

| Test ID | Type | Request | Expected | Actual | Status | Executed At |
| --- | --- | --- | --- | --- | --- | --- |
| TC-001 | Positive | GET https://autotesting.360awareqa.com/v2/web/odata/SEPAOrgs/SE.GetUsers<br>Headers: {"Content-Type":"application/json","Authorization":"Bearer eyJ..."} | Status 200-299 | Status 200 | Body: {"@odata.context":"https://autotesting.360awareqa.com/v2/web/odata/$metadata#SEGetUsers","value":[{"id":1063,"username":"ptanh.iuh@gmail.com","isSuper":0,"offset":-5,"lastLogin":"2025-12-23T06:45:20.783Z","mapType":1,"dateFormat":1,"timeFor | ✅ PASS | 2025-12-23T08:06:42.528Z |
| TC-002 | Negative | POST https://autotesting.360awareqa.com/v2/web/odata/SEPAOrgs/SE.GetUsers<br>Headers: {"Content-Type":"application/json","Authorization":"Bearer eyJ..."} | Status 405 | Status 405 | ✅ PASS | 2025-12-23T08:06:43.306Z |
| TC-003 | Negative | GET https://autotesting.360awareqa.com/v2/web/odata/SEPAOrgs/SE.GetUsersXXX<br>Headers: {"Content-Type":"application/json","Authorization":"Bearer eyJ..."} | Status 404 | Status 404 | ✅ PASS | 2025-12-23T08:06:44.030Z |
| TC-004 | Edge | GET https://autotesting.360awareqa.com/v2/web/odata/SEPAOrgs/SE.GetUsers<br>Headers: {"Content-Type":"application/json","Authorization":"Bearer eyJ..."} | Timeout after 5000ms | Status 200 (response received, timeout expected) | Body: {"@odata.context":"https://autotesting.360awareqa.com/v2/web/odata/$metadata#SEGetUsers","value":[{"id":1063,"username":"ptanh.iuh@gmail.com","isSuper":0,"offset":-5,"lastLogin":"2025-12-23T06:45:20.783Z","mapType":1,"dateFormat":1,"timeFor | ❌ FAIL | 2025-12-23T08:06:44.275Z |

### API-003 - Create Site

| Test ID | Type | Request | Expected | Actual | Status | Executed At |
| --- | --- | --- | --- | --- | --- | --- |
| TC-001 | Positive | POST https://autotesting.360awareqa.com/v2/web/odata/SESites<br>Headers: {"Content-Type":"application/json","Authorization":"Bearer eyJ..."}<br>Body: {"name":"Site - Create By Codex 1766477202448","description":""} | Status 200-299 | Status 200 | Body: {"@odata.context":"https://autotesting.360awareqa.com/v2/web/odata/$metadata#SESites/$entity","id":16818,"name":"Site - Create By Codex 1766477202448","passwordStrength":"VeryStrong","dataExpiry":180,"offset":0,"organizationLogoId":1,"urlEx | ✅ PASS | 2025-12-23T08:06:44.563Z |
| TC-002 | Negative | GET https://autotesting.360awareqa.com/v2/web/odata/SESites<br>Headers: {"Content-Type":"application/json","Authorization":"Bearer eyJ..."} | Status 405 | Status 200 (expected 405) | Body: {"@odata.context":"https://autotesting.360awareqa.com/v2/web/odata/$metadata#SESites","value":[{"id":16817,"name":"Site - Create By Codex","passwordStrength":"VeryStrong","dataExpiry":180,"offset":0,"organizationLogoId":1,"urlExpiration":14 | ❌ FAIL | 2025-12-23T08:06:45.184Z |
| TC-003 | Negative | POST https://autotesting.360awareqa.com/v2/web/odata/SESitesXXX<br>Headers: {"Content-Type":"application/json","Authorization":"Bearer eyJ..."}<br>Body: {"name":"Site - Create By Codex 1766477202448-invalid","description":""} | Status 404 | Status 405 (expected 404) | ❌ FAIL | 2025-12-23T08:06:45.453Z |
| TC-004 | Edge | POST https://autotesting.360awareqa.com/v2/web/odata/SESites<br>Headers: {"Content-Type":"application/json","Authorization":"Bearer eyJ..."}<br>Body: {"name":"Site - Create By Codex 1766477202448-timeout","description":""} | Timeout after 5000ms | Status 200 (response received, timeout expected) | Body: {"@odata.context":"https://autotesting.360awareqa.com/v2/web/odata/$metadata#SESites/$entity","id":16819,"name":"Site - Create By Codex 1766477202448-timeout","passwordStrength":"VeryStrong","dataExpiry":180,"offset":0,"organizationLogoId": | ❌ FAIL | 2025-12-23T08:06:45.692Z |
