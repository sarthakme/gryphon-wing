CREATE TABLE orders_products (
	order_id int REFERENCES orders(id),
	product_id int REFERENCES products(id),
	quantity int,
	PRIMARY KEY(order_id, product_id)
);