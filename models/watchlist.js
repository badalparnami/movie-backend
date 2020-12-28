const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const watchListSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  uid: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Watchlist", watchListSchema);
