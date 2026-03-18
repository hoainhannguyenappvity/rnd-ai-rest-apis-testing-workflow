# API Test Specifications

This document defines REST APIs to be tested automatically by Codex AI. Each API block is independent and includes expectations and test scenarios.

---

## API-001: TASKPLUS Reset Password - Send Mail Or SMS

### Description

Send reset-password or invite code to the target user via email or SMS.

### Request { API-001: SE.SendMailOrSMS }

- Method: POST
- URL: `{{base_url}}/v2/web/odata/SEUsers/SE.SendMailOrSMS`
- Headers:
  - Content-Type: `application/json`
  - Authorization: `{{auth_token}}`
- Params: NONE
- Body:

```json
{
    "inviteCode": {
        "userName": "thuytrangle2205@gmail.com",
        "inviteCodeType": "Mail"
    }
}
```

### Test Cases { API-001: SEND MAIL OR SMS }

| ID     | Category    | Description                         | Request Override (Method / Headers / Body)                                                                                                                              | Expected Result                    |
| ------ | ----------- | ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| TC-001 | Positive    | Send invite/reset code successfully | **Method:** POST<br>**Body:**`{ "inviteCode": { "userName":"thuytrangle2205@gmail.com", "inviteCodeType":"Mail" } }`                                         | 200/204; code sent successfully    |
| TC-002 | Negative    | Unauthorized request                | **Method:** POST<br>**Headers:** Authorization=None<br>**Body:**`{ "inviteCode": { "userName":"thuytrangle2205@gmail.com", "inviteCodeType":"Mail" } }`      | 401/403                            |
| TC-003 | Negative    | Missing required field `inviteCode` | **Method:** POST<br>**Body:**`{}`                                                                                                                                        | 400/422                            |
| TC-004 | Negative    | Missing required field `userName`   | **Method:** POST<br>**Body:**`{ "inviteCode": { "inviteCodeType":"Mail" } }`                                                                                      | 400/422                            |
| TC-005 | Negative    | Empty `userName`                    | **Method:** POST<br>**Body:**`{ "inviteCode": { "userName":"", "inviteCodeType":"Mail" } }`                                                                  | 400/422                            |
| TC-006 | Negative    | Invalid email format                | **Method:** POST<br>**Body:**`{ "inviteCode": { "userName":"thuytrangle2205gmail.com", "inviteCodeType":"Mail" } }`                                          | 400/422                            |
| TC-007 | Negative    | Invalid `inviteCodeType`            | **Method:** POST<br>**Body:**`{ "inviteCode": { "userName":"thuytrangle2205@gmail.com", "inviteCodeType":"InvalidType" } }`                                  | 400/422                            |
| TC-008 | Negative    | User does not exist                 | **Method:** POST<br>**Body:**`{ "inviteCode": { "userName":"notfound.user@gmail.com", "inviteCodeType":"Mail" } }`                                           | 400/404                            |
| TC-009 | Negative    | Invalid Content-Type                | **Method:** POST<br>**Headers:** Content-Type=text/plain<br>**Body:**`{ "inviteCode": { "userName":"thuytrangle2205@gmail.com", "inviteCodeType":"Mail" } }` | 400/415                            |
| TC-010 | Negative    | Invalid JSON body                   | **Method:** POST<br>**Body:** malformed JSON                                                                                                                            | 400                                |
| TC-011 | Negative    | Invalid HTTP method                 | **Method:** GET                                                                                                                                                         | 400/404/405                        |
| TC-012 | Security    | Injection payload in `userName`     | **Method:** POST<br>**Body:**`{ "inviteCode": { "userName":"thuytrangle2205@gmail.com OR 1=1", "inviteCodeType":"Mail" } }`                                  | 400/403/422; safely handled        |
| TC-013 | Performance | Response time under threshold       | **Method:** POST<br>**Body:**`{ "inviteCode": { "userName":"thuytrangle2205@gmail.com", "inviteCodeType":"Mail" } }`                                         | 200/204; response time < 3 seconds |


## API-002: TASKPLUS Reset Password - Verify Invite Code

### Description

Verify the invite or reset-password code for the target user.

### Request { API-002: SE.VerifyInviteCode }

- Method: GET
- URL: `{{base_url}}/v2/web/odata/SEUsers/SE.VerifyInviteCode(inviteCode='111111',userName='thuytrangle2205@gmail.com')`
- Headers:
  - Content-Type: `application/json`
  - Authorization: `{{auth_token}}`
- Params: NONE
- Body: NONE

### Test Cases { API-002: VERIFY INVITE CODE }

