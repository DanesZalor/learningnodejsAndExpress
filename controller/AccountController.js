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

module.exports.getAll = function () {

    return new Promise((resolve, reject) => {
        SQLConn.Query("SELECT * FROM account", (result) => {
            resolve(result);
        });
    });
};

module.exports.get = function (user, onSuccess) {
    SQLConn.Query(`SELECT * FROM account WHERE username='${user}'`, onSuccess);
};

module.exports.create = function (onSuccess, params) {

}