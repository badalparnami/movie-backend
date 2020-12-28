const axios = require("axios");
const HttpError = require("../models/http-error");

exports.getPopular = async (req, res, next) => {
  const page = req.params.page;
  let response;
  try {
    response = await axios.get(
      `https://api.themoviedb.org/3/person/popular?api_key=${process.env.API}&page=${page}`
    );
  } catch (err) {
    const error = new HttpError(err.response.statusText, err.response.status);
    return next(error);
  }

  res.status(200).json({
    message: "Fetched Popular Persons successfully",
    data: response.data,
  });
};

exports.getData = async (req, res, next) => {
  const id = req.params.id;
  let response;
  try {
    response = await axios.get(
      `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.API}&language=en-US&append_to_response=combined_credits%2Cexternal_ids%2Cimages`
    );
  } catch (err) {
    const error = new HttpError(err.response.statusText, err.response.status);
    return next(error);
  }

  res.status(200).json({
    message: "Fetched Person Details successfully",
    data: response.data,
  });
};
