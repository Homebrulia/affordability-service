# Homebrulia
Inherited Project to build & optimize database and server to handle webscale traffic for mortgage calculator microservice\
**Frontend Owner:** Blake-Whitham\
**Backend Owner:** TimothyAkana

## About
Server backend EC2 instances:
- 3 Horizontally Scaled Express servers
- 1 Nginx load balancer
- 1 Postgres Database

[Engineering Journal for Benchmarking Notes](
https://docs.google.com/document/d/1zYwUgz-s9a6T6SnA7lpIbHDnxosxjPbvXSAe581CkD8/edit?usp=sharing)

# Server API
## Add Home Listing
  * POST `/mortgage/homes`

**Success Status Code:** `201`

**Request Body:** Expects JSON with the following keys
```json
    {
      "name": "String",
      "price": "Integer"
    }
```

## Get Home Listing
  * GET `/mortgage/homes/:id`

**Path Parameters:**
  * `id` home listing id

**Success Status Code:** `200`

**Returns:** JSON
```json
    {
      "id": "Number",
      "name": "String",
      "price": "Number"
    }
```

## Update Home Listing Info
  * PATCH `/mortgage/homes/:id`

**Path Parameters:**
  * `id` home listing id

**Success Status Code:** `200`

**Request Body:** Expects JSON with any of the following keys (include only keys to be updated)
```json
    {
      "name": "String",
      "price": "Number"
    }
```

## Delete Home Listing
  * DELETE `/mortgage/homes/:id`

**Path Parameters:**
  * `id` home listing id

**Success Status Code:** `200`