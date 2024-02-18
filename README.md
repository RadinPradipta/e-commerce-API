# e-commerce-API

# Installation

- Clone this project

```bash
git clone https://github.com/RadinPradipta/e-commerce-API
```

- Go to the root of the project

```bash
cd e-commerce-API
```

- Install dependencies

```bash
npm install
```

- Provide database credentials to `.env`

```text
DATABASE_URL="mysql://user:password@localhost:3306/yourdatabase"
```

- Generate encryption key

```bash
node .\config\generate_ecnryption_key.js
```

- Copy the output to `.env` file

```
CRYPTO_SECRET_KEY=paste_your_encryption_key
```

- Generate IV key

```bash
node .\config\generate_iv.js
```

- Copy the output to `.env` file

```
CRYPTO_IV=paste_your_IV_key
```

- Generate JWT key

```bash
node .\config\generate_secret_key.js
```

- Copy the output to `.env` file

```
JWT_SECRET=paste_your_JWT_key
```

- Run prisma migration

```bash
npx prisma migrate dev
```

- Populate the database

```bash
npm run seed
```

- Run the server

```bash
npm run start
```

# Routes Documentation

# Authentication Route

### 1. User Login

- **Route**: `POST /login`
- **Description**: Allows users to authenticate by providing their credentials.
- **Request Body**:
  - `email`: User's username or email.
  - `password`: User's password.
- **Response**:
  - **Status Code**: 200 OK
  - **Body**:
    - `token`: JWT token for authentication.
    - `user`: User details.

# Order Routes

### 1. Browse All Orders

- **Route**: `GET /orders`
- **AUTHENTICATION TOKEN IS REQUIRED**
- **Description**: Retrieves all orders in the system.
- **Request Body**: no request body(s) required
- **Response**:
  - **Status Code**: 200 OK
  - **Body**: Array of order objects.

### 2. Browse Orders by User

- **Route**: `GET /order`
- **AUTHENTICATION TOKEN IS REQUIRED**
- **Description**: Retrieves all orders associated with the authenticated user.
- **Request Body**: no request body(s) required
- **Response**:
  - **Status Code**: 200 OK
  - **Body**: Array of order objects.

### 3. Checkout

- **Route**: `POST /order`
- **AUTHENTICATION TOKEN IS REQUIRED**
- **Description**: Initiates the checkout process to create a new order.
- **Request Body**:
  - `product_ids`: array of product_ids
  ```
  {
   "product_ids":[7]
  }
  ```
- **Response**:
  - **Status Code**: 200 OK
  - **Body**: Details of the created order.

# Cart Routes

### 1. Get Cart by User

- **Route**: `GET /cart`
- **AUTHENTICATION TOKEN IS REQUIRED**
- **Description**: Retrieves the cart items associated with the authenticated user.
- **Request Body**: request body is not required
- **Response**:
  - **Status Code**: 200 OK
  - **Body**:
    - `carts`: Array of cart items.
    - `total`: Total price of all items in the cart.
    - `total_items`: Total number of items in the cart.

### 2. Add Products to Cart

- **Route**: `POST /cart`
- **AUTHENTICATION TOKEN IS REQUIRED**
- **Description**: Adds products to the user's cart.
- **Request Body**:
  - `product_id`: ID of the product to be added.
  - `quantity`: Quantity of the product to be added.
  ```
  {
  "product_id":7,
  "quantity":5
  }
  ```
- **Response**:
  - **Status Code**: 200 OK
  - **Body**: Details of the added product in the cart.

### 3. Delete Cart by User

- **Route**: `DELETE /cart`
- **AUTHENTICATION TOKEN IS REQUIRED**
- **Description**: Deletes cart items associated with the authenticated user.
- **Request Body**:
  - `product_id`: ID of the product to be deleted.
  ```
  {
  "product_id":7
  }
  ```
- **Response**:
  - **Status Code**: 200 OK
  - **Body**: Confirmation of deletion.

# Payment Route

### 1. Process Payment

- **Route**: `POST /pay`
- **Description**: Initiates the payment process for an order.
- **Request Body**:

  - `order_id`: the id of the order that needs to be paid.
  - `cardNumber`: User's credit card number.
  - `cvv`: User's credit card's cvv number.
  - `expiryMonth`: User's credit card's expiration month.
  - `expiryYear`: User's credit card's expiration year.

  ```
  {
  "order_id":1,
  "cardNumber": "4012888888881881",
  "cvv": 201,
  "expiryMonth": "05",
  "expiryYear": "2030"
  }
  ```

