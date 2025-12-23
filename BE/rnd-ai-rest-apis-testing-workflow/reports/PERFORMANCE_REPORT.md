# PERFORMANCE_REPORT.md

**Generated**: 2025-12-23 21:14:12 +07:00  
**Report Version**: 1.0  
**Analyzed By**: AI QA Analyst  
**Environment**: KMI.postman_environment.json

## 1. Response Time Statistics
- Min: 412ms  
- Avg: 973ms  
- Max: 1534ms  
- Median: 973ms (2 samples)  
- Standard Deviation: 561ms  
- Total Duration: 2.1s

## 2. Performance Benchmarks by Endpoint
| Endpoint                                       | Method | Response Time | Status | Note |
|------------------------------------------------|:------:|--------------:|:------:|------|
| /v2/web/odata/SEPAOrgs/SE.GetUsers?$top=10     |  GET   | **1534ms**    | 200    | 🟠 Slower of the set |
| /v2/web/odata/SEUsers/SE.GetDeviceList?$top=10 |  GET   | 412ms         | 200    | 🟢 Fastest |

## 3. Threshold Breaches (>2s)
- None observed; both responses under 2s.

## 4. Response Time Trends
- Single iteration executed; no multi-iteration trend data available.
- Notable spread between the two calls (1.534s vs 0.412s), suggesting variable backend performance.

## 5. Performance Recommendations
- Monitor `Get Users` endpoint for potential bottlenecks; capture server-side timings or profiling if latency persists.
- Introduce additional iterations and varied datasets to capture trend data and percentile metrics.
- Add performance assertions (e.g., fail if >2s) to enforce SLAs automatically.

## 6. SLA Compliance
- SLA targets not provided; recommend defining per-endpoint thresholds (e.g., P95 < 2s) to measure compliance.
