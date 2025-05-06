const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FoodOrderSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',  // Assumes you have a 'User' model
    required: true
  },
  userDetails: {
    name: String,
    address: String,
    phone: String
  },
  items: [
    {
      foodId: { type: Schema.Types.ObjectId, ref: 'PetFood' },
      name: String,
      price: Number,
      quantity: { type: Number, default: 1 }
    }
  ],
  total: {
    type: Number,
    required: true
  },
  paymentMode: {
    type: String,
    default: "COD"
  }
}, { timestamps: true });

module.exports = mongoose.model('FoodOrder', FoodOrderSchema);
