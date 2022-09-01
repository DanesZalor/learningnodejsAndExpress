const EXPRESS = require('express');
const Blogposts = require('../controller/BlogpostController.js');
const Accounts = require('../controller/AccountController.js');

module.exports.BlogpostAPI = EXPRESS();
this.BlogpostAPI.use(EXPRESS.json());

this.BlogpostAPI.get('/api/blogposts', async (req, res) => {
    res.status(200).send(await Blogposts.getAll());
});

this.BlogpostAPI.get('/api/blogpost/:user', async (req, res) => {

    if (JSON.stringify(await Accounts.get(req.params.user)) == "{}")
        res.send(404).status({ error: `user:${req.params.user} not found` });

    else
        res.status(200).send(await Blogposts.get(req.params.user));

});

this.BlogpostAPI.post('/api/blogposts', async (req, res) => {

});