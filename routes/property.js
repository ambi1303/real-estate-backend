const express = require("express");
const { verifyToken, isAdmin } = require("../middleware/auth");
const Property = require("../models/Property");

const router = express.Router();

// ✅ Get All Properties
router.get("/", async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Get Property by ID
router.get("/:id", async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ error: "Property not found" });
    res.json(property);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Create Property (Admin Only)
router.post("/", verifyToken, isAdmin, async (req, res) => {
  try {
    const { name, image, price, location } = req.body;

    // 🛑 Check if required fields are missing
    if (!name || !price || !location) {
      return res.status(400).json({ error: "Name, price, and location are required." });
    }

    // 🛑 Ensure price is a number
    if (typeof price !== "number") {
      return res.status(400).json({ error: "Price must be a number." });
    }

    const newProperty = new Property({ name, image, price, location });
    await newProperty.save();
    
    res.status(201).json({ message: "Property added successfully", newProperty });
  } catch (error) {
    console.error("Error adding property:", error); // 🔍 Logs actual error
    res.status(500).json({ error: error.message });
  }
});


// ✅ Edit Property (Admin Only)
router.put("/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const updatedProperty = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedProperty);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Delete Property (Admin Only)
router.delete("/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    await Property.findByIdAndDelete(req.params.id);
    res.json({ message: "Property deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
