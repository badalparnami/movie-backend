const axios = require("axios");
const HttpError = require("../models/http-error");

exports.getPopular = async (req, res, next) => {
  const page = req.params.page;
  let response;
  try {
    response = await axios.get(
      `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.API}&page=${page}`
    );
  } catch (err) {
    const error = new HttpError(err.response.statusText, err.response.status);
    return next(error);
  }

  res.status(200).json({
    message: "Fetched Popular Tv Series successfully",
    data: response.data,
  });
};

exports.getTopRated = async (req, res, next) => {
  const page = req.params.page;
  let response;
  try {
    response = await axios.get(
      `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.API}&language=en-US&page=${page}`
    );
  } catch (err) {
    const error = new HttpError(err.response.statusText, err.response.status);
    return next(error);
  }

  res.status(200).json({
    message: "Fetched Top Rated Tv Series successfully",
    data: response.data,
  });
};

exports.getData = async (req, res, next) => {
  const id = req.params.id;
  let response, providers, imdb;

  try {
    response = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.API}&language=en-US&append_to_response=credits%2Cimages%2Crecommendations%2Cvideos%2Csimilar%2Cexternal_ids`
    );
  } catch (err) {
    const error = new HttpError(err.response.statusText, err.response.status);
    return next(error);
  }

  try {
    providers =
      await axios.get(`https://api.themoviedb.org/3/tv/${id}/watch/providers?api_key=${process.env.API}
    `);
  } catch (err) {
    return res.status(200).json({
      message: "Fetched only tv series details",
      data: response.data,
      code: "a1",
      error: err.response.data,
    });
  }

  try {
    imdb = await axios.get(
      `https://www.omdbapi.com/?i=${response.data.external_ids.imdb_id}&apiKey=${process.env.OMDB}`
    );
  } catch (err) {
    return res.status(200).json({
      message: "Fetched tv series and provider details",
      data: response.data,
      providers: providers.data,
      code: "a2a",
      error: err.response.data,
    });
  }

  //If Imdb id is incorrect
  if (imdb.data.Response === "False") {
    return res.status(200).json({
      message: "Fetched tv series and provider details",
      data: response.data,
      providers: providers.data,
      code: "a2b",
      error: imdb.data,
    });
  }

  res.status(200).json({
    message: "Fetched all data successfully",
    data: response.data,
    providers: providers.data,
    rating: imdb.data.imdbRating,
    code: "a3",
  });
};

exports.getSeasonData = async (req, res, next) => {
  const id = req.params.id;
  const seasonId = req.params.snum;
  let response;
  try {
    response = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}/season/${seasonId}?api_key=${process.env.API}&language=en-US&append_to_response=images%2Cvideos%2Ccredits
      `
    );
  } catch (err) {
    const error = new HttpError(err.response.statusText, err.response.status);
    return next(error);
  }

  res.status(200).json({
    message: "Fetched Season Data successfully",
    data: response.data,
  });
};

exports.getEpData = async (req, res, next) => {
  const id = req.params.id;
  const seasonId = req.params.snum;
  const episodeId = req.params.epnum;
  let response;
  try {
    response = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}/season/${seasonId}/episode/${episodeId}?api_key=${process.env.API}&language=en-US&append_to_response=credits%2Cimages%2Cvideos`
    );
  } catch (err) {
    const error = new HttpError(err.response.statusText, err.response.status);
    return next(error);
  }

  res.status(200).json({
    message: "Fetched Episode Data successfully",
    data: response.data,
  });
};
