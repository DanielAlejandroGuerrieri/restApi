const express = require('express');
const app = express();

const cors = require('cors');
const dotEnv = require('dotenv');

const auth = require('./middlewares/auth');

const { getClientsIndurance } = require('./controllers/clientsIndurence');
const { getPoliciesIndurance } = require('./controllers/policiesIndurance');
const { getPolicieById } = require('./controllers/getPoliciesByClientId');

//set env variables
dotEnv.config();
const port = process.env.PORT || 3000;

//cors
app.use(cors());

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/auth', auth.validateToken);

//check if API its alive
app.get('/ping', (req, res) => {
    res.status(200).send('pong');
});


app.post('/login', auth.loginUser);

app.get('/auth/clients', async (req, res) => {
    const clients = await getClientsIndurance(process.env.TOKEN_INSURANCE);
    const getPolicies = await getPoliciesIndurance(process.env.TOKEN_INSURANCE);


    const limit = req.query.limit || 10;
    const name = req.query.name;

    if (!name) {
        const result = clients.splice(0, limit);
        result.forEach(element => {
            element.policies = getPolicieById(element, getPolicies);
        });
        res.status(200).send(result);
    } else {
        const client = clients.find(res => res.name == name);
        if (!client) res.status(404).send({ message: 'Name not found' });

        if (client.role == 'admin') {
            const result = clients.slice(0, limit);
            result.forEach(element => {
                element.policies = getPolicieById(element, getPolicies);
            });

            res.status(200).send(result);
        }

        if (client.role == 'user') {
            client.policies = getPolicieById(client, getPolicies);
            res.status(200).send(client);
        }
    }

});

app.get('/auth/clients/:id', async (req, res) => {
    const id = req.params.id;
    const clients = await getClientsIndurance(process.env.TOKEN_INSURANCE);
    const getPolicies = await getPoliciesIndurance(process.env.TOKEN_INSURANCE);

    if (!id) res.status(404).send({ message: 'Id not found' });

    const client = clients.find(res => res.id == id);

    if (client.role == 'admin') {
        client.policies = getPolicieById(client, getPolicies);
        res.status(200).send(client);
    }

    if (client.role == 'user') {
        client.policies = getPolicieById(client, getPolicies);
        res.status(200).send(client);
    }

});

app.get('/auth/clients/:id/policies', async (req, res) => {
    const id = req.params.id;
    const clients = await getClientsIndurance(process.env.TOKEN_INSURANCE);
    const getPolicies = await getPoliciesIndurance(process.env.TOKEN_INSURANCE);

    if (!id) {
        res.status(400).send({ code: 400, message: 'Bad request' });
    }
    const client = clients.find(res => res.id == id);
    if (!client) {
        res.status(404).send({ code: 404, message: 'Client policies by Id not found' });
    }
    if (client.role == 'admin') {
        const policies = getPolicieById(client, getPolicies, false);
        res.status(200).send(policies);
    }

    if (client.role == 'user') {
        const policies = getPolicieById(client, getPolicies, false);
        res.status(200).send(policies);
    }

});

app.get('/auth/policies', async (req, res) => {
    try {
        const clients = await getClientsIndurance(process.env.TOKEN_INSURANCE);
        const client = clients.find(el => el.name == req.body.username);

    } catch (error) {
        
    }
    


});

app.get('/auth/policies/:id', async (req, res) => {

});

app.listen(port, () => {
    console.log(`API REST running in http://localhost:${port}`);
});