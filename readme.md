#Simple CRUD Application
Used technologies:
--
* Node.js
* PostgreSQL
* Express
* Sequelize


API
====
**List products**
* **URL**:
    * /products
* **Method**:
    * `GET`
* **Optional**:
    * ?category=[integer]
    * ?name=[string]
* **Success response**:
    * Code: 200 <br>
      Content: {"status":"ok","data":{...}}


**Create product**
* **URL**:
    * /products/create
* **Method**:
    * `POST`
* **Required**:
    * **Body**:
        * `category_id: [integer]`
        * `name: [string]`
        * `brand: [string]`
        * `is_active: [boolean]`
        * `price: [decimal]`
        * `image: [.jpg or .jpeg]`
* **Success response**:
    * Code: 200 <br>
    Content: {"status":"ok","data":{...}}
* **Error response**:
    * Content: {"status":"error", "message": "Error message"}


**Update product**
* **URL**:
    * /products/update
* **Method**:
    * `PUT`
* **Required**:
    * **Body**:
        * `product_id=[integer]`
    
* **Success response**:
    * Code: 200<br>
        Content: {"status":"ok","data":{...}}