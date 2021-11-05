const express = require('express');
const router = express.Router();

const { getClientsIndurance } = require('../controllers/clientsIndurence');
const { getPoliciesIndurance } = require('../controllers/policiesIndurance');
const { getPolicieById } = require('../controllers/getPoliciesByClientId');

router.get('/', async (req, res) => {
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

router.get('/:id', async (req, res) => {
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

router.get('/:id/policies', async (req, res) => {
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

module.exports = router;