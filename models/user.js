const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  favourite: [
    {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Favourite",
    },
  ],
  watched: [
    {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Watched",
    },
  ],
  watchlist: [
    {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Watchlist",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
