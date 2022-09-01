const EXPRESS = require('express');
var Express = EXPRESS();
Express.use(EXPRESS.json());

const Accounts = require('./controller/AccountController.js');

Express.get('/api/accounts', async (req, res) => {

    let result = await Accounts.getAll();
    res.status(200).send(result);
});

Express.get('/api/account/:username', async (req, res) => {

    let result = await Accounts.get(req.params.username);

    if (result.length == 0) res.status(404).send({ msg: `${req.params.username} not found` });
    else res.status(200).send(result);
});

Express.post('/api/accounts', async (req, res) => {

    let errors = Accounts.validate(req.body);

    if (errors.length > 0)
        res.status(406).send({ errors: errors });

    else {
        let result = await Accounts.create(req.body.username, req.body.password);
        if (result.success)
            res.status(201).send({ msg: `user:${req.body.username} created successfully` });
        else
            res.status(result.status).send({ error: result.error });
    }
});

Express.delete('/api/account/:username', async (req, res) => {

    if (req.body.password != null) {

        let result = await Accounts.delete(req.params.username, req.body.password);

        if (!result.success)
            res.status(result.status).send({ error: result.error });
        else
            res.status(200).send({ msg: `${req.params.username} deleted successfully` });


    } else
        res.status(401).send({ error: 'password required' });
});

Express.listen(8000, function () {
    console.log('listening on port 8000');
});