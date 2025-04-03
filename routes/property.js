const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const adminMiddleware = require("../middleware/adminMiddleware");
const Property = require("../models/Property");

// Get all properties
router.get("/", async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Add a new property (Admin only)
router.post("/add", auth, adminMiddleware, async (req, res) => {
  const { name, image, location, price } = req.body;

  if (!name || !image || !location || !price) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  try {
    const newProperty = new Property({
      name,
      image,
      location,
      price,
      createdBy: req.user.id, // Admin ID
    });

    await newProperty.save();
    res.json({ message: "Property added successfully", property: newProperty });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// Edit a property (Admin only)
router.put("/edit/:id", auth, adminMiddleware, async (req, res) => {
  try {
    const { name, image, location, price } = req.body;

    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      { name, image, location, price },
      { new: true }
    );

    if (!updatedProperty) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.json({ message: "Property updated successfully", property: updatedProperty });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a property (Admin only)
router.delete("/delete/:id", auth, adminMiddleware, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    await property.deleteOne();
    res.json({ message: "Property deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
