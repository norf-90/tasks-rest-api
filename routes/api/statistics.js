const express = require("express");
const router = express.Router();

const userCtrl = require("../../controllers");

router.get("/", userCtrl.statistics);

module.exports = router;
