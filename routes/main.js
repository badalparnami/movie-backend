const express = require("express");
const router = express.Router();

const mainControllers = require("../controllers/main");

router.get("/search/:query/:page", mainControllers.search);

module.exports = router;
