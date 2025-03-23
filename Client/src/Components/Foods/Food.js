import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:4000/api/pet-foods";
const INTEREST_API = "http://localhost:4000/api/interests";

const PetFoodList = () => {
    const [petFoods, setPetFoods] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedFood, setSelectedFood] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [interestData, setInterestData] = useState({
        name: "",
        contact: "",
        message: "",
    });

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

    const handleInterestClick = (food) => {
        setSelectedFood(food);
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        setSelectedFood(null);
        setInterestData({ name: "", contact: "", message: "" });
    };

    const handleChange = (e) => {
        setInterestData({ ...interestData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedFood) return;

        const dataToSend = {
            ...interestData,
            petFoodId: selectedFood._id,
            petFoodName: selectedFood.name,
        };

        try {
            await axios.post(INTEREST_API, dataToSend);
            alert("Your interest has been submitted!");
            handleClosePopup();
        } catch (error) {
            console.error("Error submitting interest:", error);
            alert("Failed to submit your interest.");
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Pet Food Products</h2>

            {loading && <p style={styles.loading}>Loading...</p>}
            {error && <p style={styles.error}>{error}</p>}

            <div style={styles.gridContainer}>
                {petFoods.map((food) => (
                    <div key={food._id} style={styles.card}>
                        <div style={styles.imageContainer}>
                            <img 
                                src={food.images?.[0] ? `http://localhost:4000/images/${food.images[0]}` : "https://widgets.truekonnects.com/images/default_food.jpg"}
                                alt={food.name}
                                style={styles.image}
                            />
                        </div>
                        <div style={styles.cardContent}>
                            <h3 style={styles.foodName}>{food.name}</h3>
                            <p style={styles.details}><strong>Brand:</strong> {food.brand}</p>
                            <p style={styles.details}><strong>Type:</strong> {food.petType}</p>
                            <p style={styles.details}><strong>Food Type:</strong> {food.foodType}</p>
                            <p style={styles.price}><strong>Price:</strong> ${food.price}</p>
                            <p style={styles.details}><strong>Weight:</strong> {food.weight} kg</p>
                            <button style={styles.button} onClick={() => handleInterestClick(food)}>Show Interested <i class="fa fa-paw"></i></button>
                        </div>
                    </div>
                ))}
            </div>

            {showPopup && selectedFood && (
                <div style={styles.popupOverlay}>
                    <div style={styles.popup}>
                        <h2>Express Interest in {selectedFood.name}</h2>
                        <form onSubmit={handleSubmit}>
                            <input 
                                type="text" 
                                name="name" 
                                placeholder="Your Name" 
                                value={interestData.name} 
                                onChange={handleChange} 
                                required
                                style={styles.input}
                            />
                            <input 
                                type="text" 
                                name="contact" 
                                placeholder="Your Contact Info" 
                                value={interestData.contact} 
                                onChange={handleChange} 
                                required
                                style={styles.input}
                            />
                            <textarea 
                                name="message" 
                                placeholder="Message (optional)" 
                                value={interestData.message} 
                                onChange={handleChange} 
                                style={styles.textarea}
                            />
                            <div style={styles.buttonContainer}>
                                <button type="submit" style={styles.button}>Submit Interest</button>
                                <button type="button" style={styles.closeButton} onClick={handleClosePopup}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        width: "80%",
        margin: "auto",
        textAlign: "center",
        fontFamily: "'Arial', sans-serif",
    },
    title: {
        fontSize: "28px",
        fontWeight: "bold",
        marginBottom: "20px",
        color: "#333",
    },
    loading: {
        color: "blue",
        fontSize: "18px",
    },
    error: {
        color: "red",
        fontSize: "16px",
    },
    gridContainer: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "20px",
        justifyContent: "center",
    },
    card: {
        border: "1px solid #9d60f2",
        borderRadius: "8px",
        overflow: "hidden",
        backgroundColor: "#fff",
        boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.08)",
        transition: "transform 0.2s ease-in-out",
        cursor: "pointer",
        width: "100%",
    },
    cardHover: {
        transform: "scale(1.03)",
    },
    imageContainer: {
        width: "100%",
         height: "180px",
        overflow: "hidden",
    },
    image: {
        // width: "100%",
        height: "100%",
        objectFit: "cover",
    },
    cardContent: {
        padding: "10px",
    },
    foodName: {
        fontSize: "20px",
        fontWeight: "bold",
        marginTop: "10px",
        color: "#333",
    },
    details: {
        fontSize: "12px",
        color: "#555",
        marginBottom: "5px",
    },
    price: {
        fontSize: "16px",
        fontWeight: "bold",
        color: "#28a745",
    },
    button: {
        backgroundColor: "#9d60f2",
        color: "white",
        border: "none",
        padding: "8px 12px",
        cursor: "pointer",
        borderRadius: "6px",
        marginTop: "10px",
        fontSize: "12px",
    },
    popupOverlay: {
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    popup: {
        background: "white",
        padding: "20px",
        width: "400px",
        borderRadius: "10px",
        textAlign: "center",
        boxShadow: "3px 3px 15px rgba(0, 0, 0, 0.2)",
    },
    input: {
        width: "100%",
        padding: "10px",
        marginBottom: "10px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        fontSize: "14px",
        fontFamily: "'Arial', sans-serif",
        boxSizing: "border-box",
    },
    
    textarea: {
        width: "100%",
        padding: "10px",
        height: "80px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        fontSize: "14px",
        fontFamily: "'Arial', sans-serif",
        resize: "vertical",
        boxSizing: "border-box",
        marginBottom: "10px",
    },
    
    buttonContainer: {
        display: "flex",
        justifyContent: "space-between",
        marginTop: "10px",
        gap: "10px",
    },
    
    closeButton: {
        backgroundColor: "#ccc",
        color: "#333",
        border: "none",
        padding: "8px 12px",
        cursor: "pointer",
        borderRadius: "6px",
        fontSize: "12px",
    },
    
};

export default PetFoodList;
