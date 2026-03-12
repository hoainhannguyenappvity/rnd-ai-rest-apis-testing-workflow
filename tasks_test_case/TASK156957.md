# API Test Specifications

This document defines REST APIs to be tested automatically by Codex AI. Each API block is independent and includes expectations and test scenarios.

---

## API-001: Task 156957: GET Tags

### Description

### Request { API-001: GET TAG }

- Method: GET
- URL: `{{base_url}}/v2/web/odata/SETags`
- Headers:
  - Content-Type: `application/json`
  - Authorization: `{{auth_token}}`
- Params: 
  - $count: 
  - $orderby: 
  - $filter: 
- Body: NONE
  
### Test Cases { API-001: GET TAG }

| ID     | Category | Description                        | Request Override (Method / Headers / Params / Body)               | Expected Result                |
| ------ | -------- | ---------------------------------- | ----------------------------------------------------------------- | ------------------------------ |
| TC-001 | Positive | Get file tags successfully         | **Method:** GET                                                   | 200; tag list returned         |
| TC-002 | Positive | Filter active file tags            | **Method:** GET<br>**Params:** `$filter=active ne false`          | 200; only active file tags     |
| TC-003 | Positive | Order tags by name ascending       | **Method:** GET<br>**Params:** `$orderby=name asc`                | 200; tags sorted by name ASC   |
| TC-004 | Positive | Include total count                | **Method:** GET<br>**Params:** `$count=true`                      | 200; total count included      |
| TC-005 | Positive | Pagination with `$top` and `$skip` | **Method:** GET<br>**Params:** `$top=10`, `$skip=0`               | 200; paginated result returned |
| TC-006 | Negative | Unauthorized request               | **Method:** GET<br>**Headers:** Authorization=None                | 401                            |
| TC-007 | Negative | Invalid filter syntax              | **Method:** GET<br>**Params:** `$filter=active !== false`         | 400/500; validation error      |
| TC-008 | Security | Injection payload in filter        | **Method:** GET<br>**Params:** `$filter=tagType eq 'file' OR 1=1` | 400/403/500; safely handled    |

## API-002: Task 156957: ADD ENTITY TAG

### Description

### Request { API-002: ADD ENTITY TAG }

- Method: POST
- URL: `{{base_url}}/v2/web/odata/SEEntityTag/SE.AddEntityTag`
- Headers:
  - Content-Type: `application/json`
  - Authorization: `{{auth_token}}`
- Params: NONE
- Body:

```json
{
    "addEntityTagPara": {
        "idsEntityAndCode": "18214~1",
        "idsTag": "1321",
        "entityType": "file"
    }
}
```
  
### Test Cases { API-002: ADD ENTITY TAG }

| ID     | Category | Description                                 | Request Override (Method / Headers / Body)                                                                                                                            | Expected Result |
| ------ | -------- | ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| TC-001 | Positive | Add entity tag successfully with valid data | **Method:** POST<br>**Body:**`{ "addEntityTagPara": { "idsEntityAndCode":"18214~1", "idsTag":"1321", "entityType":"file" } }`                                         | 200/204         |
| TC-002 | Negative | Unauthorized request                        | **Method:** POST<br>**Headers:** Authorization=None<br>**Body:**`{ "addEntityTagPara": { "idsEntityAndCode":"18214~1", "idsTag":"1321", "entityType":"file" } }`      | 401             |
| TC-003 | Negative | Missing required field `idsEntityAndCode`   | **Method:** POST<br>**Body:**`{ "addEntityTagPara": { "idsTag":"1321", "entityType":"file" } }`                                                                       | 500             |
| TC-004 | Negative | Missing required field `idsTag`             | **Method:** POST<br>**Body:**`{ "addEntityTagPara": { "idsEntityAndCode":"18214~1", "entityType":"file" } }`                                                          | 400             |
| TC-005 | Negative | Invalid format for `idsEntityAndCode`       | **Method:** POST<br>**Body:**`{ "addEntityTagPara": { "idsEntityAndCode":"18214-1", "idsTag":"1321", "entityType":"file" } }`                                         | 400/404         |
| TC-006 | Negative | Entity ID from other workspace/site         | **Method:** POST<br>**Body:**`{ "addEntityTagPara": { "idsEntityAndCode":"20397~0", "idsTag":"1321", "entityType":"file" } }`                                         | 400/403/404     |
| TC-007 | Negative | Tag ID from other workspace/site            | **Method:** POST<br>**Body:**`{ "addEntityTagPara": { "idsEntityAndCode":"18214~1", "idsTag":"1326", "entityType":"file" } }`                                         | 400/403/404     |
| TC-008 | Negative | Invalid Content-Type                        | **Method:** POST<br>**Headers:** Content-Type=text/plain<br>**Body:**`{ "addEntityTagPara": { "idsEntityAndCode":"18214~1", "idsTag":"1321", "entityType":"file" } }` | 400/405         |
| TC-09  | Negative | Invalid JSON body                           | **Method:** POST<br>**Body:** malformed JSON                                                                                                                          | 400             |
| TC-010 | Negative | Invalid HTTP method                         | **Method:** GET                                                                                                                                                       | 400/404         |


