const express = require("express");
const { verifyToken, isAdmin } = require("../middleware/auth"); // ✅ Corrected path
const Property = require("../models/Property");

const router = express.Router();

// ✅ Create Property (Admin Only)
router.post("/properties", verifyToken, isAdmin, async (req, res) => {
  try {
    const { name, image, price, location } = req.body;
    const newProperty = new Property({ name, image, price, location });
    await newProperty.save();
    res.status(201).json({ message: "Property added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
