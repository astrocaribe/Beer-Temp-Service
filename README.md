# Beer Temperature Service

A Node Express service that receives temperature signals via an API.

More details to come soon!

# Install

1. Download repo
2. npm install
3. Set environment variables `DATABASE_URL` and `SERVICE_PORT` for PG connection string and
   service port, respectively.
4. Run service with `node server.js`

# Additional info

- Currently runs on port 4000 by default
- Available routes:
  - /ping - Check for a lifebeat from the service
  - /temperature - Post temperature data to the service

Service can be tested by using a POST to `<service-address>:<service-port>/temperatures` with 
JSON payload:

```json
{
	"room": 75.875,
	"weather": 77.460,
	"time": "2019-05-19 20:49:39.906523"
}
```
