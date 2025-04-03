const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema({
  name: String,
  image: String,
  price: Number,
  location: String,
});

module.exports = mongoose.model("Property", PropertySchema);
