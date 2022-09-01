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

module.exports.getAll = async () => {
    return await SQLConn.Query("SELECT * FROM account");
};

module.exports.get = async (user) => {

    let result = await SQLConn.Query(`SELECT * FROM account WHERE username='${user}'`);
    return result.length == 0 ? {} : result[0];
}

module.exports.create = async (username, password) => {

    if (JSON.stringify(await this.get(username)) == "{}") {
        await SQLConn.Query(`INSERT INTO account (username, password) VALUES ('${username}', '${password}')`);
        return { success: true };
    } else
        return { success: false, status: 403, error: `${username} already exists` };

}

module.exports.delete = async (username, password) => {

    let result = await this.get(username);

    if (JSON.stringify(result) == "{}")
        return { success: false, status: 404, error: `${username} does not exist` };

    else if (result.password != password)
        return { success: false, status: 401, error: "wrong password" };

    else {
        await SQLConn.Query(`DELETE FROM account WHERE username='${username}' AND PASSWORD='${password}'`);
        return { success: true };
    }
}