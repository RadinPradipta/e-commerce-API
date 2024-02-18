# e-commerce-API

 ## Routes Documentation

# Authentication Route

### 1. User Login

- **Route**: `POST /login`
- **Middleware**:
  - `validateLogin`: Validates the login request body.
- **Controller**: `authController.login`
- **Description**: Allows users to authenticate by providing their credentials.
- **Request Body**:
  - `username`: User's username or email.
  - `password`: User's password.
- **Response**: 
  - **Status Code**: 200 OK
  - **Body**: 
    - `token`: JWT token for authentication.
    - `user`: User details.

# Order Routes

### 1. Browse All Orders

- **Route**: `GET /orders`
- **Middleware**:
  - `authenticateToken`: Validates the user's access token.
  - `authorize`: Ensures the user has permission to browse orders.
- **Permission**: `BROWSE_ORDERS`
- **Controller**: `orderController.browseOrders`
- **Description**: Retrieves all orders in the system.
- **Response**: 
  - **Status Code**: 200 OK
  - **Body**: Array of order objects.

### 2. Browse Orders by User

- **Route**: `GET /order`
- **Middleware**:
  - `authenticateToken`: Validates the user's access token.
  - `authorize`: Ensures the user has permission to read their own orders.
- **Permission**: `READ_ORDER`
- **Controller**: `orderController.browseOrderByUser`
- **Description**: Retrieves all orders associated with the authenticated user.
- **Response**: 
  - **Status Code**: 200 OK
  - **Body**: Array of order objects.

### 3. Checkout

- **Route**: `POST /order`
- **Middleware**:
  - `authenticateToken`: Validates the user's access token.
  - `authorize`: Ensures the user has permission to add orders.
- **Permission**: `ADD_ORDER`
- **Controller**: `orderController.checkout`
- **Description**: Initiates the checkout process to create a new order.
- **Request Body**:
  - Details of the order to be created.
- **Response**: 
  - **Status Code**: 200 OK
  - **Body**: Details of the created order.

 # Cart Routes

### 1. Get Cart by User

- **Route**: `GET /cart`
- **Middleware**:
  - `authenticateToken`: Verifies the authenticity of the user's token.
  - `authorize`: Ensures the user has the necessary permission to access the cart.
- **Permission**: `READ_CART`
- **Controller**: `cartController.readCart`
- **Description**: Retrieves the cart items associated with the authenticated user.
- **Response**: 
  - **Status Code**: 200 OK
  - **Body**: 
    - `carts`: Array of cart items.
    - `total`: Total price of all items in the cart.
    - `total_items`: Total number of items in the cart.

### 2. Add Products to Cart

- **Route**: `POST /cart`
- **Middleware**:
  - `authenticateToken`: Verifies the authenticity of the user's token.
  - `authorize`: Ensures the user has the necessary permission to add items to the cart.
- **Permission**: `ADD_CART`
- **Controller**: `cartController.addToCart`
- **Description**: Adds products to the user's cart.
- **Request Body**:
  - `product_id`: ID of the product to be added.
  - `quantity`: Quantity of the product to be added.
- **Response**: 
  - **Status Code**: 200 OK
  - **Body**: Details of the added product in the cart.

### 3. Delete Cart by User

- **Route**: `DELETE /cart`
- **Middleware**:
  - `authorize`: Ensures the user has the necessary permission to delete items from the cart.
- **Permission**: `DELETE_CART`
- **Controller**: `cartController.deleteCart`
- **Description**: Deletes cart items associated with the authenticated user.
- **Request Body**:
  - `product_id`: ID of the product to be deleted.
- **Response**: 
  - **Status Code**: 200 OK
  - **Body**: Confirmation of deletion.
 
# Payment Route

### 1. Process Payment

- **Route**: `POST /pay`
- **Middleware**:
  - `authenticateToken`: Verifies the authenticity of the user's token.
  - `authorize`: Ensures the user has the necessary permission to edit orders.
  - `encryption`: Encrypts sensitive payment information.
- **Permission**: `EDIT_ORDER`
- **Controller**: `paymentController.pay`
- **Description**: Initiates the payment process for an order.
- **Request Body**:
  - Encrypted payment information.
- **Response**: 
  - **Status Code**: 200 OK
  - **Body**: Confirmation of successful payment.

 # Product Routes

 ### 1. Browse Products

