const MYSQL = require('mysql');

const SQLconnection = MYSQL.createConnection({
    host: 'localhost', user: 'djdols', password: 'djdols',
    database: 'php_blog'
});

module.exports.Query = function (sql, onSuccess) {

    SQLconnection.connect(function (err) {
        if (err) throw err; console.log("Connected");

        SQLconnection.query(sql, function (err, result) {
            if (err) throw err;
            onSuccess(result);
        })
    });
};




