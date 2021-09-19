This is the backend for e-commerce project showed in fsmern course bohubrihi.

# Available API endpoint list:

1. <details><summary><code>/api/oauth</code></summary>

   1. `/google`
      1. `/`
         - `GET`
      2. `/redirect`
         - `GET`
   2. `/facebook`
      1. `/`
         - `GET`
      2. `/redirect`
         - `GET`

   </details>

2. <details><summary><code>/api/user</code></summary>

   1. `/signup`
      - `POST`
   2. `/signin`
      - `POST`
   3. `/purchase-history`
      - `GET`

   </details>

3. <details><summary><code>/api/category</code></summary>

   - `POST`
   - `GET`

   </details>

4. <details><summary><code>/api/product</code></summary>

   1. `/`
      - `POST`
   2. `/:id`
      - `GET`
      - `PUT`
   3. `/photo/:id`
      - `GET`
   4. `/filter`
      - `POST`
   5. `/reviews/:id`
      - `GET`
      - `POST`

   </details>

5. <details><summary><code>/api/cart</code></summary>

   1. `/`
      - `GET`
      - `POST`
      - `PUT`
   2. `/:id`
      - `DELETE`
   3. `/discount`
      - `POST`

   </details>

6. <details><summary><code>/api/payment</code></summary>

   1. `/`
      - `GET`
   2. `/ipn`
      - `POST`
   3. `/success`
      - `POST`
   4. `/cancel`
      - `POST`
   5. `/failure`
      - `POST`

   </details>

7. <details><summary><code>/api/profile</code></summary>

   - `GET`
   - `POST`

   </details>

8. <details><summary><code>/api/coupon</code></summary>

   1. `/`
      - `GET`
      - `POST`
   2. `/validate`
      - `POST`
      </details>

# Authentication

## OAuth

Page redirection was used for this.
For using OAuth simply redirect to the page

- Google OAuth,

```
/api/oauth/google
```

- Facebook OAuth

```
/api/oauth/facebook
```

After successful login, it will redirect to your frontend page with a token as query string. `<frontend page>/loginsocial?token=<token>`
example:

```
http://localhost:3000/loginsocial?token=eyEfajkFDAjDFAFEFDSAF
```

## Normal

Request response was used for this.

### Sign up

**_Request:_**

```
POST /api/user/signup
```

request body (json data) :

```json
{
  "name": "Tom Jerry",
  "email": "jerry@gmail.com",
  "password": "123420"
}
```

### Sign in

**_Request:_**

```
POST /api/user/signin
```

request body:

```json
{
  "email": "meow@gmail.com",
  "password": "123420"
}
```

**_Response:_**

```json
{
  // "Login Successful" for signin
  "message": "Registration Successful!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTQ2NjY5ZTAyNTRmYTAwMTVhMGNhYzEiLCJlbWFpbCI6ImplcnJ5QGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwibmFtZSI6IlRvbSBKZXJyeSIsImlhdCI6MTYzMjAwMzc0MiwiZXhwIjoxNjMyNjA4NTQyfQ.Dj70LNNYpdjDS7qfDVWdIoVRrV8WZjeX1sq5TK-SiIg",
  "user": {
    "_id": "6146669e0254fa0015a0cac1",
    "name": "Tom Jerry",
    "email": "jerry@gmail.com"
  }
}
```

# Purchase history of an user

**_Request:_**

```
GET /api/user/purchase-history

headers:
Authorization: "Bearer <token>"
```

**_Response:_**

```json
// All the orders sorted by createdAt desc
[
  {
    "address": {
      "phone": "01988603156",
      "city": "Dhaka",
      "postcode": 1216,
      "country": "Bangladesh"
    },
    "paymentStatus": "VALID",
    "status": "Complete",
    "_id": "60f6172827ca6b0015d60044",
    "cartItems": [
      {
        "discount": 0,
        "count": 1,
        "_id": "60f6171027ca6b0015d60032",
        "product": {
          "_id": "60f32c5ec6a34d0015dc5b45",
          "name": "Iphone 12"
        },
        "user": "60ef0176b8d3dc1cfa4d09b1",
        "price": 120000,
        "createdAt": "2021-07-20T00:21:36.318Z",
        "updatedAt": "2021-07-20T00:21:36.318Z",
        "__v": 0
      }
    ],
    "user": "60ef0176b8d3dc1cfa4d09b1",
    "transaction_id": "_lf7yxyms91626740519191",
    "sessionKey": "3A3BFC0807E2A539F17EF693C4EB83AB",
    "createdAt": "2021-07-20T00:22:00.366Z",
    "updatedAt": "2021-07-20T00:22:11.854Z",
    "__v": 0
  }
]
```

# Category of products

## Creating new category

You have to be admin type user to create new category

**_Request:_**

```
POST /api/category/

headers:
Authorization : "Bearer <token>"
```

request body:

```json
{
  "name": "electronics"
}
```

**_Response:_**

```json
{
  "message": "Category created successfully!",
  "data": {
    "name": "electronics"
  }
}
```

## Getting all the categories

No authorization is required for this.

Request:

```
GET /api/category
```

Response:

```json
// all the categories
[
  {
    "_id": "60f60bad27ca6b0015d5fe92",
    "name": "Book"
  },
  {
    "_id": "60f32a67c6a34d0015dc5b38",
    "name": "Clothes"
  }
]
```

