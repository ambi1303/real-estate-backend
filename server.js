require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const auth = require("./routes/auth");
const property = require("./routes/property");

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
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("DB Connection Error:", err));

// Routes
app.use("/api/auth", auth);
app.use("/api/properties", property);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
