const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PetFoodSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    brand: {
        type: String,
        required: true,
        trim: true
    },
    petType: {
        type: String,
        enum: ["dog", "cat", "bird", "fish", "reptile", "small_animal"],
        required: true
    },
    foodType: {
        type: String,
        enum: ["dry", "wet", "freeze_dried", "raw", "treats"],
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
   
   
    stock: {
        type: Number,
        default: 0
    },
  
    images: {
        type: [String],
        
    },
    isFeatured: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('PetFood', PetFoodSchema);
