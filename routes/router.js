const express = require('express');
const router = express.Router();

const clients = require('../services/clients');
const policies = require('../services/policies');

router.use('/clients', clients);
router.use('/policies', policies);

module.exports = router;

