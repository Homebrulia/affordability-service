# System Design Capstone
Inherited Project to build & optimize database and server to handle webscale traffic\
**Frontend Owner:** Blake-Whitham\
**Backend Owner:** TimothyAkana

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

**Success Status Code:** `204`

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
      "dateRange": "Daterage",
      "maxDiscountPoints": "Number",
      "minDownPayment": "Number",
      "minInterestRate": "Number",
      "isLowIncome": "Boolean",
      "isVeteran": "Boolean",
      "combinable": "Boolean",
      "homeId": "Number"
    }
```
