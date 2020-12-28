const express = require("express");
const router = express.Router();

const dataControllers = require("../controllers/data");
const isAuth = require("../middleware/is-auth");

router.use(isAuth);

router.get("/data", dataControllers.userData);

router.post("/addfww/:list", dataControllers.addFww);
router.post("/removefww/:list", dataControllers.removeFww);

module.exports = router;
