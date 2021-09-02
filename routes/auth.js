const express = require("express");
const { check } = require("express-validator");
const router = express.Router();

const authControllers = require("../controllers/auth");

router.post(
  "/login",
  [
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  authControllers.login
);

router.post(
  "/signup",
  [
    check("name").isLength({ min: 3 }).not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  authControllers.signup
);

router.post("/logout", check("token").not().isEmpty(), authControllers.logout);

module.exports = router;
