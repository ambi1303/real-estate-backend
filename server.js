require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const auth = require("./routes/auth");
const property = require("./routes/property");
const admin = require("./routes/admin");  // ✅ Import admin routes

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ DB Connection Error:", err));

// ✅ Register Routes
app.use("/api/auth", auth);
app.use("/api/properties", property);
app.use("/api/admin", admin);  // ✅ Register admin routes

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
