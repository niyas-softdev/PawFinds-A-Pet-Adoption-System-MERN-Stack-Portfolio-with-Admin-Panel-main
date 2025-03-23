const express = require("express");
const multer = require('multer');
const path = require('path');
const { 
  postPetFood, 
  updatePetFood, 
  getAllPetFoods, 
  getPetFoodById, 
  deletePetFood 
} = require("../Controller/PetFoodController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../images'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });


router.post("/post",  upload.single("image"),postPetFood);
router.put("/update/:id", updatePetFood);
router.get("/get", getAllPetFoods);
router.get("/:id", getPetFoodById);
router.delete("/:id", deletePetFood);

module.exports = router;
