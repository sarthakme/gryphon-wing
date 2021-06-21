## Storefront Backend

The backend for an e-commerce store. When it recieves requests, it sends out an appropriate response in the form of JSON. The user of the website can perform many actions including viewing all objects on sale and adding some of them to their cart. Though, some actions may require the user to sign up or log in. Upon this, they will recieve a JWT. They need to add this JWT to subsequant requests' headers to access the gatekept resources.

## Instructions

To install dependencies: npm install

To setup the database: npm run setup

To start the server: npm run start
The server will start on port 3000.

To run tests: npm run test

Submitting ENV=test did not work in my environment, so I added  script to change the environment variable directly in the file before and after running the tests

## .env variable names -

POSTGRES_HOST: PostgreSQL host address - 127.0.0.1

POSTGRES_DB: PostgreSQL development database name - orders_dev

POSTGRES_TEST_DB: PostgreSQL testing database name - orders_test

POSTGRES_USER: PostgreSQL username

POSTGRES_PASSWORD: PostgreSQL password

ENV: Environment - dev for development | test for testing

BCRYPT_PASSWORD: Pepper value for bcrypt - pepper

SALT_ROUNDS: Number of salting rounds for bcrypt - 10

TOKEN_SECRET: JWT secret - metric