# API Test Specifications

This document defines REST APIs to be tested automatically by Codex AI.
Each API block is independent and includes expectations and test scenarios.

---

## API-001: Ping Service

### Description

Health check endpoint to verify the service is running.

### Request

- **Method:** POST
- **URL:** localhost:3000/ping
- **Headers:**
  - Content-Type: application/json
- **Authentication:** None
- **Body:** None

### Expectations

- **Status Code:** 2xx
- **Response Body:** Optional

### Test Cases

| ID     | Type     | Description              | Expected           |
| ------ | -------- | ------------------------ | ------------------ |
| TC-001 | Positive | Valid POST               | Status: 200-299    |
| TC-002 | Negative | Invalid method (GET)     | Status: 405        |
| TC-003 | Negative | Invalid endpoint (/pong) | Status: 404        |
| TC-004 | Edge     | Request timeout          | Error after 5000ms |

---

---

## API-002: Get Users Service

### Description

Get KMI Users

### Request

- **Method:** GET
- **URL:** https://autotesting.360awareqa.com/v2/web/odata/SEPAOrgs/SE.GetUsers
- **Headers:**
  - Content-Type: application/json
  - Authorization: "Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYmYiOjE3NjY0NTc5MzcsImV4cCI6MTc2NjQ2MTUzNywiaXNzIjoiaHR0cHM6Ly9zZS5rbm93bWFkaWNzLmNvbS8iLCJjbGllbnRfaWQiOiJqcyIsInN1YiI6InB0YW5oLml1aEBnbWFpbC5jb20iLCJhdXRoX3RpbWUiOjE3NjY0NTc5MzYsImlkcCI6ImxvY2FsIiwiaWQiOiIxMDYzIiwiaHR0cDovL3NjaGVtYXMua25vd21hZGljcy5jb20vU2lsdmVyRXllLzIwMTcvMDEvaWRlbnRpdHkvY2xhaW1zL3NzaWQiOiJFRjBGODRGMS1BRTM3LTQ4MDEtQjk2RS02MTZERDcwRDA2ODYiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL2FjY2Vzc2NvbnRyb2xzZXJ2aWNlLzIwMTAvMDcvY2xhaW1zL2lkZW50aXR5cHJvdmlkZXIiOiJMT0NBTCBBVVRIT1JJVFkiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEwNjMiLCJuYW1laWQiOiIxMDYzIiwiaHR0cDovL3NjaGVtYXMua25vd21hZGljcy5jb20vU2lsdmVyRXllLzIwMTcvMDEvaWRlbnRpdHkvY2xhaW1zL29yZ2FuaXphdGlvbklkIjoiMTY4MDYiLCJodHRwOi8vc2NoZW1hcy5rbm93bWFkaWNzLmNvbS9TaWx2ZXJFeWUvMjAxNy8wMS9pZGVudGl0eS9jbGFpbXMvdXNlckdyb3VwSWQiOiIwIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvdXBuIjoicHRhbmguaXVoQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJBbmggUGhhbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InB0YW5oLml1aEBnbWFpbC5jb20iLCJodHRwOi8vc2NoZW1hcy5rbm93bWFkaWNzLmNvbS9TaWx2ZXJFeWUvMjAxNy8wMS9pZGVudGl0eS9jbGFpbXMvaXNTdXBlckFkbWluIjoiVHJ1ZSIsImh0dHA6Ly9zY2hlbWFzLmtub3dtYWRpY3MuY29tL1NpbHZlckV5ZS8yMDE3LzAxL2lkZW50aXR5L2NsYWltcy9jdXJyZW50RnVsbERvbWFpbiI6Imh0dHBzOi8vYXV0b3Rlc3RpbmcuMzYwYXdhcmVxYS5jb20iLCJodHRwOi8vc2NoZW1hcy5rbm93bWFkaWNzLmNvbS9TaWx2ZXJFeWUvMjAxNy8wMS9pZGVudGl0eS9jbGFpbXMvY3VycmVudE9yZ2FuaXphdGlvbklEIjoiMTY4MDYiLCJodHRwOi8vc2NoZW1hcy5rbm93bWFkaWNzLmNvbS9TaWx2ZXJFeWUvMjAxNy8wMS9pZGVudGl0eS9jbGFpbXMvYXBwSWQiOiIxIiwiaHR0cDovL3NjaGVtYXMua25vd21hZGljcy5jb20vU2lsdmVyRXllLzIwMTcvMDEvaWRlbnRpdHkvY2xhaW1zL2FwcENvZGUiOiIzNjAtYXdhcmUtd2ViIiwiaHR0cDovL3NjaGVtYXMua25vd21hZGljcy5jb20vU2lsdmVyRXllLzIwMTcvMDEvaWRlbnRpdHkvY2xhaW1zL3pvbmUiOiJFYXN0ZXJuIFN0YW5kYXJkIFRpbWUiLCJodHRwOi8vc2NoZW1hcy5rbm93bWFkaWNzLmNvbS9TaWx2ZXJFeWUvMjAxNy8wMS9pZGVudGl0eS9jbGFpbXMvYXV0b1N5bmMiOiIwIiwiaHR0cDovL3NjaGVtYXMua25vd21hZGljcy5jb20vU2lsdmVyRXllLzIwMTcvMDEvaWRlbnRpdHkvY2xhaW1zL2ZpcnN0VGltZUxvZ2luIjoidHJ1ZSIsImh0dHA6Ly9zY2hlbWFzLmtub3dtYWRpY3MuY29tL1NpbHZlckV5ZS8yMDE3LzAxL2lkZW50aXR5L2NsYWltcy9hbGxvd0FkanVzdCI6IjEiLCJodHRwOi8vc2NoZW1hcy5rbm93bWFkaWNzLmNvbS9TaWx2ZXJFeWUvMjAxNy8wMS9pZGVudGl0eS9jbGFpbXMvZGF0ZUZvcm1hdCI6Ik1NL2RkL3l5eXkiLCJodHRwOi8vc2NoZW1hcy5rbm93bWFkaWNzLmNvbS9TaWx2ZXJFeWUvMjAxNy8wMS9pZGVudGl0eS9jbGFpbXMvZGF0ZUZvcm1hdElkIjoiMSIsImh0dHA6Ly9zY2hlbWFzLmtub3dtYWRpY3MuY29tL1NpbHZlckV5ZS8yMDE3LzAxL2lkZW50aXR5L2NsYWltcy90aW1lRm9ybWF0IjoiaDptbTpzcyB0dCIsImh0dHA6Ly9zY2hlbWFzLmtub3dtYWRpY3MuY29tL1NpbHZlckV5ZS8yMDE3LzAxL2lkZW50aXR5L2NsYWltcy90aW1lRm9ybWF0SWQiOiIzIiwiaHR0cDovL3NjaGVtYXMua25vd21hZGljcy5jb20vU2lsdmVyRXllLzIwMTcvMDEvaWRlbnRpdHkvY2xhaW1zL2xvY2F0aW9uRm9ybWF0IjoiVVRNIiwiaHR0cDovL3NjaGVtYXMua25vd21hZGljcy5jb20vU2lsdmVyRXllLzIwMTcvMDEvaWRlbnRpdHkvY2xhaW1zL2xvY2F0aW9uRm9ybWF0SWQiOiI0IiwiaHR0cDovL3NjaGVtYXMua25vd21hZGljcy5jb20vU2lsdmVyRXllLzIwMTcvMDEvaWRlbnRpdHkvY2xhaW1zL3VuaXRPZk1lYXN1cmVtZW50IjoiS25vdHMiLCJodHRwOi8vc2NoZW1hcy5rbm93bWFkaWNzLmNvbS9TaWx2ZXJFeWUvMjAxNy8wMS9pZGVudGl0eS9jbGFpbXMvdW5pdE9mTWVhc3VyZW1lbnRJZCI6IjMiLCJodHRwOi8vc2NoZW1hcy5rbm93bWFkaWNzLmNvbS9TaWx2ZXJFeWUvMjAxNy8wMS9pZGVudGl0eS9jbGFpbXMvb2Zmc2V0IjoiLTUuMDAiLCJsYW5ndWFnZUlkIjoiMjMiLCJqdGkiOiI4ODhDQ0JGQUE3OTBFNTYyQ0UzQkZBNEEwN0ZCNjRGRSIsInNpZCI6IkNDODZCQjM4NTEzM0VENDUxN0M5RTVFMjRGMEY3NDk4IiwiaWF0IjoxNzY2NDU3OTM3LCJzY29wZSI6WyJvcGVuaWQiLCJwcm9maWxlIiwib2ZmbGluZV9hY2Nlc3MiXSwiYW1yIjpbInB3ZCJdfQ.Z_0s0NmDnTHUnP6S6oUSqcIz_ZUg06_vrcLPKIUAie1x9vtwSf22__ZzeNnsKGoneyRPb72cATgbGstFLkWAAgXJnD66jrY04pIVn_jkdxoR4I3toQUgn_aWI3B79qj_ZvfSjot-9P9EiO0zh5Hi_kYwJRLybsI1NZ88UbVs_5vuhEPWwBDUOqz0ROQnA7RcR82ggfry6cDNuB9omanMHRZBrMfZDDp4TzaFu9rImsCvLbL6y2eY7HTiytl5DGp52jv7RK_BLzXVLi8uR4fZycJQl9jT23Q3YBI-e2FZGewueeDrFl_kPAuHLi3o_pv2AXILtyUQFr2PbL1Vl0qMGA"
- **Authentication:** None
- **Body:** None

### Expectations

- **Status Code:** 2xx
- **Response Body:** Optional

### Test Cases

| ID     | Type     | Description              | Expected           |
| ------ | -------- | ------------------------ | ------------------ |
| TC-001 | Positive | Valid GET                | Status: 200-299    |
| TC-002 | Negative | Invalid method (GET)     | Status: 405        |
| TC-003 | Negative | Invalid endpoint (/pong) | Status: 404        |
| TC-004 | Edge     | Request timeout          | Error after 5000ms |

---
