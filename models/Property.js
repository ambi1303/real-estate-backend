const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String },
  price: { type: Number, required: true },
  location: { type: String, required: true },
});

module.exports = mongoose.model("Property", PropertySchema);
