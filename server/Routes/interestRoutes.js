const express = require("express");
const router = express.Router();
const InterestController = require("../Controller/InterestController");

// 📌 Route to submit interest
router.post("/", InterestController.postInterest);

// 📌 Route to get all interests
router.get("/", InterestController.getAllInterests);

// 📌 Route to get interest by ID
router.get("/:id", InterestController.getInterestById);

// 📌 Route to delete an interest
router.delete("/:id", InterestController.deleteInterest);

module.exports = router;
