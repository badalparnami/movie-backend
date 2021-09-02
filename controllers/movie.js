const axios = require("axios");
const HttpError = require("../models/http-error");

exports.getPopular = async (req, res, next) => {
  const page = req.params.page;
  let response;
  try {
    response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API}&page=${page}`
    );
  } catch (err) {
    const error = new HttpError(err.response.statusText, err.response.status);
    return next(error);
  }

  res.status(200).json({
    message: "Fetched Popular Movies successfully",
    data: response.data,
  });
};

exports.getNowPlaying = async (req, res, next) => {
  const { region, page } = req.params;
  let response;
  try {
    response = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.API}&language=en-US&page=${page}&region=${region}`
    );
  } catch (err) {
    const error = new HttpError(err.response.statusText, err.response.status);
    return next(error);
  }

  res.status(200).json({
    message: "Fetched Now Playing Movies successfully",
    data: response.data,
  });
};

exports.getTopRated = async (req, res, next) => {
  const page = req.params.page;
  let response;
  try {
    response = await axios.get(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.API}&language=en-US&page=${page}&region=IN`
    );
  } catch (err) {
    const error = new HttpError(err.response.statusText, err.response.status);
    return next(error);
  }

  res.status(200).json({
    message: "Fetched Top Rated Movies successfully",
    data: response.data,
  });
};

exports.getUpcoming = async (req, res, next) => {
  const { region, page } = req.params;
  let response;
  try {
    response = await axios.get(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.API}&language=en-US&page=${page}&region=${region}`
    );
  } catch (err) {
    const error = new HttpError(err.response.statusText, err.response.status);
    return next(error);
  }

  res.status(200).json({
    message: "Fetched Upcoming Movies successfully",
    data: response.data,
  });
};

exports.getData = async (req, res, next) => {
  const id = req.params.id;

  let response;

  try {
    response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API}&append_to_response=credits,images,recommendations,videos,similar`
    );
  } catch (err) {
    const error = new HttpError(err.response.statusText, err.response.status);
    return next(error);
  }

  let providers;
  try {
    providers = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${process.env.API}`
    );
  } catch (err) {
    return res.status(200).json({
      message: "Fetched only movie details",
      data: response.data,
      code: "a1",
      error: err.response.data,
    });
  }

  let imdb;
  try {
    imdb = await axios.get(
      `https://www.omdbapi.com/?i=${response.data.imdb_id}&apiKey=${process.env.OMDB}`
    );
  } catch (err) {
    return res.status(200).json({
      message: "Fetched movie and provider details",
      data: response.data,
      providers: providers.data,
      code: "a2a",
      error: err.response.data,
    });
  }

  //If Imdb id is incorrect
  if (imdb.data.Response === "False") {
    return res.status(200).json({
      message: "Fetched movie and provider details",
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

exports.getCollection = async (req, res, next) => {
  const id = req.params.id;
  let response;
  try {
    response = await axios.get(
      `https://api.themoviedb.org/3/collection/${id}?api_key=${process.env.API}`
    );
  } catch (err) {
    const error = new HttpError(err.response.statusText, err.response.status);
    return next(error);
  }

  res.status(200).json({
    message: "Fetched Collection successfully",
    data: response.data,
  });
};
