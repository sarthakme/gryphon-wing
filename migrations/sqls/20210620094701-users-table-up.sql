CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	fname VARCHAR(50),
	lname VARCHAR(50),
	password bytea
);