# System Design Capstone
Inherited Project to build & optimize database and server to handle webscale traffic\
**Frontend Owner:** Blake-Whitham\
**Backend Owner:** TimothyAkana

# Server API
## Add Home Listing
  * POST `/api/mortgage/homes`

**Success Status Code:** `201`

**Request Body:** Expects JSON with the following keys
```json
    {
      "name": "String",
      "price": "Integer"
    }
```

## Get Home Listing
  * GET `/api/mortgage/homes/:id`

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
  * PATCH `/api/mortgage/homes/:id`

**Path Parameters:**
  * `id` home listing id

**Success Status Code:** `204`

**Request Body:** Expects JSON with any of the following keys (include only kets to be updated)
```json
    {
      "name": "String",
      "price": "Number"
    }
```

## Delete Home Listing
  * DELETE `/api/mortgage/homes/:id`

**Path Parameters:**
  * `id` home listing id

**Success Status Code:** `204`

# Schema Data-Shape Notes:
Home Price Schema
```json
    {
      "id": "Number",
      "name": "String",
      "price": "Number"
    }
```

Discount Schema
```json
    {
      "id": "Number",
      "name": "String",
      "price": "Number",
      "start": "YYYY-MM-MM",
      "end": "YYYY-MM-MM",
      "maxDiscountPoints": "Number",
      "minDownPayment": "Number",
      "minInterestRate": "Number",
      "lowIncome": "Boolean",
      "veteran": "Boolean",
      "homeId": "Number"
    }
```
