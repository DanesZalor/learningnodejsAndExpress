const EXPRESS = require('express');
const Accounts = require('../controller/AccountController.js');

module.exports.AccountsAPI = EXPRESS();
this.AccountsAPI.use(EXPRESS.json());

this.AccountsAPI.get('/api/accounts', async (req, res) => {

    let result = await Accounts.getAll();
    res.status(200).send(result);
});

this.AccountsAPI.get('/api/account/:username', async (req, res) => {

    let result = await Accounts.get(req.params.username);

    if (result.length == 0) res.status(404).send({ msg: `${req.params.username} not found` });
    else res.status(200).send(result);
});

this.AccountsAPI.post('/api/accounts', async (req, res) => {

    let errors = Accounts.validate(req.body);

    if (errors.length > 0)
        res.status(406).send({ errors: errors });

    else {

        if (JSON.stringify(await Accounts.get(req.body.username)) == "{}") {
            await Accounts.create(req.body.username, req.body.password);
            res.status(201).send({ msg: `${req.body.username} created successfully` });
        }
        else res.status(403).send({ error: `${req.body.username} already exists` });

    }
});

this.AccountsAPI.delete('/api/account/:username', async (req, res) => {

    if (req.body.password == null)
        res.status(401).send({ error: 'password required' });

    else {
        if ((await Accounts.get(req.params.username)).password != req.body.password)
            res.status(401).send({ error: 'unauthorized' });

        else {
            await Accounts.delete(req.params.username);
            res.status(200).send({ msg: `user:${req.params.username} deleted successfully` });
        }
    }
});
