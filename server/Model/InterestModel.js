const mongoose = require("mongoose");

const InterestSchema = new mongoose.Schema({
    name: { type: String, required: true },
    contact: { type: String, required: true },
    message: { type: String },
    petFoodId: { type: mongoose.Schema.Types.ObjectId, ref: "PetFood", required: true },
    petFoodName: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Interest", InterestSchema);
