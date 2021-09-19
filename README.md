Table of Contents
=================
* [Introduction](#introduction)
* [Available API endpoint list](#available-api-endpoint-list)
* [Authentication](#authentication)
   * [OAuth](#oauth)
   * [Normal](#normal)
      * [Sign up](#sign-up)
      * [Sign in](#sign-in)
* [Purchase history of an user](#purchase-history-of-an-user)
* [Category of products](#category-of-products)
   * [Creating new category](#creating-new-category)
   * [Getting all the categories](#getting-all-the-categories)
* [Products](#products)
   * [Creating/Adding new product](#creatingadding-new-product)
   * [Getting the products](#getting-the-products)
   * [Getting a certain product](#getting-a-certain-product)
   * [Editing a certain product](#editing-a-certain-product)
   * [Getting the photo of a certain product](#getting-the-photo-of-a-certain-product)
   * [Filtering the products](#filtering-the-products)
   * [Adding review to a certain product](#adding-review-to-a-certain-product)
   * [Getting all the reviews of a certain product](#getting-all-the-reviews-of-a-certain-product)
* [Cart](#cart)
   * [Adding a product to cart](#adding-a-product-to-cart)
   * [Getting all the cart items](#getting-all-the-cart-items)
   * [Modifying count property of a cart item](#modifying-count-property-of-a-cart-item)
   * [Delete a cart item](#delete-a-cart-item)
   * [Adding discount to all cart items of a user](#adding-discount-to-all-cart-items-of-a-user)
* [Profile](#profile)
   * [Getting the profile for current user](#getting-the-profile-for-current-user)
   * [Updating the profile for current user](#updating-the-profile-for-current-user)
* [Payment](#payment)
   * [Initializing a payment](#initializing-a-payment)
* [Coupon](#coupon)
   * [Creating a coupon](#creating-a-coupon)
   * [Viewing the coupons](#viewing-the-coupons)
   * [Validating a coupon](#validating-a-coupon)


# Introduction
This is the backend for e-commerce project showed in fsmern course bohubrihi. There are lots of unhandled errors. I am not currently intersted to continue this project. Feel free to fork and use.

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

After successful login, it will redirect to your frontend page with a token as query string.
example:

```
format: <frontend page>.com/loginsocial?token=<token>

http://localhost:3000/loginsocial?token=eyEfajkFDAjDFAFEFDSAF
```

## Normal

Request response was used for this.

### Sign up

**_Request:_**

```
POST /api/user/signup
```

_request body_ (json data) :

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

_request body_:

```json
{
  "email": "meow@gmail.com",
  "password": "123420"
}
```

**_Response:_**

```json
// message: "Login Successful" for signin
{
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

_request body_:

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

_request body_ example:

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

_request body_ example:

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

_request body_:

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

**_Request:_**

```
URI: https:<backend>.com/api/product/reviews/:product_id

POST api/product/reviews/60f5f622029713001519748a

headers:
Authorization: Bearer <token>
```

_request body_:

rating is between 1, 5

```json
{
  "rating": "5",
  "comment": "shundor"
}
```

**_Response:_**

```json
{
  "message": "Successfully updated review!"
}
```

## Getting all the reviews of a certain product

**_Request:_**

```
GET api/product/reviews/60f5f622029713001519748a
```

**_Response:_**

```json
[
  {
    "_id": "614741bb59c36300166e991d",
    "user": {
      "_id": "60ef0176b8d3dc1cfa4d09b1",
      "name": "Ahnaf Tahmid"
    },
    "rating": 5,
    "comment": "shundor"
  }
]
```

# Cart

## Adding a product to cart

**_Request:_**

```
POST api/cart

headers:
Authorization: Bearer <token>
```

_request body:_

```json
//here product is the id of the product
// price of a product can chnage over time so saving what price was at that time
{
  "price": "5",
  "product": "6147150610d7d80016da7bed",
  "count": "1"
}
```

**_Response:_**

```json
{
  "message": "Created cart item successfully",
  "data": {
    "discount": 0,
    "count": 1,
    "_id": "614752534bc9ea001695101f",
    "product": "6147150610d7d80016da7bed",
    "user": "60ef0176b8d3dc1cfa4d09b1",
    "price": 5,
    "createdAt": "2021-09-19T15:08:03.093Z",
    "updatedAt": "2021-09-19T15:08:03.093Z",
    "__v": 0
  }
}
```

## Getting all the cart items

**_Request:_**

```
GET api/cart

headers:
Authorization: Bearer <token>
```

**_Response:_**

```json
[
  {
    "discount": 0,
    "count": 1,
    "_id": "614752534bc9ea001695101f",
    "product": {
      "_id": "6147150610d7d80016da7bed",
      "name": "Noodles"
    },
    "user": {
      "_id": "60ef0176b8d3dc1cfa4d09b1",
      "name": "Ahnaf Tahmid"
    },
    "price": 5,
    "createdAt": "2021-09-19T15:08:03.093Z",
    "updatedAt": "2021-09-19T15:08:03.093Z",
    "__v": 0
  }
]
```

## Modifying `count` property of a cart item

**_Request:_**

```
PUT api/cart

Authorization Bearer <token>
```

_request body:_

```json
{
  "_id": "614752534bc9ea001695101f",
  "count": 1
}
```

**_Response:_**

```json
{
  "message": "Successfully updated cart item"
}
```

## Delete a cart item

Users can delete only those items which they added.

**_Request:_**

```
format: https://<backend>.com/api/cart/:id_of_cartitem

DELETE api/cart/614752534bc9ea001695101f

Authorization: Bearer <token>
```

**_Response:_**

```json
{
  "message": "Successfully deleted cart item"
}
```

## Adding discount to all cart items of a user

If a user wants to use discount, after validating the coupon, we update the discount field of all the cart items. However price remains the same but when paying, we calculate the price using formula, $$ final \space price \space = price \times discount \space / \space 100 $$

Discount is in percentage.

**_Request:_**

```
POST api/cart/discount

Authorization: Bearer <token>
```

_request body:_

```json
// To apply 20% discount to all the cart items
{
  "discount": "20"
}
```

**_Response:_**

```json
{
  "message": "Successfully updated discount!"
}
```

# Profile

In the database profile is where your address, contact info etc are stored for payment and delivery.

## Getting the profile for current user

**_Request:_**

```
GET api/profile

Authorization: Bearer <token>
```

**_Response:_**

```json
{
  "_id": "60f32f3bc6a34d0015dc5b95",
  "phone": "01988603156",
  "address1": "adf",
  "address2": "dfd",
  "city": "Dhaka",
  "postcode": 1216,
  "country": "Bangladesh",
  "user": "60ef0176b8d3dc1cfa4d09b1",
  "__v": 0
}
```

## Updating the profile for current user

If profile info does not exist, creates a new one otherwise updates the existing.

**_Request_**

```
POST api/profile

headers:
Authorization: Bearer <token>
```

_request body:_

```json
{
  "phone": "01955603156",
  "address1": "adf",
  "address2": "dfd",
  "city": "Dhaka",
  "postcode": 1216,
  "country": "Bangladesh"
}
```

**_Response:_**

```json
{
  "message": "Updated successfully!"
}
```

# Payment

User sends a payment init request that returns a gateway url (usual SSLCOMMERZ stuff)

## Initializing a payment

**_Request:_**

```
GET api/payment

headers:
Authorization: Bearer <token>
```

**_Response:_**

```json
{
  "status": "SUCCESS",
  "failedreason": "",
  "sessionkey": "CD771BB2D1CDFBC3443AE97224BCCC35",
  "gw": {
    "visa": "city_visa,ebl_visa,visacard",
    "master": "city_master,ebl_master,mastercard",
    "amex": "city_amex,amexcard",
    "othercards": "qcash,fastcash",
    "internetbanking": "city,bankasia,ibbl,mtbl",
    "mobilebanking": "dbblmobilebanking,bkash,nagad,abbank,ibbl"
  },
  "redirectGatewayURL": "https://sandbox.sslcommerz.com/gwprocess/v4/bankgw/indexhtml.php?mamount=4.00&ssl_id=2109192249041m3a7EAzosLNord&Q=REDIRECT&SESSIONKEY=CD771BB2D1CDFBC3443AE97224BCCC35&tran_type=success&cardname=",
  "directPaymentURLBank": "",
  "directPaymentURLCard": "",
  "directPaymentURL": "",
  "redirectGatewayURLFailed": "",
  "GatewayPageURL": "https://sandbox.sslcommerz.com/EasyCheckOut/testcdecd771bb2d1cdfbc3443ae97224bccc35",
  "storeBanner": "https://sandbox.sslcommerz.com/stores/logos/demoLogo.png",
  "storeLogo": "https://sandbox.sslcommerz.com/stores/logos/demoLogo.png",
  "store_name": "Demo"
}

// And there are lot more but I showed the important ones
```

Use the redirect URL to do your stuff.

# Coupon

Using coupon codes, users can get discount.
Coupon code can be created and viewed only by admins.

## Creating a coupon

User must be admin.

**_Request:_**

```
POST api/coupon

headers:
Authorization: Bearer <token>
```

_request body:_

```json
{
  "name": "20% off",
  "discount": "20",
  "code": "123ADF"
}
```

**_Response:_**

```json
{
  "data": {
    "_id": "61476c374bc9ea0016951045",
    "name": "20% off",
    "discount": 20,
    "code": "123ADF"
  },
  "message": "Created a coupon successfully"
}
```

## Viewing the coupons

Only admin type users can view the coupons

**_Request:_**

```
GET api/coupon

headers:
Authorization: Bearer <token>
```

**_Response:_**

```json
[
  {
    "_id": "60f53f419f99c7001543d07e",
    "name": "Mega offer",
    "code": "X2BY0S4",
    "discount": 20,
    "createdAt": "2021-07-19T09:00:49.227Z",
    "updatedAt": "2021-07-19T09:00:49.227Z",
    "__v": 0
  },
  {
    "_id": "60f5401bdf5a1b0015b8aa3f",
    "name": "Omega offer",
    "code": "T0BY0S4",
    "discount": 30,
    "createdAt": "2021-07-19T09:04:27.998Z",
    "updatedAt": "2021-07-19T09:04:27.998Z",
    "__v": 0
  },
  {
    "_id": "61476c374bc9ea0016951045",
    "name": "20% off",
    "discount": 20,
    "code": "123ADF",
    "createdAt": "2021-09-19T16:58:31.265Z",
    "updatedAt": "2021-09-19T16:58:31.265Z",
    "__v": 0
  }
]
```

## Validating a coupon

all users can validate a coupon

**_Request:_**

```
POST api/coupon/validate

headers:
Authorization: Bearer <token>
```

_request body:_

```json
{
  "code": "123ADF"
}
```

**_Response:_**

If code is correct, it will return all info related to the coupon.

```json
{
  "_id": "61476c374bc9ea0016951045",
  "name": "20% off",
  "discount": 20,
  "code": "123ADF",
  "createdAt": "2021-09-19T16:58:31.265Z",
  "updatedAt": "2021-09-19T16:58:31.265Z",
  "__v": 0
}
```
