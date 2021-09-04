# Movie Web App Backend

A web app where user can log their watched & favourite movies and tv shows.

View Demo [here](https://focused-shirley-b16f55.netlify.app/).

**To view the frontend code. Visit [here](https://github.com/badalparnami/movie-app).**

## Usage

Create a free [MongoDB](https://www.mongodb.com/cloud/atlas) atlas, [TMDB](https://www.themoviedb.org/settings/api) and [OMDB](https://www.omdbapi.com/apikey.aspx?) accounts.

1. Fork the repo and then Clone/Download it.
2. `cd movie-backend`
3. Create `nodemon.json` file in the root directory.
4. Setup required environment variables.

```js
{
  "env": {
    "DB_USER": //Database Username,
    "DB_PASS": //Database Password,
    "DB_NAME": //Database Name,
    "API": //TMDB Api Key,
    "ACCESS": "*",
    "JWT": //Random string,
    "OMDB": //OMDB Api Key
  }
}

```

5. Change ACCESS property (if require)
6. Run `npm install`
7. Run `npm run server` to start the local server at port 8080.

## Structure

```bash
.
├── app.js
├── controllers
│   ├── auth.js          #Login, Signup and Logout
│   ├── data.js          #User's Data and adding/removing to/from Favourite, Watched and Watchlist
│   ├── main.js         #Search
│   ├── movie.js        #Popular, Now Playing, Top Rated, Upcoming movies. Collection and Single Movie Data
│   ├── person.js       #Popular and Single Person Data
│   ├── tv.js           #Popular, Top Rated, Season Data, Episode Data and Single TV Series Data
├── middleware
│   ├── is-auth.js
├── models
│   ├── favourite.js
│   ├── http-error.js
│   ├── list.js         #TO-DO
│   ├── tokenbl.js
│   ├── user.js
│   ├── watched.js
│   ├── watchlist.js
├── routes
│   ├── auth.js
│   ├── data.js
│   ├── main.js
│   ├── movie.js
│   ├── person.js
│   ├── tv.js
```

## API ENDPOINTS

> /api/auth

| Endpoint          | Method | Payload                                                                                               | Description                                                      |
| ----------------- | ------ | ----------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| /login            | POST   | { email: 'test@test.com', password: 'iAmStrong'}                                                      | Login User                                                       |
| /signup           | POST   | { name: 'Test, email: 'test@test.com', password: 'iAmStrong'}                                         | Signup User                                                      |
| /logout           | POST   | { token: 'CanBeDecodeBySpecialString'}                                                                | Blocklist token                                                  |
| /data             | GET    | None                                                                                                  | Get data of a logged in user                                     |
| /addfww/{list}    | POST   | { name: "The Tomorrow War", image: "/34nDCQZwaEvsy4CFO5hkGRFDCVU.jpg", uid: "588228", type: "movie" } | Add Movie or Tv Series to user's list. List values are f, wl, wd |
| /removefww/{list} | POST   | { id: "588228"}                                                                                       | Remove data from user's list                                     |

> /api/main

| Endpoint               | Method | Payload | Description                            |
| ---------------------- | ------ | ------- | -------------------------------------- |
| /search/{query}/{page} | GET    | None    | Search based on query and page number. |

> /api/movie

| Endpoint                     | Method | Payload | Description                                    |
| ---------------------------- | ------ | ------- | ---------------------------------------------- |
| /popular/{page}              | GET    | None    | Get Popular movies                             |
| /now_playing/{region}/{page} | GET    | None    | Get Now Playing Movies in the specified region |
| /top_rated/{page}            | GET    | None    | Get Top Rated Movies                           |
| /upcoming/{region}/{page}    | GET    | None    | Get Upcoming Movies in the specified region    |
| /detail/{id}                 | GET    | None    | Get full detail of a particular movie          |
| /collection/{id}             | GET    | None    | Get collection list                            |

> /api/person

| Endpoint        | Method | Payload | Description                            |
| --------------- | ------ | ------- | -------------------------------------- |
| /popular/{page} | GET    | None    | Get Popular persons                    |
| /detail/{id}    | GET    | None    | Get full detail of a particular person |

> /api/tv

| Endpoint                            | Method | Payload | Description                                         |
| ----------------------------------- | ------ | ------- | --------------------------------------------------- |
| /popular/{page}                     | GET    | None    | Get Popular tv series                               |
| /top_rated/{page}                   | GET    | None    | Get Top Rated tv series                             |
| /detail/{id}                        | GET    | None    | Get full detail of a particular tv series           |
| /season/detail/:id/:snum            | GET    | None    | Get full detail of a particular tv series's season  |
| /season/eps/detail/:id/:snum/:epnum | GET    | None    | Get full detail of a particular tv series's episode |

## Build with

- Express
- Axios
- Bcryptjs
- Express-Validator
- Jsonwebtoken
- Mongoose
- Nodemon (dev dependency)
