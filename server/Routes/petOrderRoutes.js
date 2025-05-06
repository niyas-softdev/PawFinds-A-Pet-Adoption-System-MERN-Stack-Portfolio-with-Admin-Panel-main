const express = require("express");
const router = express.Router();
const {
  placeOrder,
  getAllOrders,
  getUserPetOrders
} = require("../Controller/petOrderController");

// POST: Place new pet order
router.post("/place", placeOrder);

// GET: Admin - All pet orders
router.get("/all", getAllOrders);

// GET: User - Their pet orders
router.get("/user/:userId", getUserPetOrders);

module.exports = router;
