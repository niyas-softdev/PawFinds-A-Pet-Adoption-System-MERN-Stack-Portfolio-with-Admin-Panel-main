const FoodOrder = require('../Model/FoodOrderModel');

// ✅ Place food order
exports.placeFoodOrder = async (req, res) => {
  try {
    const { userId, userDetails, items, total, paymentMode } = req.body;

    if (!userId || !items || items.length === 0) {
      return res.status(400).json({ message: "Missing required order details" });
    }

    const newOrder = new FoodOrder({
      userId,
      userDetails,
      items,
      total,
      paymentMode,
    });

    const saved = await newOrder.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: "Failed to place order", error: err.message });
  }
};

// ✅ Get all food orders (admin)
exports.getAllFoodOrders = async (req, res) => {
  try {
    const orders = await FoodOrder.find().populate("userId", "name email");
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders", error: err.message });
  }
};

// ✅ Get food orders for a specific user
exports.getUserFoodOrders = async (req, res) => {
  try {
    const userId = req.params.userId;
    const orders = await FoodOrder.find({ userId });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user orders", error: err.message });
  }
};
