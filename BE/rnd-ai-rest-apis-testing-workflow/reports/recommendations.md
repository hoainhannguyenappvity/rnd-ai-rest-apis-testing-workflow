# Recommendations

- `/ping`: Respond with 405 and an `Allow` header for unsupported verbs to make the error contract clearer for clients.
- `SE.GetUsers`: Rotate and manage bearer tokens securely; avoid embedding long-lived tokens in documentation and consider scoping them to least privilege.
- Add schema validation for the users payload (e.g., assert `value` is an array with required fields such as `id`, `username`, `isSuper`, `lastLogin`) to catch regressions beyond status codes.
- Introduce pagination/limit parameters in tests (if supported) to prevent large responses from slowing automated checks or leaking excessive user data.
- Automate a minimal smoke suite (ping positive/negative and users happy path) in CI with alerting on non-2xx responses.
