const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const User = require("../models/user");
const HttpError = require("../models/http-error");
const TokenBl = require("../models/tokenbl");

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError(
      "Validation failed, entered data is incorrect",
      422
    );
    return next(error);
  }
  const { name, email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    const error = new HttpError("Signing up failed #a", 500);
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError("User exists already", 422);
    return next(error);
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError("Could not create user. Please try again", 500);
    return next(error);
  }

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    favourite: [],
    watched: [],
    watchlist: [],
  });

  try {
    await newUser.save();
  } catch (err) {
    const error = new HttpError("Signing up failed #b", 500);
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      process.env.JWT
    );
  } catch (err) {
    const error = new HttpError("Signing up failed #c", 500);
    return next(error);
  }

  res.status(201).json({
    userId: newUser.id,
    email: newUser.email,
    token,
    name: newUser.name,
  });
};

exports.login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError(
      "Validation failed, entered data is incorrect",
      422
    );
    return next(error);
  }
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    const error = new HttpError("Logging in failed #a", 500);
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError(
      "Could not find any user with the particular id",
      400
    );
    return next(error);
  }

  let isValidPassword = false;

  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError("Something went wrong please try again", 500);
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError("Password Incorrect", 403);
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      process.env.JWT
    );
  } catch (err) {
    const error = new HttpError("Logging in failed #b", 500);
    return next(error);
  }

  res.json({
    userId: existingUser.id,
    email: existingUser.email,
    token,
    name: existingUser.name,
  });
};

exports.logout = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError("Token Not Found", 401);
    return next(error);
  }

  const { token } = req.body;

  let existingToken;

  try {
    existingToken = await TokenBl.findOne({ token });
  } catch (err) {
    const error = new HttpError("Logout failed #a", 500);
    return next(error);
  }

  if (existingToken) {
    const error = new HttpError("Logout already executed for this User", 401); //aka TOKEN
    return next(error);
  }

  const newToken = new TokenBl({
    token,
  });

  try {
    await newToken.save();
  } catch (err) {
    const error = new HttpError("Logout failed #b", 500);
    return next(error);
  }

  res.status(200).json({ message: "Logout Successful" });
};
