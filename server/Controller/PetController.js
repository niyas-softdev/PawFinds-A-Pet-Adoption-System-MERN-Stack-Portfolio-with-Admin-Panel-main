const Pet = require('../Model/PetModel');
const fs = require('fs');
const path = require('path');

// ✅ Create a new pet post
const postPetRequest = async (req, res) => {
  try {
    const { name, age, area, justification, email, phone, type, price, purpose } = req.body;
    const { filename } = req.file;

    const pet = await Pet.create({
      name,
      age,
      area,
      justification,
      email,
      phone,
      type,
      filename,
      price,
      purpose,
      status: 'Pending'
    });

    res.status(200).json(pet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Approve a pending pet post
const approveRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const pet = await Pet.findByIdAndUpdate(id, { status }, { new: true });

    if (!pet) return res.status(404).json({ error: 'Pet not found' });

    res.status(200).json(pet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Fetch pets by status
const allPets = async (reqStatus, req, res) => {
  try {
    const data = await Pet.find({ status: reqStatus }).sort({ updatedAt: -1 });
    if (data.length > 0) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ error: 'No pets found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Delete pet by ID
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const pet = await Pet.findByIdAndDelete(id);

    if (!pet) return res.status(404).json({ error: 'Pet not found' });

    // Delete image file
    const filePath = path.join(__dirname, '../images', pet.filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    res.status(200).json({ message: 'Pet deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  postPetRequest,
  approveRequest,
  deletePost,
  allPets
};
