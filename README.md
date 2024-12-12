# WHAT IS APPLICATION ABOUT---

This project is a simple web application where users can view and manipulate a 3D (object) a cube 
with zoom, rotation, and position controls. User settings, such as zoom and rotation, are stored in
 the backend...

 #GITHUB---

git clone https://github.com/taaiiiyoo/assignment-backend.git


# INSTALLATION TO RUN THE PROJECT ---
1. backend ---

 Node.js (Runs the backend).

express.js (web framework ,simplifies the process of creating backend).

npm init-y (package.json for backend )

# SOME OTHER DEPENDENCIES FOR BACKEND---

npm init-y .(creates a default package,json).

npm install sqlite3 (for database).

npm install swagger-ui-express (for api documentation).

npm install bcrypt ( To hash and compare passwords securely).

# WORKING OF EACH LIBERARY---

1. How the Backend Works

Express.js: Handles API requests (/login, /settings).

SQLite: Stores user accounts and settings.

Swagger: Documents the backend API endpoints.

# DATABASE SETUP

The backend uses an SQLite database named database.sqlite.( installed sqlite3 )

It includes two tables:

1. Users: Stores user accounts with hashed passwords.


2. User Settings: Stores user-specific settings for the 3D cube (zoom, rotation, and position).

# MANUALLY ADDING NEW USER TO TABLE---

 1. run node hashpass.js in terminal--
   (It will ask for username and password enter them and itd done.)
 2. It will hash the pasword (using bcrypt)..


# API DOCUMENTATION

The backend APIs are documented using Swagger:

Open http://localhost:3000/api-docs to see the API documentation.

# RUNNING THE BACKEND---


1. Start the Backend

1. Go to the backend folder:

cd backend


2. Start the backend server:

node index.js

The backend will run at http://localhost:3000.
