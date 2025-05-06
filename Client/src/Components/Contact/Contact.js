import React from "react";
import developerPng from "./images/developer-png.png";

const Contact = () => {
  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <div style={styles.hero}>
        <h1 style={styles.title}>🐶 Pet Services & 🩺 Vet Consultations</h1>
        <p style={styles.subtitle}>
          We care for your pets like family. Book grooming, health checkups, and training sessions with expert vets and handlers.
        </p>
      </div>

      {/* Services Section */}
      <div style={styles.servicesGrid}>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>🛁 Pet Grooming</h3>
          <p style={styles.cardText}>
            Spa, haircuts, nail trimming, and more with certified pet groomers. Keep your pet clean and happy.
          </p>
        </div>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>🎓 Pet Training</h3>
          <p style={styles.cardText}>
            Behavioral training, potty training, and obedience programs tailored for dogs and cats.
          </p>
        </div>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>🏠 Pet Adoption</h3>
          <p style={styles.cardText}>
            Adopt pets with verified health records and connect with loving animals needing homes.
          </p>
        </div>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>👨‍⚕️ Vet Consultation</h3>
          <p style={styles.cardText}>
            Book online or offline doctor appointments for checkups, vaccinations, and treatment plans.
          </p>
        </div>
      </div>

      {/* Contact Section */}
      <div style={styles.contactSection}>
        <img src={developerPng} alt="Profile" style={styles.image} />
        <div style={styles.contactInfo}>
          <h2 style={{ marginBottom: "10px" }}>📞 Contact Us</h2>
          <p><strong>Email:</strong> <a href="mailto:softdev.niyas@gmail.com">softdev.niyas@gmail.com</a></p>
          <p><strong>Phone:</strong> <a href="tel:+919360478392">+91 93604 78392</a></p>
          <p><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/softdev-niyas" target="_blank" rel="noreferrer">softdev-niyas</a></p>
          <p><strong>GitHub:</strong> <a href="https://github.com/niyas-softdev" target="_blank" rel="noreferrer">niyas-softdev</a></p>
          <p><strong>Instagram:</strong> <a href="https://www.instagram.com/sid._.ns/" target="_blank" rel="noreferrer">@sid._.ns</a></p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Segoe UI', sans-serif",
    padding: "40px 20px",
    backgroundColor: "#f7f9fc",
  },
  hero: {
    textAlign: "center",
    marginBottom: "50px",
  },
  title: {
    fontSize: "34px",
    color: "#333",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: "18px",
    color: "#555",
    maxWidth: "600px",
    margin: "10px auto 0",
  },
  servicesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "20px",
    marginBottom: "50px",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.06)",
    textAlign: "center",
    borderLeft: "4px solid #9d60f2",
  },
  cardTitle: {
    fontSize: "20px",
    color: "#4a4a4a",
    marginBottom: "10px",
  },
  cardText: {
    fontSize: "14px",
    color: "#666",
  },
  contactSection: {
    display: "flex",
    flexDirection: "row",
    gap: "30px",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
  },
  image: {
    width: "180px",
    height: "180px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "3px solid #9d60f2",
  },
  contactInfo: {
    fontSize: "15px",
    lineHeight: "1.6",
    color: "#333",
    maxWidth: "400px",
  }
};

export default Contact;