# Products

## Creating/Adding new product

Admin type user required. Request body have to be form data because we're sending image.

**_Request:_**

```
POST /api/product

headers:
Authorization: "Bearer <token>"
```

request body example:

| Key         | Value                                         |
| ----------- | --------------------------------------------- |
| name        | Noodles                                       |
| description | maggy noodles, khaite moxa                    |
| category    | 60ef405e486a6ad7d7b5b39d (id of category)     |
| quantity    | 600                                           |
| prize       | 120                                           |
| photo       | noodles_picture_12022020.png (only one photo) |

**_Response:_**

```json
{
  "message": "Product successfully created",
  "data": {
    "_id": "6147150610d7d80016da7bed",
    "name": "Noodles",
    "description": "maggy noodles",
    "price": 120,
    "category": "60ef405e486a6ad7d7b5b39d",
    "quantity": 600
  }
}
```

## Getting the products

**_Request:_**

No authorization is needed.

```
GET api/product?order=desc&sortBy=name&limit=2
```

Available query parameters:

| Parameter | Possible value                      |
| --------- | ----------------------------------- |
| order     | `desc` , `asc`                      |
| limit     | `10`, `20`                          |
| sortBy    | `name`, `quantity`, `price`, `sold` |

**_Response:_**

```json
[
  {
    "sold": 5,
    "_id": "60f32e9ec6a34d0015dc5b59",
    "name": "Pant",
    "price": 800,
    "quantity": 17,
    "category": {
      "name": "Clothes",
      "createdAt": "2021-07-17T19:07:19.721Z"
    },
    "createdAt": "2021-07-17T19:25:18.492Z",
    "updatedAt": "2021-07-19T20:57:34.584Z",
    "__v": 0
  },
  {
    "sold": 0,
    "_id": "60f5f622029713001519748a",
    "name": "Panjabi",
    "price": 1499,
    "quantity": 20,
    "category": {
      "name": "Clothes",
      "createdAt": "2021-07-17T19:07:19.721Z"
    },
    "createdAt": "2021-07-19T22:01:06.877Z",
    "updatedAt": "2021-07-19T22:01:06.877Z",
    "__v": 0
  }
]
```

## Getting a certain product

**_Request:_**

```
GET api/product/60f5f622029713001519748a
```

**_Response:_**

```json
{
  "sold": 0,
  "_id": "60f5f622029713001519748a",
  "name": "Panjabi",
  "description": "Boys pinky panjabi",
  "price": 1499,
  "quantity": 20,
  "category": {
    "name": "Clothes"
  },
  "reviews": [],
  "createdAt": "2021-07-19T22:01:06.877Z",
  "updatedAt": "2021-07-19T22:01:06.877Z",
  "__v": 0
}
```

## Editing a certain product

**_Request:_**

Admin type user is required.

```
PUT api/product/60f5f622029713001519748a

headers:
Authorization: "Bearer <token>"
```

request body example:

| Key         | Value                        |
| ----------- | ---------------------------- |
| name        | Mama Noodles                 |
| description | khaite moxa                  |
| category    | 60ef405e486a6ad7d7b5b39d     |
| quantity    | 591                          |
| prize       | 120                          |
| photo       | noodles_picture_12022020.png |

**_Response:_**

```json
{
  "message": "Successfully updated product!"
}
```

## Getting the photo of a certain product

Normally image of a product is not sent when GET request for a product is received because its too large in size. So we use a particular route just for getting the photo when needed.

**_Request:_**

```
// https://<backend>.com/api/product/photo/:id_of_product

GET api/product/photo/60f5f622029713001519748a
```

**_Response:_**

Sends the photo as response.

![photo of noodles](https://guarded-lake-12126.herokuapp.com/api/product/photo/6147150610d7d80016da7bed)

## Filtering the products

We've seen getting the products with some query parameters. If we want more complex filtering we use this route.

**_Request:_**

No authorization needed.

```
POST api/product/filter
```

request body:

```json
{
   "order" : "desc",
   "sortBy" : "name",
   "limit" : "20",
   "skip" : "10",
   "filters" : {
      "price" : ["800", "1500"],
      "category" : ["60ef405e486a6ad7d7b5b39d", "60ef405e486a6ad7d7b5b312"],
   },
   "searchName" : "Panjabi"
}


PS: price array must have 2 elements, those products will be sent which are >= first value and <= second value.
```

**_Response:_**
All the products satisfying the filters will be sent

```json
[
  {
    "sold": 0,
    "_id": "60f5f622029713001519748a",
    "name": "Panjabi",
    "description": "Boys pinky panjabi",
    "price": 1499,
    "quantity": 20,
    "category": {
      "name": "Clothes"
    },
    "reviews": [],
    "createdAt": "2021-07-19T22:01:06.877Z",
    "updatedAt": "2021-07-19T22:01:06.877Z",
    "__v": 0
  },
  {
    "sold": 0,
    "_id": "60f5f622029713001519748a",
    "name": "Panjabi",
    "description": "Black panjabi",
    "price": 1299,
    "quantity": 10,
    "category": {
      "name": "Clothes"
    },
    "reviews": [],
    "createdAt": "2021-07-19T22:01:06.877Z",
    "updatedAt": "2021-07-19T22:01:06.877Z",
    "__v": 0
  }
]
```

## Adding review to a certain product

***Request:***

***Response:***