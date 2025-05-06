const PetOrder = require("../Model/PetOrder");

// ✅ Place a pet order
exports.placeOrder = async (req, res) => {
  try {
    const newOrder = new PetOrder(req.body);
    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get all pet orders (admin)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await PetOrder.find().sort({ createdAt: -1 }).populate("userId", "name email");
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get pet orders for a specific user
exports.getUserPetOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await PetOrder.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching user pet orders:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
