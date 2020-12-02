# System Design Capstone
Inherited Project to build & optimize database and server to handle webscale traffic\
Frontend Owner: Blake-Whitham\
Backend Owner: TimothyAkana

# Mortgage Prices
## Create
**Method:**  POST\
**Endpoint:**  /mortgage/prices\
**Request Body:**  {"mortgageId": mortgageId, "price": price}\
**Response Object:**  HTTP Status Code 201

## Read:
**Method:**  GET\
**Endpoint:**  /mortgage/prices/:mortgageId\
**Request Body:**  {"mortgageId": mortgageId}\
**Response Object:**  {"id": mortgageId, "price": price}

## Update:
**Method:**  PUT\
**Endpoint:**  /mortgage/prices/:mortgageId\
**Request Body:**  {"mortgageId": mortgageId, "price": price}\
**Response Object:**  HTTP Status Code 200

## Delete:
**Method:**  DELETE\
**Endpoint:**  /mortgage/prices/:mortgageId\
**Request Body:**  {"mortgageId": mortgageId}\
**Response Object:**  HTTP Status Code 200

