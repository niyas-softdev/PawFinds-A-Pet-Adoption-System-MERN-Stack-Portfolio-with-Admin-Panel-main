require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Import Routes
const petRouter = require('./Routes/PetRoute');
const AdoptFormRoute = require('./Routes/AdoptFormRoute');
const AdminRoute = require('./Routes/AdminRoute');
const petFoodRoute = require("./Routes/PetFoodRoute");
const interestRoutes = require("./Routes/interestRoutes");

const app = express();

// CORS Configuration
app.use(cors({
    origin: "http://localhost:3000", // Change this to your frontend URL
    credentials: true
}));

// Static folder for images
app.use('/images', express.static(path.join(__dirname, 'images')));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(petRouter);
app.use('/form', AdoptFormRoute);
app.use('/admin', AdminRoute);
app.use("/api/pet-foods", petFoodRoute);
app.use("/api/interests", interestRoutes);

// Connect to MongoDB
mongoose.connect(process.env.mongooseURL, {
    dbName: "PET_SHOP",
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Connected to DB');
        const PORT = process.env.PORT || 4000;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("MongoDB Connection Error:", err);
    });
