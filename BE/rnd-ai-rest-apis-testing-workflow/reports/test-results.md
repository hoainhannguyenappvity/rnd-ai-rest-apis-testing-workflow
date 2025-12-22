# API Test Results

## API-001: Ping Service

| Test Case | Method / Endpoint | Payload | Expected | Actual | Status |
| --- | --- | --- | --- | --- | --- |
| TC-001 | POST `http://localhost:3000/ping` | None | Status is 2xx; body optional | 200 OK with JSON `{"success":true,"data":"pong"}` | Pass |
| TC-002 | GET `http://localhost:3000/ping` | None | Status is not 2xx | 404 Not Found with HTML error page | Pass |