- **Response**:
  - **Status Code**: 200 OK
  - **Body**: Confirmation of successful payment.

# Product Routes

### 1. Browse Products

- **Route**: `GET /products`
- **Controller**: `productController.browseProducts`
- **Description**: Retrieves all products available in the system.
- **Request Body**: request body is not required
- **Response**:
  - **Status Code**: 200 OK
  - **Body**: Array of product objects.

### 2. Search Products

- **Route**: `GET /products/search`
- **Description**: Searches for products based on provided query parameters.
- **Request Body**: request body is not required
- **Query Parameters**:
  - `name`: search by product name.
  - `category`: search by product's category_id.
  - `page`: switch to different pages.
- **Response**:
  - **Status Code**: 200 OK
  - **Body**: Array of product objects matching the search query.

### 3. Get Product by ID

- **Route**: `GET /products/:id`
- **Description**: Retrieves a specific product by its ID.
- **Request Body**: request body is not required
- **Path Parameters**:
  - `id`: ID of the product to retrieve.
- **Response**:
  - **Status Code**: 200 OK
  - **Body**: Details of the product.

### 4. Create Product

- **Route**: `POST /products`
- **AUTHENTICATION TOKEN IS REQUIRED**
- **Description**: Adds a new product to the system.
- **Request Body**:
  - `name`:name of the product
  - `price`:price of the product
  - `in_stock`: is the product in stock
  - `description`:description of the product
  - `category_id`:category of the product
  ```
  {
  "name":"product",
  "price":100,
  "in_stock":true,
  "description":"description",
  "category_id":1
  }
  ```
- **Response**:
  - **Status Code**: 200 OK
  - **Body**: Details of the created product.

### 5. Update Product

- **Route**: `PUT /products/:id`
- **AUTHENTICATION TOKEN IS REQUIRED**
- **Description**: Updates an existing product in the system.
- **Path Parameters**:
  - `id`: ID of the product to update.
- **Request Body**:
  - `name`:name of the product
  - `price`:price of the product
  - `in_stock`: is the product in stock
  - `description`:description of the product
  - `category_id`:category of the product
  ```
  {
  "name":"product",
  "price":100,
  "in_stock":true,
  "description":"description",
  "category_id":1
  }
  ```
- **Response**:
  - **Status Code**: 200 OK
  - **Body**: Details of the updated product.

### 6. Delete Product

- **Route**: `DELETE /products/:id`
- **AUTHENTICATION TOKEN IS REQUIRED**
- **Description**: Deletes a product from the system.
- **Request Body**: request body is not required
- **Path Parameters**:
  - `id`: ID of the product to delete.
- **Response**:
  - **Status Code**: 200 OK
  - **Body**: Confirmation of deletion.

# User Routes

### 1. Browse Users

- **Route**: `GET /user`
- **AUTHENTICATION TOKEN IS REQUIRED**
- **Description**: Retrieves all users in the system.
- **Request Body**: request body is not required
- **Response**:
  - **Status Code**: 200 OK
  - **Body**: Array of user objects.

### 2. Register New User

- **Route**: `POST /user`
- **Description**: Registers a new user in the system.
- **Request Body**:
  - `name`: Name of the user.
  - `email`: Email address of the user.
  - `password`: Password of the user.
  ```
  {
  "name":"user",
  "email":"user",
  "password":"password"
  }
  ```
- **Response**:
  - **Status Code**: 200 OK
  - **Body**: Details of the registered user.

### 3. Read User by ID

- **Route**: `GET /user/:id`
- **AUTHENTICATION TOKEN IS REQUIRED**
- **Description**: Retrieves details of a specific user by their ID.
- **Path Parameters**:
  - `id`: ID of the user to retrieve.
- **Request Body**: request body is not required
- **Response**:
  - **Status Code**: 200 OK
  - **Body**: Details of the user.

### 4. Update User by ID

- **Route**: `PUT /user/:id`
- **AUTHENTICATION TOKEN IS REQUIRED**
- **Description**: Updates details of a specific user by their ID.
- **Path Parameters**:
  - `id`: ID of the user to update.
- **Request Body**:
  - `name`: Name of the user.
  - `email`: Email address of the user.
  - `password`: Password of the user.
  ```
  {
  "name":"user",
  "email":"user",
  "password":"password"
  }
  ```
- **Response**:
  - **Status Code**: 200 OK
  - **Body**: Details of the updated user.
