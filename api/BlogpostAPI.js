const EXPRESS = require('express');


const Blogposts = require('../controller/BlogpostController.js');
const Accounts = require('../controller/AccountController.js');
const getBasicAuth = require(`./b64auth.js`).getB64Auth;

module.exports.BlogpostAPI = EXPRESS();
this.BlogpostAPI.use(EXPRESS.json());

const userExists = async (user, res) => {
    if (JSON.stringify(await Accounts.get(user)) == "{}") {
        res.status(404).send({ error: `user:${user} not found` });
        return false;
    }
    else return true;
}

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

    const credentials = getBasicAuth(req);

    if (!(await Accounts.login(credentials.username, credentials.password)))
        res.status(401).send({ error: "unauthorized" });

    else if (req.body.content == null || req.body.content.length == 0)
        res.status(403).send({ error: "content required" });

    else {
        await Blogposts.create(credentials.username, req.body.content);
        res.status(201).send({ msg: 'successfully posted blogpost' });
    }
});

this.BlogpostAPI.delete('/api/blogpost/:user/:time', async (req, res) => {

    const credentials = getBasicAuth(req);

    if (
        !(await Accounts.login(credentials.username, credentials.password)) ||
        (credentials.username != req.params.user)
    )
        res.status(401).send({ error: "unauthorized" });

    else if ((await Blogposts.get(credentials.username, req.params.time)).length == 0)
        res.status(404).send({ error: 'post not found' });

    else {
        await Blogposts.delete(credentials.username, req.params.time);
        res.status(200).send({ msg: 'post deleted successfully' });
    }
});