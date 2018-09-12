const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name:         String,
  checkin_data: String,
  ip:           String,
  rating:       Number,
  home_country: String,
  is_active:    String
});

module.exports = mongoose.model("User", UserSchema);
