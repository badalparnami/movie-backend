const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favSchema = new Schema({
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
  rating: {
    type: Number,
    required: false,
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

module.exports = mongoose.model("Favourite", favSchema);
