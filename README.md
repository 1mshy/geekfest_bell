# Password Manager with React & Node.js for GeekFest Bell 2023

## How to run the project

### Prerequisites
1. Install [Node.js](https://nodejs.org/en/download/)
2. Install [MongoDB](https://docs.mongodb.com/manual/installation/)
3. Install [Git](https://git-scm.com/downloads)

Type the following commands in your terminal:
1. `git clone <repo_url>`
2. `cd <your_directory_to_repo>`
3. `npm install`
4. `npm start`
5. `cd server`
6. `set .env variables`
7. `node app.js`
8. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Description
This is a simple web-based password manager that allows users to store their passwords in a local Mongo Database. The user interacts with a React frontend that suggests strong passwords and posts them to the backend. The backend is an express server that receives the password and encrypts it using bcrypt before storing it in the database. 

## Features
- User can enter any password to get recommendations on how to make it stronger
- User can store passwords in a database
- User can view all recommended passwords

