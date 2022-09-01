const EXPRESS = require('express');
const Blogposts = require('../controller/BlogpostController.js');
const Accounts = require('../controller/AccountController.js');

module.exports.BlogpostAPI = EXPRESS();

const userExists = async (user, res) => {
    if (JSON.stringify(await Accounts.get(user)) == "{}") {
        res.status(404).send({ error: `user:${user} not found` });
        return false;
    }
    else return true;
}

this.BlogpostAPI.use(EXPRESS.json());

this.BlogpostAPI.get('/api/blogposts', async (req, res) => {
    res.status(200).send(await Blogposts.getAll());
});

this.BlogpostAPI.get('/api/blogposts/:user', async (req, res) => {

    if (await userExists(req.params.user, res))
        res.status(200).send(await Blogposts.getAllFrom(req.params.user));

});

this.BlogpostAPI.get('/api/blogpost/:user/:time', async (req, res) => {

    if (await userExists(req.params.user, res)) {
        let result = await Blogposts.get(req.params.user, req.params.time);

        if (result.length == 0)
            res.status(404).send({ error: "blogpost not found" });
        else
            res.status(200).send(result[0]);
    }

});

this.BlogpostAPI.post('/api/blogposts', async (req, res) => {

});