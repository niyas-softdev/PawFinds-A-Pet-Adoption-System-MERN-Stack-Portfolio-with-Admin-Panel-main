// models/PetOrder.js
const mongoose = require("mongoose");

const PetOrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userDetails: {
      name: { type: String, required: true },
      address: { type: String, required: true },
      phone: { type: String, required: true },
    },
    items: [
      {
        petId: { type: mongoose.Schema.Types.ObjectId, ref: "Pet", required: true },
        name: String,
        price: Number,
      },
    ],
    total: {
      type: Number,
      required: true,
    },
    paymentMode: {
      type: String,
      enum: ["COD"],
      default: "COD",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PetOrder", PetOrderSchema);
