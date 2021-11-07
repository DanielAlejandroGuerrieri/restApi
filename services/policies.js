const express = require('express');
const router = express.Router();

const { getClientsInsurance } = require('../controllers/clientsInsurance');
const { getPoliciesInsurance } = require('../controllers/policiesInsurance');
const { getPolicieById } = require('../controllers/getPoliciesByClientId');

router.get('/', async (req, res) => {
    const limit = isNaN(Number(req.query.limit)) ? 10 : req.query.limit; 
    try {
        const clients = await getClientsInsurance();
        const client = clients.find(el => el.name == req.body.username);
        const policies = await getPoliciesInsurance();
        
        if(req.body.role == 'admin') {
            const result = policies.splice(0, limit);
            res.status(200).send(result)
        }
        if(req.body.role == 'user') {
            const result = getPolicieById(client, policies, false);
            res.status(200).send(result);
        }

    } catch (error) {
        console.error(error);
        res.status(500).send({ code: 500, message: 'Unexpected error'});
    }
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const policies = await getPoliciesInsurance();
        const policie = policies.find(el => el.id == id);
        if(!policie) {
            throw {
                status: 404,
                message: 'Policie not found'
            }
        }
        res.status(200).send(policie);

    } catch (error) {
        res.status(error.status).send({ code: error.status, message: error.message});
    }
});

module.exports = router;