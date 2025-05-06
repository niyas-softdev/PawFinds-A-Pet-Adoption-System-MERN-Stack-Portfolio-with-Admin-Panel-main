import React from 'react';
import Card from "./Card";

const PlanningToAdoptAPet = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Thinking of Adopting a Pet?</h1>
      <div style={styles.divider}></div>
      <p style={styles.subheading}>
        Explore the benefits, process, and emotional rewards of giving a pet a forever home through our platform.
      </p>

      <div style={styles.cardRow}>
        <Card
          title="Why Adopt With Us?"
          description="We connect you with verified, healthy pets in need of a loving home. All our pets come with vet checkups, vaccination records, and verified profiles."
        />
        <Card
          title="How Adoption Works"
          description="Browse approved pets, schedule a meeting, and complete a simple verification form. Once approved, you can bring your new best friend home."
        />
        <Card
          title="Post-Adoption Support"
          description="After adoption, we provide pet care guidance, training support, and access to veterinary consultation to ensure a smooth transition for both of you."
        />
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "60px 20px",
    textAlign: "center",
    fontFamily: "'Segoe UI', sans-serif"
  },
  heading: {
    fontSize: "32px",
    fontWeight: "bold",
    color: "#2e2e2e",
  },
  divider: {
    width: "60px",
    height: "3px",
    backgroundColor: "#333",
    margin: "10px auto 20px"
  },
  subheading: {
    fontSize: "16px",
    color: "#666",
    marginBottom: "40px",
    maxWidth: "600px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  cardRow: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "24px",
  }
};

export default PlanningToAdoptAPet;
