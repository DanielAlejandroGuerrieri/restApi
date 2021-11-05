# REST API

## For initialiaze the server go to the root directory and type the command:

npm run start

##

In this API you can make customer inquiries and their policies.

For this I leave the collection of routes and queries in Postman, in the following link:
https://www.getpostman.com/collections/ef53aa3695c50c302652


To access the different routes, you must enter the '/login' with this body:
  { 
    "username": "Britney",
    "password": "s3cr3t"
  }

and use it as a header:
"Authorization": "Bearer $ {token}"
In the alls routes.

The servers run in http://localhost:8080 for defect, will be change in the file .env







