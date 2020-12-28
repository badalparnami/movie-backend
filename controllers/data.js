const User = require("../models/user");
const Favourite = require("../models/favourite");
const Watchlist = require("../models/watchlist");
const Watched = require("../models/watched");
const HttpError = require("../models/http-error");

const lists = {
  f: Favourite,
  wl: Watchlist,
  wd: Watched,
};

const listsName = {
  f: "favourite",
  wl: "watchlist",
  wd: "watched",
};

exports.userData = async (req, res, next) => {
  let userData;
  try {
    userData = await User.findById(req.userId)
      .populate({
        path: "favourite",
      })
      .populate("watchlist")
      .populate("watched");
  } catch (err) {
    const error = new HttpError("Couldn't fetch user data", 500);
    return next(error);
  }
  res.status(200).json({
    name: userData.name,
    watched: userData.watched,
    watchlist: userData.watchlist,
    favourite: userData.favourite,
  });
};

exports.addFww = (req, res, next) => {
  const { name, image, uid, type } = req.body;
  const listName = req.params.list;
  const isValid = lists.hasOwnProperty(listName);
  if (!isValid) {
    res.status(404).json({ message: "Invalid Parameter" });
    return;
  }
  const creator = req.userId;
  const listNameNew = listsName[listName];
  const add = new lists[listName]({ name, image, uid, type, creator });

  add
    .save()
    .then((result) => User.findById(creator))
    .then((user) => {
      user[listNameNew].push(add);
      return user.save();
    })
    .then((result) =>
      res.status(201).json({
        message: `Item Added Successfully`,
        item: add,
      })
    )
    .catch((err) => {
      const error = new HttpError("Not able to add item to List", 500);
      next(error);
    });
};

exports.removeFww = async (req, res, next) => {
  const { id } = req.body;
  const listName = req.params.list;
  const isValid = lists.hasOwnProperty(listName);
  if (!isValid) {
    res.status(404).json({ message: "Invalid Parameter" });
    return;
  }

  const listNameNew = listsName[listName].toLowerCase();

  lists[listName]
    .findById(id)
    .then((list) => {
      if (!list) {
        const error = new HttpError("Cannot find list item", 404);
        return next(error);
      }

      if (list.creator.toString() !== req.userId) {
        const error = new HttpError("Not authorized!", 403);
        return next(error);
      }

      return lists[listName].findByIdAndRemove(id);
    })
    .then((res) => User.findById(req.userId))
    .then((user) => {
      user[listNameNew].pull(id);
      return user.save();
    })
    .then((response) =>
      res
        .status(200)
        .json({ message: "Removed item from the list successfully" })
    )
    .catch((err) => {
      const error = new HttpError("Something went wrong", 500);
      next(error);
    });
};
