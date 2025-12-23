# Recommendations

- Return HTTP 405 with an `Allow: POST` header for non-POST requests to `/ping` to match the documented contract; add a regression test to lock this in.
- Clarify the invalid-method scenario for `SE.GetUsers` (spec lists GET as invalid but GET is the supported verb); update the test matrix and docs accordingly.
- Define and validate a minimal response schema for `SE.GetUsers` (e.g., `value` array items, required user fields, numeric types) now that the positive path succeeds.
- Keep bearer tokens short-lived and documented; store only masked examples in specs and rotate real values regularly to reduce exposure risk.
- Make timeout expectations explicit per API (current client timeout 5000ms); monitor latency and adjust thresholds to avoid false positives in edge checks.
