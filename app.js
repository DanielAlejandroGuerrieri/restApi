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
    try {
        const clients = await getClientsIndurance();
    const getPolicies = await getPoliciesIndurance();

    const limit = isNaN(Number(req.query.limit)) ? 10 : req.query.limit;
    const name = req.query.name;

    if (!name) {
        const result = clients.splice(0, limit);
        result.forEach(element => {
            element.policies = getPolicieById(element, getPolicies);
        });
        res.status(200).send(result);
    } else {
        const client = clients.find(res => res.name == name);
        if (!client) throw {status: 404, message: 'Name not found'}

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
    } catch (error) {
        res.status(error.status).send({ code: error.status, message: error.message});
    }

});

app.get('/auth/clients/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const clients = await getClientsIndurance();
        const getPolicies = await getPoliciesIndurance();
    
        if (!id) throw {status: 404, message: 'Id not found'}
    
        const client = clients.find(res => res.id == id);
    
        if (client.role == 'admin') {
            client.policies = getPolicieById(client, getPolicies);
            res.status(200).send(client);
        }
    
        if (client.role == 'user') {
            client.policies = getPolicieById(client, getPolicies);
            res.status(200).send(client);
        }
    } catch (error) {
        res.status(error.status).send({ code: error.status, message: error.message});
    }

});

app.get('/auth/clients/:id/policies', async (req, res) => {
    try {
        const id = req.params.id;
        const clients = await getClientsIndurance();
        const getPolicies = await getPoliciesIndurance();
    
        if (!id) {
            throw {status: 400, message: 'Bad request'}
        }
        const client = clients.find(res => res.id == id);
        if (!client) {
            throw { status: 404, message: 'Client policies by Id not found'}
        }
        if (client.role == 'admin') {
            const policies = getPolicieById(client, getPolicies, false);
            res.status(200).send(policies);
        }
    
        if (client.role == 'user') {
            const policies = getPolicieById(client, getPolicies, false);
            res.status(200).send(policies);
        }
    } catch (error) {
        res.status(error.status).send({ code: error.status, message: error.message});
    }

});

app.get('/auth/policies', async (req, res) => {
    const limit = isNaN(Number(req.query.limit)) ? 10 : req.query.limit; 
    try {
        const clients = await getClientsIndurance();
        const client = clients.find(el => el.name == req.body.username);
        const policies = await getPoliciesIndurance();
        
        if(req.body.role == 'admin') {
            const result = policies.splice(0, limit);
            res.status(200).send(result)
        }
        if(req.body.role == 'user') {
            const result = getPolicieById(client, policies, false);
            res.status(200).send(result);
        }

    } catch (error) {
        res.status(500).send({ code: 500, message: 'Unexpected error'});
    }
});

app.get('/auth/policies/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const clients = await getClientsIndurance();
        const client = clients.find(el => el.id == id);
        const policies = await getPoliciesIndurance();
        
        if(client.role == 'admin') {
            res.status(200).send(policies);
        }
        if(client.role == 'user') {
            const result = getPolicieById(client, policies, false);
            res.status(200).send(result);
        }

    } catch (error) {
        res.status(500).send({ code: 500, message: 'Unexpected error'});
    }
});


app.listen(port, () => {
    console.log(`API REST running in http://localhost:${port}`);
});