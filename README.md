# Inherited Project to build & optimize database and server to handle webscale traffic
Frontend Owner: Blake-Whitham\
Backend Owner: TimothyAkana

# Mortgage Prices
## Create
**Method**  POST\
**Endpoint**  /mortgage/prices\
**Request Body**  {"mortgageId": mortgageId, "price": price}\
**Response Object**  HTTP Status Code 201

## Read:
**Method**  GET\
**Endpoint**  /mortgage/prices/:mortgageId\
**Request Body**  {"mortgageId": mortgageId}\
**Response Object**  {"id": mortgageId, "price": price}

## Update:
**Method**  PUT\
**Endpoint**  /mortgage/prices/:mortgageId\
**Request Body**  {"mortgageId": mortgageId, "price": price}\
**Response Object**  HTTP Status Code 200

## Delete:
**Method**  DELETE\
**Endpoint**  /mortgage/prices/:mortgageId\
**Request Body**  {"mortgageId": mortgageId}\
**Response Object**  HTTP Status Code 200


# Agent Information
## Create
**Method**  POST\
**Endpoint**  /mortgage/agents/:agentId\
**Request Body**  {"agentId": agentId, "name": name, "title": title, "phone": phone, "rating": rating, "sales": sales}\
**Response Object**  HTTP Status Code 201

## Read:
**Method**  GET\
**Endpoint**  /mortgage/agents/:agentId\
**Request Body**  {"id": agentId}\
**Response Object** {"agentId": agentId, "name": name, "title": title, "phone": phone, "rating": rating, "sales": sales}

## Update:
**Method**  PUT\
**Endpoint**  /mortgage/agents/:agentId\
**Request Body**  {"agentId": agentId, "name": name, "title": title, "phone": phone, "rating": rating, "sales": sales}\
**Response Object** HTTP Status Code 200

## Delete:
**Method**  DELETE\
**Endpoint**  /mortgage/agents/:agentId\
**Request Body**  {"id": agentId}\
**Response Object** HTTP Status Code 200


# Schedule
## Create
**Method**  POST\
**Endpoint**  /mortgage/schedule\
**Request Body**  {"schedule_id": id, "in_person": Boolean, "date": String, "time": String, "name": String, "phone": String, "email": String, "financing": Boolean}\
**Response Object**  HTTP Status Code 201

## Read:
**Method**  GET\
**Endpoint**  /mortgage/schedule/:scheduleId\
**Request Body**  {"schedule_id"}\
**Response Object**  {"schedule_id": id, "in_person": Boolean, "date": String, "time": String, "name": String, "phone": String, "email": String, "financing": Boolean}

## Update:
**Method**  PUT\
**Endpoint**  /mortgage/schedule\
**Request Body**  {"schedule_id": id, "in_person": Boolean, "date": String, "time": String, "name": String, "phone": String, "email": String, "financing": Boolean}\
**Response Object**  HTTP Status Code 200

## Delete:
**Method**  DELETE\
**Endpoint**  /mortgage/schedule\
**Request Body**  {"schedule_id"}\
**Response Object**  HTTP Status Code 200
