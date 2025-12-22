# Recommendations

- Return a JSON error payload (and consider HTTP 405) for unsupported methods on `/ping` to keep error handling consistent for clients expecting JSON.
- Add an automated healthcheck test to CI that asserts `/ping` returns 2xx with the expected JSON body after deployments.
