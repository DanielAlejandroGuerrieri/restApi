const express = require('express');
const router = express.Router();

const { getClientsIndurance } = require('../controllers/clientsIndurence');
const { getPoliciesIndurance } = require('../controllers/policiesIndurance');
const { getPolicieById } = require('../controllers/getPoliciesByClientId');

router.get('/', async (req, res) => {
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

router.get('/:id', async (req, res) => {
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

module.exports = router;