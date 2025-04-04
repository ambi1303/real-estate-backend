const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

// ✅ Middleware
app.use(express.json()); // ✅ Ensure request body is parsed
// CORS configuration
const corsOptions = {
    origin: 'https://real-estate-frontend-three-inky.vercel.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // If your frontend needs to send cookies or authentication headers
    optionsSuccessStatus: 204
  };
  
  app.use(cors(corsOptions));
  
// ✅ Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/properties", require("./routes/property"));

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
