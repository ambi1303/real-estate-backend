const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const propertyRoutes = require("./routes/property");
const adminRoutes = require("./routes/admin");

app.use("/api/properties", propertyRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Connection Failed:", err));

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
