To run the backend

- npm i
- npm start
```
localhost:3000/driver?idle=true
localhost:3000/driver

Show assigned Dirver as well
localhost:3000/customer?failed=true
localhost:3000/customer

PART# 1

Creating Customer
POST
localhost:3000/customer
{
"name": "Danyal",
"rating": 4,
"lat": 67.1356306,
"long": 20.6831751,
"numRides": 3
}

Updating Customer
PUT
localhost:3000/customer/:customerId
{
"name": "Danyal",
"rating": 4,
"lat": 67.1356306,
"long": 20.6831751,
"numRides": 3
}

Deleting Customer
DELETE
localhost:3000/customer/:customerId
```