| ID     | Category    | Description                                           | Request Override (Method / Headers / URL)                                                                                                                                        | Expected Result                                             |
| ------ | ----------- | ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| TC-001 | Positive    | Verify invite code successfully with valid code       | **Method:** GET<br>**URL:** `{{base_url}}/v2/web/odata/SEUsers/SE.VerifyInviteCode(inviteCode='VALID_CODE',userName='thuytrangle2205@gmail.com')`                                | 200; code valid                                             |
| TC-002 | Negative    | Unauthorized request                                  | **Method:** GET<br>**Headers:** Authorization=None<br>**URL:** `{{base_url}}/v2/web/odata/SEUsers/SE.VerifyInviteCode(inviteCode='111111',userName='thuytrangle2205@gmail.com')` | 401/403                                                     |
| TC-003 | Negative    | Invalid invite code                                   | **Method:** GET<br>**URL:** `{{base_url}}/v2/web/odata/SEUsers/SE.VerifyInviteCode(inviteCode='ddd',userName='thuytrangle2205@gmail.com')`                                       | 400/404/422; invalid code                                   |
| TC-004 | Negative    | Empty invite code                                     | **Method:** GET<br>**URL:** `{{base_url}}/v2/web/odata/SEUsers/SE.VerifyInviteCode(inviteCode='',userName='thuytrangle2205@gmail.com')`                                          | 400/422                                                     |
| TC-005 | Negative    | Invalid userName format                               | **Method:** GET<br>**URL:** `{{base_url}}/v2/web/odata/SEUsers/SE.VerifyInviteCode(inviteCode='111111',userName='invalid-email')`                                                | 400/422                                                     |
| TC-006 | Negative    | User does not exist                                   | **Method:** GET<br>**URL:** `{{base_url}}/v2/web/odata/SEUsers/SE.VerifyInviteCode(inviteCode='111111',userName='notfound.user@gmail.com')`                                      | 400/404                                                     |
| TC-007 | Negative    | Invalid HTTP method                                   | **Method:** POST<br>**URL:** `{{base_url}}/v2/web/odata/SEUsers/SE.VerifyInviteCode(inviteCode='111111',userName='thuytrangle2205@gmail.com')`                                   | 400/404/405                                                 |
| TC-008 | Security    | Injection payload in `inviteCode`                     | **Method:** GET<br>**URL:** `{{base_url}}/v2/web/odata/SEUsers/SE.VerifyInviteCode(inviteCode='111111 OR 1=1',userName='thuytrangle2205@gmail.com')`                             | 400/403/422; safely handled                                 |
| TC-009 | Security    | Injection payload in `userName`                       | **Method:** GET<br>**URL:** `{{base_url}}/v2/web/odata/SEUsers/SE.VerifyInviteCode(inviteCode='111111',userName='thuytrangle2205@gmail.com OR 1=1')`                             | 400/403/422; safely handled                                 |
| TC-010 | Performance | Response time under threshold                         | **Method:** GET<br>**URL:** `{{base_url}}/v2/web/odata/SEUsers/SE.VerifyInviteCode(inviteCode='111111',userName='thuytrangle2205@gmail.com')`                                    | 200/400/404; response time < 3 seconds                      |
| TC-011 | Business    | Reuse previously verified code                        | **Method:** GET<br>**URL:** `{{base_url}}/v2/web/odata/SEUsers/SE.VerifyInviteCode(inviteCode='USED_CODE',userName='thuytrangle2205@gmail.com')`                                 | 400/409/422; used code cannot be reused                     |
| TC-012 | Business    | Verify expired code after 1 minute                    | **Method:** GET<br>**URL:** `{{base_url}}/v2/web/odata/SEUsers/SE.VerifyInviteCode(inviteCode='EXPIRED_CODE',userName='thuytrangle2205@gmail.com')`                              | 400/410/422; expired code rejected                          |
| TC-013 | Business    | Verify 5 wrong codes within 1 minute                  | **Method:** GET<br>**URL:** `{{base_url}}/v2/web/odata/SEUsers/SE.VerifyInviteCode(inviteCode='111111',userName='thuytrangle2205@gmail.com')`                                    | 400/404/422 each attempt; invalid code consistently handled |
| TC-014 | Business    | Verify correct code after 4 wrong attempts            | **Method:** GET<br>**URL:** `{{base_url}}/v2/web/odata/SEUsers/SE.VerifyInviteCode(inviteCode='VALID_CODE',userName='thuytrangle2205@gmail.com')`                                | 200 if still valid and attempts are below lock threshold    |
| TC-015 | Business    | Verify correct code on the 5th attempt after 1 minute | **Method:** GET<br>**URL:** `{{base_url}}/v2/web/odata/SEUsers/SE.VerifyInviteCode(inviteCode='VALID_CODE',userName='thuytrangle2205@gmail.com')`                                | 400/410/422; expired code rejected                          |


## API-003: TASKPLUS Reset Password - Endurance Validation for Invite Code

### Description

Business flow to validate code expiry and repeated verification attempts within a 1-minute window.

### Request { API-003: SEND + VERIFY FLOW }

- Method: POST + GET
- URL: `{{base_url}}/v2/web/odata/SEUsers/SE.SendMailOrSMS` then `{{base_url}}/v2/web/odata/SEUsers/SE.VerifyInviteCode(inviteCode='CODE',userName='thuytrangle2205@gmail.com')`
- Headers:
  - Content-Type: `application/json`
  - Authorization: `{{auth_token}}`
- Params: NONE
- Body:

```json
{
    "inviteCode": {
        "userName": "thuytrangle2205@gmail.com",
        "inviteCodeType": "Mail"
    }
}
```

### Test Cases { API-003: ENDURANCE / EXPIRED CODE FLOW }

| ID     | Category | Description                                                              | Request Override (Method / Headers / Body) | Expected Result                                                           |
| ------ | -------- | ------------------------------------------------------------------------ | ------------------------------------------ | ------------------------------------------------------------------------- |
| TC-001 | Business | Send new code then verify 5 wrong codes within 1 minute                  | **Method:** POST then GET x5               | Send request succeeds; each wrong code is rejected; no server error       |
| TC-002 | Business | Send new code then verify correct code after 61 seconds                  | **Method:** POST then wait 61s then GET    | 400/410/422; code expired                                                 |
| TC-003 | Business | Send new code then verify 4 wrong codes and 1 correct code before expiry | **Method:** POST then GET x5 within 60s    | Wrong codes rejected; correct code accepted if not expired and not locked |
| TC-004 | Business | Send new code then verify wrong code repeatedly until lock threshold     | **Method:** POST then GET multiple times   | 400/403/409/422; lockout or max-attempt rule enforced                     |
| TC-005 | Business | Send new code twice and verify old code                                  | **Method:** POST twice then GET old code   | 400/409/410/422; old code invalid after new code is issued                |
