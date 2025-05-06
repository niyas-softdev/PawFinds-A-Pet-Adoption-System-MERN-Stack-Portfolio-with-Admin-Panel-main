const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const {
  postPetRequest,
  approveRequest,
  deletePost,
  allPets
} = require("../Controller/PetController");

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../images"));
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });

// Routes (base: /api/pets)
router.get("/pending", (req, res) => allPets("Pending", req, res));
router.get("/approved", (req, res) => allPets("Approved", req, res));
router.get("/adopted", (req, res) => allPets("Adopted", req, res));

router.post("/post", upload.single("picture"), postPetRequest);
router.put("/approve/:id", approveRequest);
router.delete("/delete/:id", deletePost);

module.exports = router;
