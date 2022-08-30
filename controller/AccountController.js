const SQLConn = require('./sqlconn.js');

module.exports.getAll = function (onSuccess) {
    SQLConn.Query("SELECT * FROM account", onSuccess);
};