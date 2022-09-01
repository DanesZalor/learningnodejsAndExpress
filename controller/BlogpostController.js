const SQLConn = require('./sqlconn.js');
const Accounts = require('./AccountController.js');

module.exports.getAll = async () => {
    return await SQLConn.Query("SELECT * FROM blogpost");
}

module.exports.get = async (user) => {

    if (JSON.stringify(await Accounts.get(user)) == "{}")
        return { error: `${user} does not exist`, status: 404 };

    else
        return await SQLConn.Query(`SELECT * FROM blogpost WHERE user='${user}'`);
}