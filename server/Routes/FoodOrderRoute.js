const express = require('express');
const router = express.Router();
const {
  placeFoodOrder,
  getAllFoodOrders,
  getUserFoodOrders
} = require('../Controller/FoodOderController');

// POST: Place a new food order
router.post('/place', placeFoodOrder);

// GET: Admin - View all food orders
router.get('/all', getAllFoodOrders);

// GET: User - View their food orders
router.get('/user/:userId', getUserFoodOrders);

module.exports = router;
