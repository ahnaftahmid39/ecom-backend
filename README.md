This is the backend for e-commerce project showed in fsmern course bohubrihi.

# Availabe API endpoint list:

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

response (json data) :

```json
{
  "message": "Registration Successful!", // Login Successful for signin
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTQ2NjY5ZTAyNTRmYTAwMTVhMGNhYzEiLCJlbWFpbCI6ImplcnJ5QGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwibmFtZSI6IlRvbSBKZXJyeSIsImlhdCI6MTYzMjAwMzc0MiwiZXhwIjoxNjMyNjA4NTQyfQ.Dj70LNNYpdjDS7qfDVWdIoVRrV8WZjeX1sq5TK-SiIg",
  "user": {
    "_id": "6146669e0254fa0015a0cac1",
    "name": "Tom Jerry",
    "email": "jerry@gmail.com"
  }
}
```

# Purchase history of an user

Request:

```
GET /api/user/purchase-history

headers:
Authorization: "Bearer <token>"
```

Response:

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

# Category of producs

## Creating new category

You have to be admin type user to create new category

Request:

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

Response:

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