- **Route**: `GET /products`
- **Controller**: `productController.browseProducts`
- **Description**: Retrieves all products available in the system.
- **Response**: 
  - **Status Code**: 200 OK
  - **Body**: Array of product objects.

### 2. Search Products

- **Route**: `GET /products/search`
- **Controller**: `productController.searchProducts`
- **Description**: Searches for products based on provided query parameters.
- **Query Parameters**:
  - `query`: The search query.
- **Response**: 
  - **Status Code**: 200 OK
  - **Body**: Array of product objects matching the search query.

### 3. Get Product by ID

- **Route**: `GET /products/:id`
- **Controller**: `productController.readProduct`
- **Description**: Retrieves a specific product by its ID.
- **Path Parameters**:
  - `id`: ID of the product to retrieve.
- **Response**: 
  - **Status Code**: 200 OK
  - **Body**: Details of the product.

### 4. Create Product

- **Route**: `POST /products`
- **Middleware**:
  - `authenticateToken`: Verifies the authenticity of the user's token.
  - `authorize`: Ensures the user has the necessary permission to add products.
- **Permission**: `ADD_PRODUCT`
- **Controller**: `productController.addProduct`
- **Description**: Adds a new product to the system.
- **Request Body**:
  - Details of the product to be created.
- **Response**: 
  - **Status Code**: 200 OK
  - **Body**: Details of the created product.

### 5. Update Product

- **Route**: `PUT /products/:id`
- **Middleware**:
  - `authenticateToken`: Verifies the authenticity of the user's token.
  - `authorize`: Ensures the user has the necessary permission to edit products.
- **Permission**: `EDIT_PRODUCT`
- **Controller**: `productController.editProduct`
- **Description**: Updates an existing product in the system.
- **Path Parameters**:
  - `id`: ID of the product to update.
- **Request Body**:
  - New details of the product.
- **Response**: 
  - **Status Code**: 200 OK
  - **Body**: Details of the updated product.

### 6. Delete Product

- **Route**: `DELETE /products/:id`
- **Middleware**:
  - `authenticateToken`: Verifies the authenticity of the user's token.
  - `authorize`: Ensures the user has the necessary permission to delete products.
- **Permission**: `DELETE_PRODUCT`
- **Controller**: `productController.deleteProduct`
- **Description**: Deletes a product from the system.
- **Path Parameters**:
  - `id`: ID of the product to delete.
- **Response**: 
  - **Status Code**: 200 OK
  - **Body**: Confirmation of deletion.
 
# User Routes

### 1. Browse Users

- **Route**: `GET /user`
- **Controller**: `userController.browseUsers`
- **Description**: Retrieves all users in the system.
- **Response**: 
  - **Status Code**: 200 OK
  - **Body**: Array of user objects.

### 2. Register New User

- **Route**: `POST /user`
- **Middleware**:
  - `validateRegister`: Validates the registration request body.
- **Controller**: `userController.register`
- **Description**: Registers a new user in the system.
- **Request Body**:
  - Details of the user to be registered.
- **Response**: 
  - **Status Code**: 200 OK
  - **Body**: Details of the registered user.

### 3. Read User by ID

- **Route**: `GET /user/:id`
- **Middleware**:
  - `authenticateToken`: Verifies the authenticity of the user's token.
  - `authorize`: Ensures the user has permission to read user details.
- **Permission**: `READ_USER`
- **Controller**: `userController.readUser`
- **Description**: Retrieves details of a specific user by their ID.
- **Path Parameters**:
  - `id`: ID of the user to retrieve.
- **Response**: 
  - **Status Code**: 200 OK
  - **Body**: Details of the user.

### 4. Update User by ID

- **Route**: `PUT /user/:id`
- **Middleware**:
  - `authenticateToken`: Verifies the authenticity of the user's token.
  - `authorize`: Ensures the user has permission to edit user details.
- **Permission**: `EDIT_USER`
- **Controller**: `userController.editUser`
- **Description**: Updates details of a specific user by their ID.
- **Path Parameters**:
  - `id`: ID of the user to update.
- **Request Body**:
  - New details of the user.
- **Response**: 
  - **Status Code**: 200 OK
  - **Body**: Details of the updated user.










