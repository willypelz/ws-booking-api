# WS BOOKING API


----------

# Getting started

## Installation

Clone the repository

    git clone https://github.com/willypelz/ws-booking-api.git


Switch to the repo folder

    cd ws-booking-api.git
    
Install dependencies
    
    npm install

Copy config file and set JsonWebToken secret key

    cp src/config.ts.example src/config.ts
    
----------

## Database

The codebase contains examples of two different database abstractions, namely [TypeORM](http://typeorm.io/) . 
    

----------

##### TypeORM

----------

Create a new mysql database with the name `ws-booking-db`\
(or the name you specified in the ormconfig.json)

Copy TypeORM config example file for database settings

    cp ormconfig.json.example
    
Set mysql database settings in ormconfig.json

    {
      "type": "mysql",
      "host": "localhost",
      "port": 3306,
      "username": "your-mysql-username",
      "password": "your-mysql-password",
      "database": "ws-booking-db",
      "entities": ["src/**/**.entity{.ts,.js}"],
      "synchronize": true
    }
    
Start local mysql server and create new database 'ws-ws-booking-db'

On application start, tables for all entities will be created.

----------

## NPM scripts

- `npm start` - Start application
- `npm run start:watch` - Start application in watch mode
- `npm run test` - run Jest test runner 
- `npm run start:prod` - Build application

----------

## Start application

- `npm start`
- Test api with `http://localhost:3000/api/` in your favourite browser

----------

# Authentication
 
This applications uses JSON Web Token (JWT) to handle authentication. The token is passed with each request using the `Authorization` header with `Token` scheme. The JWT authentication middleware handles the validation and authentication of the token. Please check the following sources to learn more about JWT.

----------
 
# Swagger API docs

This example repo uses the NestJS swagger module for API documentation. [NestJS Swagger](https://github.com/nestjs/swagger) - [www.swagger.io](https://swagger.io/)        


# ::TODO::
Here are what are to be completed. You can pick up this project and work on it or improve it. 
1. Clean up the code and fix the errors,
2. Implement the permission base system for the application Admin/user rights and privileges. 
3. Clean up the test and add more test cases.

