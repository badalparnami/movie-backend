const express = require("express");
const router = express.Router();

const personControllers = require("../controllers/person");

router.get("/popular/:page", personControllers.getPopular);

router.get("/detail/:id", personControllers.getData);

module.exports = router;
