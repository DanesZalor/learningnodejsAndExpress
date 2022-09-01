I am using a preexisting database to communicate with for this REST API.

### SQL Setup
```SQL
CREATE TABLE account (
    username varchar(50),
    password varchar(50),
    PRIMARY KEY (username)
);

CREATE TABLE blogpost {
    postTime datetime,
    poster varchar(50),
    content varchar(1000),
    FOREIGN KEY (poster) REFERENCES account (username),
    PRIMARY KEY (postTime, poster)
};
```

### Project Structure
```
ProjectFolder
├── api
│   ├── AccountAPI.js
│   ├── BlogpostAPI.js
│   └── index.js
├── controller
│   ├── AccountController.js
│   ├── BlogpostController.js
│   └── sqlconn.js
├── index.js
```
`controller/` contains `___Controller` modules that will be responsible for communicating with the assigned table. `controller/sqlconn.js` is just a module for submitting queries which the controller modules will use.<br>

`api/` contains modules that contains the routing segregated by resource. API modules use Controller modules.

### API endpoints
|path||
|-|-|
|GET `/api/accounts`|all accounts and their details|
|GET `/api/account/<username>`|gets the account details of the specified user|
|POST `/api/accounts`<br> <sub><sup>{username:str password:str confirmPassword:str}</sup></sub>|creates a new user with the specified details|