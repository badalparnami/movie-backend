const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tokenBlSchema = new Schema({
  token: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("TokenBl", tokenBlSchema);
