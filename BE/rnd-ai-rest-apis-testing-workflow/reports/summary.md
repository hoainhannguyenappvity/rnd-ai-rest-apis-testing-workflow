# Test Summary

Generated: 2025-12-23T08:06:46.172Z

APIs tested: 3
Total test cases: 12
Passed: 6
Failed: 6
Warnings: 0
Skipped: 0

## Key Issues
- API-001/TC-002: Status 404 (expected 405) | Body: <!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Error</title>
</head>
<body>
<pre>Cannot GET /ping</pre>
</body>
</html>

- API-001/TC-004: Status 200 (response received, timeout expected) | Body: {"success":true,"data":"pong"}
- API-002/TC-004: Status 200 (response received, timeout expected) | Body: {"@odata.context":"https://autotesting.360awareqa.com/v2/web/odata/$metadata#SEGetUsers","value":[{"id":1063,"username":"ptanh.iuh@gmail.com","isSuper":0,"offset":-5,"lastLogin":"2025-12-23T06:45:20.783Z","mapType":1,"dateFormat":1,"timeFor
- API-003/TC-002: Status 200 (expected 405) | Body: {"@odata.context":"https://autotesting.360awareqa.com/v2/web/odata/$metadata#SESites","value":[{"id":16817,"name":"Site - Create By Codex","passwordStrength":"VeryStrong","dataExpiry":180,"offset":0,"organizationLogoId":1,"urlExpiration":14
- API-003/TC-003: Status 405 (expected 404)
- API-003/TC-004: Status 200 (response received, timeout expected) | Body: {"@odata.context":"https://autotesting.360awareqa.com/v2/web/odata/$metadata#SESites/$entity","id":16819,"name":"Site - Create By Codex 1766477202448-timeout","passwordStrength":"VeryStrong","dataExpiry":180,"offset":0,"organizationLogoId":