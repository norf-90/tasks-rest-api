const express = require('express');
const router = express.Router();
const { authenticate, validateDate } = require('../../middlewares');
const statsCtrl = require('../../controllers');

router.get('/', authenticate, validateDate, statsCtrl.statistics);

module.exports = router;
