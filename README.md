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


