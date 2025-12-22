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

| ID     | Type     | Description          | Expected                        |
|--------|----------|----------------------|---------------------------------|
| TC-001 | Positive | Valid POST request   | Status code is in range 200–299 |
| TC-002 | Negative | Invalid method (GET) | Status code is not 2xx          |

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
  - Authorization: "Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYmYiOjE3NjYzOTU1NTgsImV4cCI6MTc2NjM5OTE1OCwiaXNzIjoiaHR0cHM6Ly9zZS5rbm93bWFkaWNzLmNvbS8iLCJjbGllbnRfaWQiOiJqcyIsInN1YiI6InB0YW5oLml1aEBnbWFpbC5jb20iLCJhdXRoX3RpbWUiOjE3NjYzODIwMjQsImlkcCI6ImxvY2FsIiwiaWQiOiIxMDYzIiwiaHR0cDovL3NjaGVtYXMua25vd21hZGljcy5jb20vU2lsdmVyRXllLzIwMTcvMDEvaWRlbnRpdHkvY2xhaW1zL3NzaWQiOiI2REYyQ0Y2QS03NjU0LTQzQjktODQ4RS04Rjc2ODE0NjA2NkQiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL2FjY2Vzc2NvbnRyb2xzZXJ2aWNlLzIwMTAvMDcvY2xhaW1zL2lkZW50aXR5cHJvdmlkZXIiOiJMT0NBTCBBVVRIT1JJVFkiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEwNjMiLCJuYW1laWQiOiIxMDYzIiwiaHR0cDovL3NjaGVtYXMua25vd21hZGljcy5jb20vU2lsdmVyRXllLzIwMTcvMDEvaWRlbnRpdHkvY2xhaW1zL29yZ2FuaXphdGlvbklkIjoiMTY4MDYiLCJodHRwOi8vc2NoZW1hcy5rbm93bWFkaWNzLmNvbS9TaWx2ZXJFeWUvMjAxNy8wMS9pZGVudGl0eS9jbGFpbXMvdXNlckdyb3VwSWQiOiIwIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvdXBuIjoicHRhbmguaXVoQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJBbmggUGhhbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InB0YW5oLml1aEBnbWFpbC5jb20iLCJodHRwOi8vc2NoZW1hcy5rbm93bWFkaWNzLmNvbS9TaWx2ZXJFeWUvMjAxNy8wMS9pZGVudGl0eS9jbGFpbXMvaXNTdXBlckFkbWluIjoiVHJ1ZSIsImh0dHA6Ly9zY2hlbWFzLmtub3dtYWRpY3MuY29tL1NpbHZlckV5ZS8yMDE3LzAxL2lkZW50aXR5L2NsYWltcy9jdXJyZW50RnVsbERvbWFpbiI6Imh0dHBzOi8vYXV0b3Rlc3RpbmcuMzYwYXdhcmVxYS5jb20iLCJodHRwOi8vc2NoZW1hcy5rbm93bWFkaWNzLmNvbS9TaWx2ZXJFeWUvMjAxNy8wMS9pZGVudGl0eS9jbGFpbXMvY3VycmVudE9yZ2FuaXphdGlvbklEIjoiMTY4MDYiLCJodHRwOi8vc2NoZW1hcy5rbm93bWFkaWNzLmNvbS9TaWx2ZXJFeWUvMjAxNy8wMS9pZGVudGl0eS9jbGFpbXMvYXBwSWQiOiIxIiwiaHR0cDovL3NjaGVtYXMua25vd21hZGljcy5jb20vU2lsdmVyRXllLzIwMTcvMDEvaWRlbnRpdHkvY2xhaW1zL2FwcENvZGUiOiIzNjAtYXdhcmUtd2ViIiwiaHR0cDovL3NjaGVtYXMua25vd21hZGljcy5jb20vU2lsdmVyRXllLzIwMTcvMDEvaWRlbnRpdHkvY2xhaW1zL3pvbmUiOiJFYXN0ZXJuIFN0YW5kYXJkIFRpbWUiLCJodHRwOi8vc2NoZW1hcy5rbm93bWFkaWNzLmNvbS9TaWx2ZXJFeWUvMjAxNy8wMS9pZGVudGl0eS9jbGFpbXMvYXV0b1N5bmMiOiIwIiwiaHR0cDovL3NjaGVtYXMua25vd21hZGljcy5jb20vU2lsdmVyRXllLzIwMTcvMDEvaWRlbnRpdHkvY2xhaW1zL2ZpcnN0VGltZUxvZ2luIjoidHJ1ZSIsImh0dHA6Ly9zY2hlbWFzLmtub3dtYWRpY3MuY29tL1NpbHZlckV5ZS8yMDE3LzAxL2lkZW50aXR5L2NsYWltcy9hbGxvd0FkanVzdCI6IjEiLCJodHRwOi8vc2NoZW1hcy5rbm93bWFkaWNzLmNvbS9TaWx2ZXJFeWUvMjAxNy8wMS9pZGVudGl0eS9jbGFpbXMvZGF0ZUZvcm1hdCI6Ik1NL2RkL3l5eXkiLCJodHRwOi8vc2NoZW1hcy5rbm93bWFkaWNzLmNvbS9TaWx2ZXJFeWUvMjAxNy8wMS9pZGVudGl0eS9jbGFpbXMvZGF0ZUZvcm1hdElkIjoiMSIsImh0dHA6Ly9zY2hlbWFzLmtub3dtYWRpY3MuY29tL1NpbHZlckV5ZS8yMDE3LzAxL2lkZW50aXR5L2NsYWltcy90aW1lRm9ybWF0IjoiaDptbTpzcyB0dCIsImh0dHA6Ly9zY2hlbWFzLmtub3dtYWRpY3MuY29tL1NpbHZlckV5ZS8yMDE3LzAxL2lkZW50aXR5L2NsYWltcy90aW1lRm9ybWF0SWQiOiIzIiwiaHR0cDovL3NjaGVtYXMua25vd21hZGljcy5jb20vU2lsdmVyRXllLzIwMTcvMDEvaWRlbnRpdHkvY2xhaW1zL2xvY2F0aW9uRm9ybWF0IjoiVVRNIiwiaHR0cDovL3NjaGVtYXMua25vd21hZGljcy5jb20vU2lsdmVyRXllLzIwMTcvMDEvaWRlbnRpdHkvY2xhaW1zL2xvY2F0aW9uRm9ybWF0SWQiOiI0IiwiaHR0cDovL3NjaGVtYXMua25vd21hZGljcy5jb20vU2lsdmVyRXllLzIwMTcvMDEvaWRlbnRpdHkvY2xhaW1zL3VuaXRPZk1lYXN1cmVtZW50IjoiS25vdHMiLCJodHRwOi8vc2NoZW1hcy5rbm93bWFkaWNzLmNvbS9TaWx2ZXJFeWUvMjAxNy8wMS9pZGVudGl0eS9jbGFpbXMvdW5pdE9mTWVhc3VyZW1lbnRJZCI6IjMiLCJodHRwOi8vc2NoZW1hcy5rbm93bWFkaWNzLmNvbS9TaWx2ZXJFeWUvMjAxNy8wMS9pZGVudGl0eS9jbGFpbXMvb2Zmc2V0IjoiLTUuMDAiLCJsYW5ndWFnZUlkIjoiMjMiLCJqdGkiOiJBNzVEQkFGQ0QwMEZFOUNENTJFRTVGQjJEMkY4N0ExOSIsInNpZCI6IjIxMzM1M0U4MzkwMDVCNkZBQUIwRkVDOTRERDJGOTc3IiwiaWF0IjoxNzY2MzkyODUzLCJzY29wZSI6WyJvcGVuaWQiLCJwcm9maWxlIiwib2ZmbGluZV9hY2Nlc3MiXSwiYW1yIjpbInB3ZCJdfQ.RypGVAM3QiBYW7V-Ybnu_Tly0GWv0XB2fe2tIY94DUClnl5GB6r1wRaFbss2EEjnm5Q9gKGu2g62tvLyQWEW-ZgHxlc2OAMV8mgW-7_qItF7K8ItU5EHyPTWb5GBnVku93_IMBcD5Z7QCSN4szT86f8VWCdA289YGNUQG8XkeFPdDR7RvfvwGD1CXdPymYkFbQx_uoJreoCL9NLFtf8v0XDQMjKTIH5dSQWPPCp9w9B4PTnKZ0Y_ZK7yxuBtvfo21iPgpdIoQTCZdMJoXbtbNHgWbVIMdVp_R_8fA_WHiBbrmZxc5PitSCQbcgBzabB5_j6iDk6tjdY6tzzBeFaIAA"
- **Authentication:** None
- **Body:** None

### Expectations

- **Status Code:** 2xx
- **Response Body:** Optional

### Test Cases

| ID     | Type     | Description          | Expected                        |
|--------|----------|----------------------|---------------------------------|
| TC-001 | Positive | Valid GET request    | Status code is in range 200–299 |

---
