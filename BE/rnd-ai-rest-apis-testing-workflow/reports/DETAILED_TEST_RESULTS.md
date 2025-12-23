# DETAILED_TEST_RESULTS.md

**Generated**: 2025-12-23 21:14:12 +07:00  
**Report Version**: 1.0  
**Analyzed By**: AI QA Analyst  
**Environment**: KMI.postman_environment.json

## Table of Contents
1. Test Inventory
2. Endpoint Breakdown
3. Performance Analysis
4. Response Time Distribution
5. Environment Variables
6. Warnings & Notes

## 1. Test Inventory
| Test Case / Endpoint                        | Method | Status | Response Time | Result |
|---------------------------------------------|:------:|:------:|--------------:|:------:|
| /v2/web/odata/SEPAOrgs/SE.GetUsers?$top=10  |  GET   |  200   | 1534ms        | 🟢 |
| /v2/web/odata/SEUsers/SE.GetDeviceList?$top=10 |  GET   |  200   | 412ms         | 🟢 |

## 2. Endpoint Breakdown
### 2.1 Get Users
- **Request**: GET `https://qaweb360plus.360awareqa.com/v2/web/odata/SEPAOrgs/SE.GetUsers?$top=10`
- **Status**: 200 OK
- **Response Time**: 1534ms
- **Payload Size**: ~24.91kB
- **Assertions**: 0 (no validations executed)
- **Result**: 🟢 Request succeeded; 🟠 Business validation not performed.

### 2.2 Get Devices
- **Request**: GET `https://qaweb360plus.360awareqa.com/v2/web/odata/SEUsers/SE.GetDeviceList?$top=10`
- **Status**: 200 OK
- **Response Time**: 412ms
- **Payload Size**: ~2.21kB
- **Assertions**: 0 (no validations executed)
- **Result**: 🟢 Request succeeded; 🟠 Business validation not performed.

## 3. Performance Analysis
| Rank | Endpoint                                       | Method | Response Time | Notes            |
|-----:|------------------------------------------------|:------:|--------------:|------------------|
| 1 (slowest) | /v2/web/odata/SEPAOrgs/SE.GetUsers?$top=10     | GET | **1534ms**     | 🟠 Higher latency |
| 2 (fastest) | /v2/web/odata/SEUsers/SE.GetDeviceList?$top=10 | GET | 412ms         | 🟢 Quick response |

- **Aggregate**: avg 973ms | min 412ms | max 1534ms | s.d. 561ms
- **Endpoints >2s**: None observed.

## 4. Response Time Distribution (ms)
| Range          | Count | Percentage |
|----------------|------:|-----------:|
| < 500          | 1     | 50.00% |
| 500 – 1,000    | 0     | 0.00% |
| 1,000 – 2,000  | 1     | 50.00% |
| > 2,000        | 0     | 0.00% |

## 5. Environment Variables
- Not visible in Newman output (values not printed or masked).

## 6. Warnings & Notes
- ⚠️ Node.js deprecation warning observed: `(DEP0176) fs.F_OK is deprecated, use fs.constants.F_OK instead` (originating from a dependency).
- 🟠 No assertions executed across requests; add schema/field validations to confirm correctness.
