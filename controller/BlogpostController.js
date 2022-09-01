const SQLConn = require('./sqlconn.js');

module.exports.getAll = async () => {
    return await SQLConn.Query("SELECT * FROM blogpost");
}

module.exports.getAllFrom = async (user) => {

    return await SQLConn.Query(`SELECT * FROM blogpost WHERE poster='${user}'`);
}

module.exports.get = async (user, time) => {
    return await SQLConn.Query(`SELECT * FROM blogpost WHERE poster='${user}' AND postTime='${time}'`);
}

module.exports.create = async (user, content) => {

}