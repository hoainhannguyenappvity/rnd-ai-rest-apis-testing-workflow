# Recommendations

- Return a JSON error payload for unsupported methods on `/ping` (consider HTTP 405 and an `Allow` header) to keep error handling consistent for API clients.
- Add a lightweight CI healthcheck that asserts `/ping` responds with 2xx and JSON `{"success":true,"data":"pong"}` after deployments.
