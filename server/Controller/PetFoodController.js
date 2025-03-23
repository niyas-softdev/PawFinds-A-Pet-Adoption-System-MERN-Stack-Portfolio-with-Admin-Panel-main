const PetFood = require("../Model/FoodModel");

// Create new pet food
const postPetFood = async (req, res) => {
  try {
    const imagePath = req.file ? req.file.filename : null;


      const { name, brand, petType, foodType, price, weight } = req.body;

      // Create new pet food entry
      const petFood = await PetFood.create({
          name,
          brand,
          petType,
          foodType,
          price,
          weight,
          images: imagePath ? [imagePath] : [],
      });

      res.status(201).json({ message: "Pet food added successfully!", petFood });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

  

const updatePetFood = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("Received Update Payload:", req.body); // Debugging

    let updatedData = { ...req.body };

    // Convert weight & price to Number explicitly
    if (updatedData.price) updatedData.price = Number(updatedData.price);
    if (updatedData.weight) updatedData.weight = Number(updatedData.weight);
    
    console.log("Processed Update Data:", updatedData); // Debugging

    // Find the existing pet food
    const petFood = await PetFood.findById(id);
    if (!petFood) {
      return res.status(404).json({ error: "Pet food not found" });
    }

    // Append new image if uploaded
    if (req.file) {
      petFood.images.push(req.file.filename);
    }

    // Manually update all fields
    Object.keys(updatedData).forEach((key) => {
      petFood[key] = updatedData[key];
    });

    // Save and return response
    await petFood.save();
    console.log("Final Updated Document:", petFood); // Debugging

    res.status(200).json({ message: "Pet food updated successfully!", petFood });
  } catch (err) {
    console.error("Update Error:", err.message); // Debugging
    res.status(500).json({ error: err.message });
  }
};




// Fetch all pet foods
const getAllPetFoods = async (req, res) => {
  try {
    const petFoods = await PetFood.find().sort({ updatedAt: -1 });

    if (!petFoods.length) {
      return res.status(404).json({ error: "No pet food data found" });
    }

    res.status(200).json(petFoods);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Fetch pet food by ID
const getPetFoodById = async (req, res) => {
  try {
    const petFood = await PetFood.findById(req.params.id);
    if (!petFood) {
      return res.status(404).json({ error: "Pet food not found" });
    }
    res.status(200).json(petFood);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete pet food
const deletePetFood = async (req, res) => {
  try {
    const id = req.params.id;
    const petFood = await PetFood.findByIdAndDelete(id);

    if (!petFood) {
      return res.status(404).json({ error: "Pet food not found" });
    }

    res.status(200).json({ message: "Pet food deleted successfully!", deletedPetFood: petFood });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  postPetFood,
  updatePetFood,
  getAllPetFoods,
  getPetFoodById,
  deletePetFood
};
