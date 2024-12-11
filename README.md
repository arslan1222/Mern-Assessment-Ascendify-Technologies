# Mern-Assessment-Ascendify-Technologies

This repository contains a Task Management API built with Node.js, Express.js, and MongoDB, designed for efficient and secure task handling. It supports CRUD operations on tasks and includes user authentication via JWT to protect sensitive routes.

Tasks are stored in a MongoDB database with a schema including title, description, completion status, and timestamps. Public routes allow fetching tasks, while authenticated users can create, update, or delete them. Middleware ensures JWT validation, error handling, and smooth request management.

The API uses modern practices like environment variables, modular architecture, and centralized route management for scalability and maintainability. It is easy to set up, with clear setup instructions and Postman support for testing.

# Steps
## Clone the repository
Open your terminal and run the following commands to clone the repository and navigate into the project folder:

`git clone <repository-url>`
`cd <repository-folder>`

## Install dependencies
`npm insatall`

## Set up environment variables
`PORT=<any>`
`JWT_SECRET = <MYSECRET>
JWT_EXPIRY = <1d>`

## Start server
`npm run dev`

And use tne postman for according to the APIs.

# Example Requests and Responses for Each Endpoint
## Register or Sign Up
{
  "fullname": "yourname",
  "email": "test@example.com",
  "password": "123456"
}


## User login

{
  "email": "your@example.com",
  "password": "any123456"
}

and fetch all tasks, add task, update task, delete task acoordingly.





