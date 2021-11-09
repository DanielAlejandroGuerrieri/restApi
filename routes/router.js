const express = require('express');
const router = express.Router();

const clientsService = require('../services/clients');
const policiesService = require('../services/policies');

router.use('/clients', clientsService);
router.use('/policies', policiesService);

module.exports = router;

