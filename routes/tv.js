const express = require("express");
const router = express.Router();

const tvController = require("../controllers/tv");

router.get("/popular/:page", tvController.getPopular);

router.get("/top_rated/:page", tvController.getTopRated);

router.get("/detail/:id", tvController.getData);

router.get("/season/detail/:id/:snum", tvController.getSeasonData);

router.get("/season/eps/detail/:id/:snum/:epnum", tvController.getEpData);

module.exports = router;
