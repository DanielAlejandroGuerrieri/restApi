
# REST API

_This is the solution to the challenge of making a REST API as middleware._


### Pre-requisitos 📋

_you must have NodeJs installed and run the next command for install all packages_

```
npm i
```


## Getting started 🚀

_With the next intructions, you can run the file app.js in the local server, from the command console and in the root of the project, you must write:_

```
npm run start
```



### Performance 🔧

_First of all we need to obtain the access token, so you must login and a valid token will be provided_

_You can get the token from the next endpoint:_

```
POST/login
```

_With a request body in the following format:_

```
{
    "username": "string",
    "password": "string"
}
```
#### Example:
    For an admin is: 
```
    {
        "username": "Britney",
        "password": "s3cr3t"
    }
```

    For an user is: 
```
    {
        "username": "Barnett",
        "password": "s3cr3t"
    }
```

The type of response is:
```
    {
        "token": "string",
        "type": Bearer,
        "expires_in": 3600
    }
```
You must send this token in the Authorization header when making requests to protected resources, like this: 

```
Authorization: Bearer <token>
```

_To get a list complete of clients:_

```
GET/clients
```

_To get a list complete of clients filters with a limit of values and/or filter by name:_

```
GET/clients?limit=value&name=value
```

```
GET/clients?limit=value
```

```
GET/clients?name=value
```

_To get a client by id:_

```
GET/clients/:id
```

_To get a list complete of policies by client id:_

```
GET/clients/:id/policies
```

_To get a list complete of policies :_
```
GET/policies
```

_To get a list of policies by policie id:_

```
GET/policies/:policieId
```



## Running the tests ⚙️

_Run the tests with command:_

```
npm run test
```



## Build with 🛠️

* [NodeJs]
* [Express]
* [NPM]
* [Nodemon]
* [Jest]
* [Supertest]


## Autores ✒️

* **Daniel A. Guerrieri** - *Backend test* - [daniel.guerrieri@gmail.com](https://github.com/DanielAlejandroGuerrieri)



