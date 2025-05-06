import React, { useEffect, useState } from "react";
import axios from "axios";

const UserProfile = () => {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("userToken");

  const [user, setUser] = useState(null);
  const [petOrders, setPetOrders] = useState([]);
  const [foodOrders, setFoodOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userId || !token) {
      setError("User not logged in.");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const [userRes, petRes, foodRes] = await Promise.all([
          axios.get(`http://localhost:5174/api/auth/user/${userId}`, config),
          axios.get(`http://localhost:5174/api/pet-orders/user/${userId}`, config),
          axios.get(`http://localhost:5174/api/food-orders/user/${userId}`, config),
        ]);

        setUser(userRes.data);
        setPetOrders(petRes.data);
        setFoodOrders(foodRes.data);
      } catch (err) {
        console.error("Profile Load Error:", err);
        setError("Failed to load user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, token]);

  if (loading) return <p style={styles.loading}>Loading profile...</p>;
  if (error) return <p style={styles.error}>{error}</p>;

  return (
    <div style={styles.container}>
      <button style={styles.backButton} onClick={() => window.location.href = "/"}>
        ⬅️ Back to Home
      </button>

      <h2 style={styles.heading}>👤 User Profile</h2>

      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>User Info</h3>
        <div style={styles.card}>
          <p><strong>Name:</strong> {user?.name}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Role:</strong> {user?.role}</p>
        </div>
      </div>

      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>🐾 Pet Orders</h3>
        {petOrders.length === 0 ? (
          <p>No pet orders found.</p>
        ) : (
          petOrders.map(order => (
            <div key={order._id} style={styles.card}>
              <p><strong>Order ID:</strong> {order._id}</p>
              <p><strong>Payment Mode:</strong> {order.paymentMode}</p>
              <p><strong>Total:</strong> ₹{order.total}</p>
              <p><strong>Pets:</strong></p>
              <ul>
                {order.items.map((item, index) => (
                  <li key={index}>{item.name} - ₹{item.price}</li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>

      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>🍖 Pet Food Orders</h3>
        {foodOrders.length === 0 ? (
          <p>No food orders found.</p>
        ) : (
          foodOrders.map(order => (
            <div key={order._id} style={styles.card}>
              <p><strong>Order ID:</strong> {order._id}</p>
              <p><strong>Payment Mode:</strong> {order.paymentMode}</p>
              <p><strong>Total:</strong> ₹{order.total}</p>
              <p><strong>Items:</strong></p>
              <ul>
                {order.items.map((item, index) => (
                  <li key={index}>{item.name} - ₹{item.price}</li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "960px",
    margin: "40px auto",
    padding: "20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  heading: {
    textAlign: "center",
    fontSize: "32px",
    marginBottom: "30px",
    color: "#333",
  },
  section: {
    marginBottom: "30px",
  },
  sectionTitle: {
    fontSize: "22px",
    marginBottom: "15px",
    color: "#444",
    borderBottom: "2px solid #ccc",
    paddingBottom: "5px",
  },
  card: {
    backgroundColor: "#fff",
    padding: "20px",
    marginBottom: "15px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
    border: "1px solid #eee",
  },
  loading: {
    textAlign: "center",
    fontSize: "18px",
    color: "#007bff",
  },
  error: {
    textAlign: "center",
    fontSize: "18px",
    color: "red",
  },
  backButton: {
    marginBottom: "15px",
    padding: "10px 18px",
    fontSize: "14px",
    backgroundColor: "#eee",
    color: "#333",
    border: "1px solid #ccc",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default UserProfile;
