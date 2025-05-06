import React, { useEffect, useState } from "react";
import axios from "axios";

const ORDER_URL = "http://localhost:5174/api/food-orders/all";

const AdminFoodOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await axios.get(ORDER_URL);
      setOrders(res.data);
    } catch (err) {
      console.error("Failed to load orders", err);
      setError("Could not fetch order data.");
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: { padding: "20px", fontFamily: "Arial" },
    title: { fontSize: "28px", marginBottom: "20px" },
    orderList: { display: "flex", flexWrap: "wrap", gap: "20px" },
    orderCard: {
      border: "1px solid #ccc",
      borderRadius: "8px",
      padding: "15px",
      width: "300px",
      backgroundColor: "#f9f9f9",
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    },
    orderTitle: { marginBottom: "10px", color: "#4a4a4a" },
    itemList: {
      marginTop: "10px",
      paddingTop: "10px",
      borderTop: "1px solid #ddd",
    },
    item: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: "14px",
      marginTop: "4px",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📦 All Food Orders</h2>
      {loading && <p>Loading orders...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {orders.length === 0 && !loading ? (
        <p>No orders found.</p>
      ) : (
        <div style={styles.orderList}>
          {orders.map((order) => (
            <div key={order._id} style={styles.orderCard}>
              <h3 style={styles.orderTitle}>Order ID: {order._id}</h3>
              <p><strong>User ID:</strong> {typeof order.userId === 'object' ? order.userId._id : order.userId}</p>
              <p><strong>Name:</strong> {order.userDetails?.name || "N/A"}</p>
              <p><strong>Address:</strong> {order.userDetails?.address || "N/A"}</p>
              <p><strong>Phone:</strong> {order.userDetails?.phone || "N/A"}</p>
              <p><strong>Payment:</strong> {order.paymentMode}</p>
              <p><strong>Total:</strong> ₹{order.total}</p>
              <div style={styles.itemList}>
                <strong>Items:</strong>
                {order.items?.map((item, index) => (
                  <div key={index} style={styles.item}>
                    <span>{item.name}</span>
                    <span>₹{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminFoodOrders;
