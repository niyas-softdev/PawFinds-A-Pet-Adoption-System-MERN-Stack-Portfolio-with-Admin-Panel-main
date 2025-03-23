import React, { useEffect, useState } from "react";
import axios from "axios";

const INTEREST_API = "http://localhost:4000/api/interests";

const InterestList = () => {
    const [interests, setInterests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchInterests();
    }, []);

    const fetchInterests = async () => {
        setLoading(true);
        try {
            const response = await axios.get(INTEREST_API);
            setInterests(response.data);
        } catch (error) {
            console.error("Error fetching interests:", error);
            setError("Failed to fetch interest submissions.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this interest submission?")) {
            try {
                await axios.delete(`${INTEREST_API}/${id}`);
                alert("Interest deleted successfully!");
                fetchInterests(); // Refresh list after deletion
            } catch (error) {
                console.error("Error deleting interest:", error);
                alert("Failed to delete interest.");
            }
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>User Interest Submissions</h2>

            {loading && <p style={styles.loading}>Loading...</p>}
            {error && <p style={styles.error}>{error}</p>}

            <div style={styles.gridContainer}>
                {interests.length === 0 ? (
                    <p style={styles.noData}>No interest submissions found.</p>
                ) : (
                    interests.map((interest) => (
                        <div key={interest._id} style={styles.card}>
                            <h3 style={styles.foodName}>{interest.petFoodName}</h3>
                            <p style={styles.details}><strong>Name:</strong> {interest.name}</p>
                            <p style={styles.details}><strong>Contact:</strong> {interest.contact}</p>
                            <p style={styles.details}><strong>Message:</strong> {interest.message || "No message provided"}</p>
                            <button style={styles.deleteButton} onClick={() => handleDelete(interest._id)}>Delete</button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

const styles = {
    container: {
        width: "80%",
        margin: "auto",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
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
    noData: {
        fontSize: "18px",
        color: "gray",
    },
    gridContainer: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "20px",
        justifyContent: "center",
    },
    card: {
        border: "1px solid #ddd",
        padding: "15px",
        borderRadius: "5px",
        textAlign: "center",
        backgroundColor: "#fff",
        boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
    },
    foodName: {
        fontSize: "18px",
        fontWeight: "bold",
        marginBottom: "10px",
        color: "#333",
    },
    details: {
        fontSize: "14px",
        color: "gray",
        marginBottom: "5px",
    },
    deleteButton: {
        backgroundColor: "red",
        color: "white",
        border: "none",
        padding: "10px 15px",
        cursor: "pointer",
        borderRadius: "5px",
        marginTop: "10px",
    },
};

export default InterestList;
