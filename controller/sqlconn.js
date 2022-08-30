var MYSQL = require('mysql');



module.exports.Query = function (sql, onSuccess) {

    const SQLconnection = MYSQL.createConnection({
        host: 'localhost', user: 'djdols', password: 'djdols',
        database: 'php_blog'
    });

    SQLconnection.connect(function (err) {
        if (err) throw err;

        SQLconnection.query(sql, function (err, result) {
            if (err) throw err;
            onSuccess(result);
        })
    });
};




