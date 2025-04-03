const express = require("express");
const Property = require("../models/Property");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

// Fetch all properties
router.get("/", async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Add a property (Admin only)
router.post("/add", authMiddleware, adminMiddleware, async (req, res) => {
  const { name, image, price, location } = req.body;

  try {
    const newProperty = new Property({ name, image, price, location });
    await newProperty.save();
    res.json({ message: "Property added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Edit a property (Admin only)
router.put("/edit/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const updatedProperty = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedProperty);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a property (Admin only)
router.delete("/delete/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    await Property.findByIdAndDelete(req.params.id);
    res.json({ message: "Property deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
