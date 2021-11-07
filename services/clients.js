const express = require('express');
const router = express.Router();

const { getClientsInsurance } = require('../controllers/clientsInsurance');
const { getPoliciesInsurance } = require('../controllers/policiesInsurance');
const { getPolicieById } = require('../controllers/getPoliciesByClientId');

router.get('/', async (req, res) => {
    const role = req.body.role;
    try {
        const clients = await getClientsInsurance();
        const getPolicies = await getPoliciesInsurance();

        const limit = isNaN(Number(req.query.limit)) ? 10 : req.query.limit;
        const name = req.query.name;

        if (name) {
            const client = clients.find(el => el.name == name);
            if (!client) throw { status: 404, message: 'Name not found' }

            client.policies = getPolicieById(client, getPolicies);
            res.status(200).send(client);

        } else {

            if (role == 'admin') {
                const result = clients.splice(0, limit);
                result.forEach(element => {
                    element.policies = getPolicieById(element, getPolicies);
                });

                res.status(200).send(result);
            }

            if (role == 'user') {
                client.policies = getPolicieById(client, getPolicies);
                res.status(200).send(client);
            }
        }
    } catch (error) {
        res.status(error.status).send({ code: error.status, message: error.message });
    }

});

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const clients = await getClientsInsurance();
        const getPolicies = await getPoliciesInsurance();

        if (!id) throw {
            status: 400, message: 'You must enter an id'
        }

        const client = clients.find(res => res.id == id);
        if (!client) throw {
            status: 404, message: 'Client not found'
        }

        if (client.role == 'admin') {
            client.policies = getPolicieById(client, getPolicies);
            res.status(200).send(client);
        }

        if (client.role == 'user') {
            client.policies = getPolicieById(client, getPolicies);
            res.status(200).send(client);
        }
    } catch (error) {
        res.status(error.status).send({ code: error.status, message: error.message });
    }

});

router.get('/:id/policies', async (req, res) => {
    try {
        const id = req.params.id;
        const clients = await getClientsInsurance();
        const getPolicies = await getPoliciesInsurance();

        if (!id) {
            throw { status: 400, message: 'Bad request' }
        }
        const client = clients.find(res => res.id == id);
        if (!client) {
            throw { status: 404, message: 'Client policies by Id not found' }
        }
        if (client.role == 'admin') {
            const policies = getPolicieById(client, getPolicies, true);
            res.status(200).send(policies);
        }

        if (client.role == 'user') {
            const policies = getPolicieById(client, getPolicies, true);
            res.status(200).send(policies);
        }
    } catch (error) {
        res.status(error.status).send({ code: error.status, message: error.message });
    }

});

module.exports = router;