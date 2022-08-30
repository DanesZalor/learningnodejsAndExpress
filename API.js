const Express = require('express')();

const Accounts = require('./controller/AccountController.js');


Express.get('/api/accounts', function (req, res) {
    Accounts.getAll(function (result) {
        res.send(result);
    });
});

Express.listen(8000, function () {
    console.log('listening on port 8000');
});