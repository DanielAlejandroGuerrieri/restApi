
# REST API

_This is the solution to the challenge of making a REST API as middleware._


### Pre-requisitos 📋

_you must have NodeJs installed and run the next command for install all packages_

```
npm i
```


## Getting started 🚀

_With the next intructions, you can run the file app.js in the local server in development environment, from the command console and in the root of the project, you must write:_

```
npm run dev
```


### Performance 🔧

_First of all we need to obtain the access token, so you must login and a valid token will be provided_

_You can get the token from this endpoint:_

```
POST/login
```

_To get a list complete of clients:_

```
GET/auth/clients
```

_To get a list complete of clients filters with a limit of values and/or filter by name:_

```
GET/auth/clients?limit=value&name=value
```

```
GET/auth/clients?limit=value
```

```
GET/auth/clients?name=value
```

_To get a list complete of policies by client id:_

```
GET/auth/clients/:id/policies
```

_To get a list complete of policies :_
```
GET/auth/policies
```

_To get a list of policies by policie id:_

```
GET/auth/policies/:policieId
```


## Running the tests ⚙️

_Run the tests with command:_

```
npm run test
```

_To exit from tests press key CTRL+C_



## Build with 🛠️

* [NodeJs]
* [Express]
* [NPM]
* [Jest]
* [Supertest]


## Autores ✒️

_Menciona a todos aquellos que ayudaron a levantar el proyecto desde sus inicios_

* **Daniel A. Guerrieri** - *Backend test* - [daniel.guerrieri@gmail.com](https://github.com/DanielAlejandroGuerrieri)



