const SQLConn = require('./sqlconn.js');

module.exports.validate = function (reqparams) {
    let errors = [];

    if (reqparams.username == null)
        errors.push("username is required");

    if (reqparams.password == null)
        errors.push("password is required");

    if (reqparams.confirmPassword == null)
        errors.push("confirmPassword is required");

    if (
        reqparams.password != null && reqparams.confirmPassword != null &&
        reqparams.password != reqparams.confirmPassword
    )
        errors.push("password and confirmPassword must match");

    return errors;
}

module.exports.getAll = () => {

    return new Promise((resolve, reject) => {
        SQLConn.Query("SELECT * FROM account", (result) => {
            resolve(result);
        });
    });
};

module.exports.get = (user) => {

    return new Promise((resolve, reject) => {
        SQLConn.Query(`SELECT * FROM account WHERE username='${user}'`, (result) => {
            resolve(result);
        });
    });
}

module.exports.create = function (username, password) {

    return new Promise((resolve, reject) => {
        SQLConn.Query(`INSERT INTO account (username, password) VALUES ('${username}', '${password}')`, (result) => {
            resolve({ success: true });
        });
    })
}

module.exports.delete = function (username, password) {

    return new Promise((resolve, reject) => {
        SQLConn.Query(`DELETE FROM account WHERE username='${username}' AND password='${password}'`, (result) => {
            resolve({ success: true });
        });
    })
}