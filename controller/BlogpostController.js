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

    const timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
    return await SQLConn.Query(`INSERT INTO blogpost (postTime, poster, content) VALUES ('${timestamp}', '${user}', '${content}')`);
}

module.exports.delete = async (user, timestamp) => {
    return await SQLConn.Query(`DELETE FROM blogpost WHERE poster='${user}' AND postTime='${timestamp}'`);
}