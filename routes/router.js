const express = require('express');
const router = express.Router();

const clientsService = require('../services/clients');
const policiesService = require('../services/policies');
const { cacheInit } = require('../middlewares/cache');

router.use('/clients', cacheInit,  clientsService);
router.use('/policies', cacheInit, policiesService);

module.exports = router;

