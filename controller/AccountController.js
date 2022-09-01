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
};

module.exports.login = async (username, password) => {
    let result = await SQLConn.Query(`SELECT * FROM account WHERE username='${username}' AND password='${password}'`);
    return result.length > 0;
}


module.exports.getAll = async () => {
    return await SQLConn.Query("SELECT * FROM account");
};

module.exports.get = async (user) => {

    let result = await SQLConn.Query(`SELECT * FROM account WHERE username='${user}'`);
    return result.length == 0 ? {} : result[0];
};

module.exports.create = async (username, password) => {

    return SQLConn.Query(`INSERT INTO account (username, password) VALUES ('${username}', '${password}')`);
};

module.exports.delete = async (username) => {

    // some code to delete all dependent data of this foreign key

    return SQLConn.Query(`DELETE FROM account WHERE username='${username}'`);
};