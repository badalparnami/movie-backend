const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");

const HttpError = require("./models/http-error");
const mainRoutes = require("./routes/main");
const movieRoutes = require("./routes/movie");
const tvRoutes = require("./routes/tv");
const personRoutes = require("./routes/person");
const authRoutes = require("./routes/auth");
const dataRoutes = require("./routes/data");

const PORT = process.env.PORT || 8080;

const MONGODB_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hubm7.gcp.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const app = express();
app.use(express.json());

dotenv.config();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use("/", (req, res) => {
  res.send("Hello from the Backend");
});

app.use("/api/main", mainRoutes);

app.use("/api/movie", movieRoutes);

app.use("/api/tv", tvRoutes);

app.use("/api/person", personRoutes);

app.use("/api/auth", authRoutes, dataRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Error!! 404 NOT FOUND", 404);
  next(error);
});

app.use((error, req, res, next) => {
  //   if (res.headerSent) {
  //     return next(error);
  //   }
  // console.log(
  //   error.response.status,
  //   error.response.statusText,
  //   error.response.data
  // );
  res.status(error.code || error.status_code || 500);
  res.json({ message: error.message || "Something went wrong" });
});

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((result) => {
    console.log("db connected");
    // app.listen(8080);
    app.listen(PORT);
  })
  .catch((err) => {
    console.log(err);
  });

// app.listen(8080);
