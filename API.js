const EXPRESS = require('express');
var Express = EXPRESS();
Express.use(EXPRESS.json());

const Accounts = require('./controller/AccountController.js');

Express.get('/api/accounts', async (req, res) => {

    let result = await Accounts.getAll();
    res.status(200).send(result);
});

Express.get('/api/account/:id', async (req, res) => {

    let result = await Accounts.get(req.params.id);

    if (result.length == 0) res.status(404).send({ msg: `${req.params.id} not found` });
    else res.status(200).send(result);
});

Express.post('/api/accounts', async (req, res) => {

    let msg = { errors: Accounts.validate(req.body) };

    if (msg.errors.length > 0)
        res.status(406).send(msg.errors);

    else {

        if ((await Accounts.get(req.body.username)).length > 0)
            res.status(400).send({ error: `${req.body.username} already exists.` });

        else {

            if (await Accounts.create(req.body.username, req.body.password).success)
                res.status(201).send({ msg: 'registered successfully' });
            else
                res.status(500).send({ msg: 'something went wrong' });
        }
    }
});

Express.delete('/api/accounts', async (req, res) => {

});

Express.listen(8000, function () {
    console.log('listening on port 8000');
});