## API-003: Task 156957: GET ENTITY TAG

### Description

### Request { API-003: GET ENTITY TAG  }

- Method: GET
- URL: `{{base_url}}/v2/web/odata/SEEntityTag/SE.GetEntityTag(entityId=18214,entityCode=1,entityType='file')`
- Headers:
  - Content-Type: `application/json`
  - Authorization: `{{auth_token}}`
- Params: NONE
- Body: NONE
  
### Test Cases { API-003: GET ENTITY TAG }

| ID     | Category | Description                                 | Request Override (Method / Headers / Body)                                                                                                                            | Expected Result |
| ------ | -------- | ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| TC-001 | Positive | Get entity tag successfully with valid data | **Method:** GET<br>**URL:** `{{base_url}}/v2/web/odata/SEEntityTag/SE.GetEntityTag(entityId=18214,entityCode=1,entityType='file')`                                    | 200             |
| TC-002 | Negative | Unauthorized request                        | **Method:** GET<br>**Headers:** Authorization=None<br>**URL:** `{{base_url}}/v2/web/odata/SEEntityTag/SE.GetEntityTag(entityId=18214,entityCode=1,entityType='file')` | 401             |
| TC-003 | Negative | Missing required parameter `entityId`       | **Method:** GET<br>**URL:** `{{base_url}}/v2/web/odata/SEEntityTag/SE.GetEntityTag(entityCode=1,entityType='file')`                                                   | 400/404         |
| TC-004 | Negative | Missing required parameter `entityCode`     | **Method:** GET<br>**URL:** `{{base_url}}/v2/web/odata/SEEntityTag/SE.GetEntityTag(entityId=18214,entityType='file')`                                                 | 400/404         |
| TC-005 | Negative | Missing required parameter `entityType`     | **Method:** GET<br>**URL:** `{{base_url}}/v2/web/odata/SEEntityTag/SE.GetEntityTag(entityId=18214,entityCode=1)`                                                      | 400/404         |
| TC-006 | Negative | Invalid format for `entityId`               | **Method:** GET<br>**URL:** `{{base_url}}/v2/web/odata/SEEntityTag/SE.GetEntityTag(entityId='abc',entityCode=1,entityType='file')`                                    | 400/404         |
| TC-007 | Negative | Invalid value for `entityCode`              | **Method:** GET<br>**URL:** `{{base_url}}/v2/web/odata/SEEntityTag/SE.GetEntityTag(entityId=18214,entityCode='xyz',entityType='file')`                                | 400/404         |
| TC-008 | Negative | Invalid value for `entityType`              | **Method:** GET<br>**URL:** `{{base_url}}/v2/web/odata/SEEntityTag/SE.GetEntityTag(entityId=18214,entityCode=1,entityType='invalidType')`                             | 400/404         |
| TC-009 | Negative | Entity ID does not exist                    | **Method:** GET<br>**URL:** `{{base_url}}/v2/web/odata/SEEntityTag/SE.GetEntityTag(entityId=999999,entityCode=1,entityType='file')`                                   | 404             |
| TC-010 | Negative | Entity belongs to another workspace/site    | **Method:** GET<br>**URL:** `{{base_url}}/v2/web/odata/SEEntityTag/SE.GetEntityTag(entityId=888888,entityCode=1,entityType='file')`                                   | 403/404         |
| TC-011 | Negative | Invalid HTTP method                         | **Method:** POST<br>**URL:** `{{base_url}}/v2/web/odata/SEEntityTag/SE.GetEntityTag(entityId=18214,entityCode=1,entityType='file')`_                                  | 405             |




