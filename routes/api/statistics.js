const express = require('express');
const router = express.Router();
const { authenticate, generateStatistics } = require('../../middlewares');
const statsCtrl = require('../../controllers');

router.get('/', authenticate, generateStatistics, statsCtrl.statistics);

module.exports = router;
