const axios = require("axios");
const HttpError = require("../models/http-error");

exports.search = async (req, res, next) => {
  const { query, page } = req.params;

  let response;
  try {
    response = await axios.get(
      `https://api.themoviedb.org/3/search/multi?api_key=${process.env.API}&language=en-US&query=${query}&page=${page}`
    );
  } catch (err) {
    const error = new HttpError(err.response.statusText, err.response.status);
    return next(error);
  }

  if (response.data.results.length < 1) {
    return res.status(404).json({
      message: "No Results Found",
      data: response.data,
      code: 404,
    });
  }

  res.status(200).json({
    message: "Fetched results successfully",
    data: response.data,
  });
};
