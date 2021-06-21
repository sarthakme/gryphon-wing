## API Endpoints

#### Products

Index - get /product
Show - get /product/:id
Create - post /product (Token required) id, price required in body
Show 5 most expensive - get /product/show/expensive

#### Users

Index - get /user (Token required)
Show - get /user/:id (Token required)
Create - post /user fname, lname, password required in body
Get token - post /user/in id, password required in body
                          id returned on creation

#### Orders

Show cart - get /order/show/:id (Token required)
Create cart - post /order/create (Token required)
Add to cart - post /order/add (Token required) id, quantity in body
                                               id of product

Ideally, every user should only be able to see their own cart, but from the requirements descriptions, it seems any user can see the cart of any other.

## Data shapes

#### Product

id - serial primary key
name - varchar(50)
price - int

#### User

id - serial primary key
fname - varchar(50)
lname - varchar(50)
password - bytea

#### Order

id - serial primary key
user_id - int references users(id)
status - boolean

#### Orders-Product

order_id - int references orders(id)
product_id - int references products(id)
quantity - int
primary key(order_id, product_id)