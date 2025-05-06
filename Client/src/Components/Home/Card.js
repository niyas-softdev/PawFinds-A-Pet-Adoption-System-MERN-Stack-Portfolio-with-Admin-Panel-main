import React from 'react';

const Card = ({ title, description }) => {
  return (
    <div style={styles.card}>
      <h3 style={styles.title}>{title}</h3>
      <p style={styles.text}>{description}</p>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: "#fff",
    padding: "20px",
    width: "300px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.08)",
    textAlign: "left",
  },
  title: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#333",
  },
  text: {
    fontSize: "14px",
    color: "#555",
    lineHeight: "1.6"
  }
};

export default Card;
