const express = require("express");
const Property = require("../models/Property");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const router = express.Router();

// Get all properties
router.get("/", async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
});

// Add property (Admin only)
router.post("/add", auth, admin, async (req, res) => {
    try {
      if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied. Admins only." });
      }
  
      const { name, image, price, location } = req.body;
      const newProperty = new Property({ name, image, price, location });
  
      await newProperty.save();
      res.json({ message: "Property added successfully!" });
  
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });
  

// Edit property (Admin only)
router.put("/edit/:id", auth, admin, async (req, res) => {
  try {
    const updatedProperty = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedProperty);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
});

// Delete property (Admin only)
router.delete("/delete/:id", auth, admin, async (req, res) => {
  try {
    await Property.findByIdAndDelete(req.params.id);
    res.json({ msg: "Property deleted successfully!" });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
