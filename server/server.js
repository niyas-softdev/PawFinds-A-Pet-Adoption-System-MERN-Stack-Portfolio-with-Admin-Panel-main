require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI || process.env.mongooseURL, {
    dbName: "PET_SHOP",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// CORS Configuration
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "http://localhost:5174",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Middleware
app.use(express.json()); // for JSON requests
app.use(express.urlencoded({ extended: true })); // for form data

// Static folder for image access
app.use("/images", express.static(path.join(__dirname, "images")));


// ✅ ROUTE REGISTRATION (versioned and scoped)
app.use("/api/auth", require("./Routes/authRoutes"));
app.use("/api/pets", require("./Routes/PetRoute"));
app.use("/api/form", require("./Routes/AdoptFormRoute"));
app.use("/api/admin", require("./Routes/AdminRoute"));
app.use("/api/pet-foods", require("./Routes/PetFoodRoute"));
app.use("/api/interests", require("./Routes/interestRoutes"));
app.use('/api/food-orders', require('./Routes/FoodOrderRoute'));
app.use('/api/pet-orders', require('./Routes/petOrderRoutes'));


// Fallback 404
app.use((req, res) => {
  res.status(404).json({ success: false, message: "API endpoint not found." });
});

// Start the server
const PORT = process.env.PORT || 5174;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
