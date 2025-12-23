# TEST_COVERAGE_MATRIX.md

**Generated**: 2025-12-23 21:14:12 +07:00  
**Report Version**: 1.0  
**Analyzed By**: AI QA Analyst  
**Environment**: KMI.postman_environment.json

## Coverage Matrix
| API Endpoint                                      | Method | Scenarios Executed                              | Coverage % | Notes |
|---------------------------------------------------|:------:|-------------------------------------------------|-----------:|-------|
| /v2/web/odata/SEPAOrgs/SE.GetUsers?$top=10        |  GET   | Happy-path fetch first 10 users                 | 100% (observed) | No validation assertions present |
| /v2/web/odata/SEUsers/SE.GetDeviceList?$top=10    |  GET   | Happy-path fetch first 10 devices               | 100% (observed) | No validation assertions present |

## Coverage Gaps
- No POST/PUT/PATCH/DELETE scenarios; create/read-only coverage only.
- No negative-path tests (e.g., auth failures, invalid parameters, empty results).
- No schema or field-level assertions, leaving data correctness unverified.
- Limited dataset variation; only `$top=10` parameter exercised.

## Recommendations
1. Add CRUD coverage where applicable (create/update/delete endpoints).
2. Introduce negative cases (invalid IDs, permission checks, rate limits, throttling).
3. Implement schema validation and business rule checks for both endpoints.
4. Expand parameterization (pagination, filters, sorting) to broaden scenario coverage.
5. Add security-oriented tests (authorization, input validation, error handling).
