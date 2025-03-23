import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PetFoodManager.css"; 

const API_URL = "http://localhost:4000/api/pet-foods";

const PetFoodManager = () => {
    const [petFoods, setPetFoods] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        brand: "",
        petType: "dog",
        foodType: "dry",
        price: "",
        weight: "",
    });
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPetFoods();
    }, []);

    const fetchPetFoods = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_URL}/get`);
            setPetFoods(response.data);
        } catch (error) {
            console.error("Error loading pet foods:", error);
            setError("Failed to fetch pet food data.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formDataToSend = new FormData();
        
        // Append text fields
        Object.keys(formData).forEach((key) => {
            formDataToSend.append(key, formData[key]);
        });
    
        // Append the image file correctly
        if (image) {
            formDataToSend.append("image", image);
        }
    
        try {
            await axios.post(`${API_URL}/post`, formDataToSend, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            alert("Pet food added successfully!");

            // Reset form
            setFormData({
                name: "",
                brand: "",
                petType: "dog",
                foodType: "dry",
                price: "",
                weight: "",
            });
            setImage(null);
            setPreviewImage(null);

            fetchPetFoods();
        } catch (error) {
            console.error("Error saving pet food:", error);
            alert("Failed to save pet food.");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            try {
                await axios.delete(`${API_URL}/${id}`);
                alert("Pet food deleted successfully!");
                fetchPetFoods();
            } catch (error) {
                console.error("Error deleting pet food:", error);
                alert("Failed to delete pet food.");
            }
        }
    };

    return (
        <div className="pet-food-manager-container">
            <h2 className="pet-food-title">Pet Food Management</h2>

            <form onSubmit={handleSubmit} className="pet-food-form">
                <h3>Add Pet Food</h3>
                <input type="text" name="name" placeholder="Food Name" value={formData.name} onChange={handleChange} required />
                <input type="text" name="brand" placeholder="Brand" value={formData.brand} onChange={handleChange} required />

                <select name="petType" value={formData.petType} onChange={handleChange}>
                    <option value="dog">Dog</option>
                    <option value="cat">Cat</option>
                    <option value="bird">Bird</option>
                    <option value="fish">Fish</option>
                    <option value="reptile">Reptile</option>
                    <option value="small_animal">Small Animal</option>
                </select>

                <select name="foodType" value={formData.foodType} onChange={handleChange}>
                    <option value="dry">Dry</option>
                    <option value="wet">Wet</option>
                    <option value="freeze_dried">Freeze-Dried</option>
                    <option value="raw">Raw</option>
                    <option value="treats">Treats</option>
                </select>

                <input type="number" name="price" placeholder="Price ($)" value={formData.price} onChange={handleChange} required />
                <input type="number" name="weight" placeholder="Weight (kg)" value={formData.weight} onChange={handleChange} required />

                <input type="file" accept="image/*" onChange={handleImageChange} />
                {previewImage && <img src={previewImage} alt="Preview" className="image-preview" />}

                <button type="submit">Add Pet Food</button>
            </form>

            {loading && <p className="text-center">Loading...</p>}
            {error && <p className="text-center">{error}</p>}

            <div className="pet-food-list">
                {petFoods.map((food) => (
                  <div key={food._id} className="pet-food-card">
                      {food.images && food.images.length > 0 ? (
                          <img 
                              src={`http://localhost:4000/images/${food.images?.[0]}`} 
                              alt={food.name} 
                              className="pet-food-image" 
                              onError={(e) => { e.target.onerror = null; e.target.src = "https://widgets.truekonnects.com/images/default_food.jpg"; }}
                          />
                      ) : (
                          <p>No Image Available</p>
                      )}
                      <div className="pet-food-details">
                          <h3 className="pet-food-name">{food.name}</h3>
                          <p><strong>Brand:</strong> {food.brand}</p>
                          <p><strong>Type:</strong> {food.petType}</p>
                          <p><strong>Food Type:</strong> {food.foodType}</p>
                          <p><strong>Price:</strong> ${food.price}</p>
                          <p><strong>Weight:</strong> {food.weight} kg</p>
                          <button className="delete-btn" onClick={() => handleDelete(food._id)}>Delete</button>
                      </div>
                  </div>
                ))}
            </div>
        </div>
    );
};

export default PetFoodManager;
