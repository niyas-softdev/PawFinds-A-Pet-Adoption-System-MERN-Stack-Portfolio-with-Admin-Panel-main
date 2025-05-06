// ✅ Pet Adoption List (User Side) with Add to Cart, Cart Alignment, and UI Enhancements + userId handling
import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5174/api/pets/approved";
const ORDER_URL = "http://localhost:5174/api/pet-orders/place";

const PetList = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [userDetails, setUserDetails] = useState({ name: "", address: "", phone: "" });
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setPets(response.data);
    } catch (error) {
      console.error("Error loading pets:", error);
      setError("Failed to fetch pet data.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (item) => {
    if (!cart.find(i => i._id === item._id)) {
      setCart([...cart, item]);
    } else {
      alert("Pet already in cart");
    }
  };

  const handleCheckout = async () => {
    if (!userId) return alert("User ID missing. Please log in.");

    const order = {
      userId,
      userDetails,
      items: cart.map(item => ({
        petId: item._id,
        name: item.name,
        price: item.price
      })),
      total: cart.reduce((sum, item) => sum + item.price, 0),
      paymentMode: "COD",
    };

    try {
      const res = await axios.post(ORDER_URL, order);
      console.log("Order saved:", res.data);
      alert("Order placed successfully!");
      setCart([]);
      setShowCheckout(false);
      setUserDetails({ name: "", address: "", phone: "" });
    } catch (err) {
      console.error("Checkout failed:", err);
      alert("Failed to place order.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Adoptable Pets</h2>
      {loading && <p style={styles.loading}>Loading...</p>}
      {error && <p style={styles.error}>{error}</p>}

      <div style={styles.gridContainer}>
        {pets.map((pet) => (
          <div key={pet._id} style={styles.card}>
            <div style={styles.imageContainer}>
            <img
  src={`http://localhost:5174/images/${pet.filename}`}
  alt={pet.name}
  onError={(e) => {
    e.target.onerror = null;
    e.target.src = "https://widgets.truekonnects.com/images/default_food.jpg";
  }}
  style={{ width: "100%", height: "100%", objectFit: "cover" }}
/>




            </div>
            <div style={styles.cardContent}>
              <h3 style={styles.foodName}>{pet.name}</h3>
              <p style={styles.details}><strong>Type:</strong> {pet.type}</p>
              <p style={styles.details}><strong>Breed:</strong> {pet.breed}</p>
              <p style={styles.price}><strong>Price:</strong> ₹{pet.price}</p>
              <p style={styles.details}><strong>Age:</strong> {pet.age} years</p>
              <button style={styles.button} onClick={() => handleAddToCart(pet)}>Add to Cart <i className="fa fa-cart-plus"></i></button>
            </div>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <div style={styles.cartSection}>
          <h3 style={styles.cartTitle}>🛒 Your Cart</h3>
          {cart.map((item) => (
            <div key={item._id} style={styles.cartItem}>
              <span style={styles.cartItemName}>{item.name}</span>
              <span style={styles.cartItemPrice}>₹{item.price}</span>
            </div>
          ))}
          <p style={styles.total}><strong>Total:</strong> ₹{cart.reduce((sum, i) => sum + i.price, 0)}</p>
          <button onClick={() => setShowCheckout(true)} style={styles.checkoutBtn}>Buy Now</button>
        </div>
      )}

      {showCheckout && (
        <div style={styles.popupOverlay}>
          <div style={styles.popup}>
            <h3>Checkout (Cash on Delivery)</h3>
            <p>Total Items: {cart.length}</p>
            <p>Total Price: ₹{cart.reduce((sum, i) => sum + i.price, 0)}</p>
            <input type="text" placeholder="Your Name" value={userDetails.name} onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })} style={styles.input} />
            <input type="text" placeholder="Address" value={userDetails.address} onChange={(e) => setUserDetails({ ...userDetails, address: e.target.value })} style={styles.input} />
            <input type="text" placeholder="Phone Number" value={userDetails.phone} onChange={(e) => setUserDetails({ ...userDetails, phone: e.target.value })} style={styles.input} />
            <div style={styles.buttonContainer}>
              <button onClick={handleCheckout} style={styles.button}>Place Order</button>
              <button onClick={() => setShowCheckout(false)} style={styles.closeButton}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: { width: "80%", margin: "auto", textAlign: "center", fontFamily: "'Arial', sans-serif" },
  title: { fontSize: "28px", fontWeight: "bold", marginBottom: "20px", color: "#333" },
  loading: { color: "blue", fontSize: "18px" },
  error: { color: "red", fontSize: "16px" },
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
  },
  imageContainer: { width: "100%", height: "180px", overflow: "hidden" },
  image: { width: "100%", height: "100%", objectFit: "cover" },
  cardContent: { padding: "10px" },
  foodName: { fontSize: "20px", fontWeight: "bold", marginTop: "10px", color: "#333" },
  details: { fontSize: "12px", color: "#555", marginBottom: "5px" },
  price: { fontSize: "16px", fontWeight: "bold", color: "#28a745" },
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
  cartSection: {
    marginTop: "40px",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
    textAlign: "left",
  },
  cartTitle: { fontSize: "20px", fontWeight: "bold", marginBottom: "15px", color: "#444" },
  cartItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "8px 0",
    borderBottom: "1px solid #ddd",
  },
  cartItemName: { fontSize: "14px", color: "#222" },
  cartItemPrice: { fontWeight: "bold", color: "#28a745" },
  total: { marginTop: "10px", fontWeight: "bold", fontSize: "16px", textAlign: "right" },
  checkoutBtn: {
    marginTop: "10px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    padding: "10px 20px",
    cursor: "pointer",
    borderRadius: "6px",
    fontSize: "14px",
  },
  popupOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
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

export default PetList;
