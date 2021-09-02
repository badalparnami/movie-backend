const express = require("express");
const router = express.Router();

const movieController = require("../controllers/movie");

router.get("/popular/:page", movieController.getPopular);

router.get("/now_playing/:region/:page", movieController.getNowPlaying);

router.get("/top_rated/:page", movieController.getTopRated);

router.get("/upcoming/:region/:page", movieController.getUpcoming);

router.get("/detail/:id", movieController.getData);

router.get("/collection/:id", movieController.getCollection);

module.exports = router;
