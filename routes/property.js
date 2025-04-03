const express = require("express");
const Property = require("../models/Property");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// 🟢 GET All Properties (Public)
router.get("/", async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🟢 GET Single Property (Public)
router.get("/:id", async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ error: "Property not found" });
    res.json(property);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔒 Admin Only - Add Property (POST)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, image, price, location } = req.body;
    const newProperty = new Property({ name, image, price, location });
    await newProperty.save();
    res.status(201).json(newProperty);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔒 Admin Only - Update Property (PUT)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProperty)
      return res.status(404).json({ error: "Property not found" });
    res.json(updatedProperty);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔒 Admin Only - Delete Property (DELETE)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deletedProperty = await Property.findByIdAndDelete(req.params.id);
    if (!deletedProperty)
      return res.status(404).json({ error: "Property not found" });
    res.json({ message: "Property deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
