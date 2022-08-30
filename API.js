const EXPRESS = require('express');
var Express = EXPRESS();
Express.use(EXPRESS.json());

const Accounts = require('./controller/AccountController.js');

Express.get('/api/accounts', async function (req, res) {

    let result = await Accounts.getAll();
    res.status(200).send(result);

});

Express.get('/api/account/:id', (req, res) => {
    Accounts.get(req.params.id, function (result) {
        if (result.length <= 0) res.status(404).send({ msg: "user not found" });
        else res.status(200).send(result);
    });
});

Express.post('/api/accounts', (req, res) => {

    let msg = { errors: Accounts.validate(req.body) };

    if (msg.errors.length > 0)
        res.status(406).send(errors);

    else {

    }

});

Express.listen(8000, function () {
    console.log('listening on port 8000');
});