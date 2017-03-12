## User API

This is a simple API built with Node.js

## To Install

* Clone this project
* Run `npm install`


## Testing
I tested Api using
* [Should](https://shouldjs.github.io/) and [Mocha](https://mochajs.org/).
* For the end to end testing I used [Supertest](https://github.com/visionmedia/supertest).
* Test Coverage using [Istanbul](http://gotwarlost.github.io/istanbul/)

To run the tests
* run `mocha` for tests without coverage
* run `npm test` to test with code coverage


## Usage Instructions

* Run `npm start`

The API routes can with Postman:
Use `http://localhost:3000/api/v1` as base URL

* List users GET `/users/`
* Single user GET `/users/:id`
* Create user POST `/users/` with parameters **email**, **forename**, **surname** passed as a JSON object
* Update user PATCH `/users/:id` with the parameters you want to change
* Delete user DELETE `/users/:id`
* Search users GET `/users/search?q=:term` it searches for the term in the **forename** and **surname** fields

A user's id is `:id`
Search term is  `:term`

## Validations

* Minimal validation on the **email** and **id** fields
