# DEFECTS_LOG.md

**Generated**: 2025-12-23 21:14:12 +07:00  
**Report Version**: 1.0  
**Analyzed By**: AI QA Analyst  
**Environment**: KMI.postman_environment.json

| Defect ID | Severity | Test Case / Endpoint | Expected Result | Actual Result | Error Message / Trace | Steps to Reproduce | Recommended Fix | Status |
|-----------|:--------:|----------------------|-----------------|---------------|-----------------------|--------------------|-----------------|:------:|
| DEF-001 | Medium | All requests | Assertions validate status, schema, and key business fields | No assertions executed (0); business correctness unverified | N/A | Run `newman run .\\KMI.postman_collection.json -e .\\KMI.postman_environment.json` | Add functional assertions (status, schema, required fields, negative cases) to each request | Open |
| DEF-002 | Low | Collection startup | Newman run produces no runtime warnings | Node.js deprecation warning `(DEP0176) fs.F_OK is deprecated, use fs.constants.F_OK instead)` appears | Deprecation warning printed at start of run | Run `newman run .\\KMI.postman_collection.json -e .\\KMI.postman_environment.json` | Upgrade Newman/Node dependencies or patch usage of `fs.F_OK` to `fs.constants.F_OK` | Open |

No additional defects observed in this execution.
