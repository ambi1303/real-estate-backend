const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

const ADMIN_CREDENTIALS = {
  email: "admin@example.com",
  password: "admin123" // Change this in production!
};

// 🟢 Admin Login (POST)
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (
    email === ADMIN_CREDENTIALS.email &&
    password === ADMIN_CREDENTIALS.password
  ) {
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.json({ token });
  }

  return res.status(401).json({ error: "Invalid credentials" });
});

module.exports = router;
