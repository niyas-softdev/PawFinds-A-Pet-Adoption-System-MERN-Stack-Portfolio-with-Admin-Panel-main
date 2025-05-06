// ✅ PostPetSection for Selling Pets Only (Adoption Removed)
import React, { useState, useEffect } from "react";
import postPet from "./images/postPet.png";

const PostPetSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    area: "",
    justification: "",
    email: "",
    phone: "",
    type: "None",
    picture: null,
    price: "",
  });

  const [fileName, setFileName] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (!isSubmitting) setErrors({});
  }, [isSubmitting]);

  const validate = () => {
    const errs = {};
    if (!formData.name) errs.name = true;
    if (!formData.age) errs.age = true;
    if (!formData.area) errs.area = true;
    if (!formData.justification) errs.justification = true;
    if (!formData.email || !/^[a-zA-Z0-9._-]+@gmail\.com$/.test(formData.email)) errs.email = true;
    if (!formData.phone) errs.phone = true;
    if (!formData.picture) errs.picture = true;
    if (formData.type === "None") errs.type = true;
    if (!formData.price || isNaN(formData.price) || parseFloat(formData.price) <= 0) errs.price = true;
    return errs;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, picture: file });
      setFileName(file.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    const bodyData = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "picture") {
        if (formData.picture) bodyData.append("picture", formData.picture);
      } else {
        bodyData.append(key, formData[key]);
      }
    });
    bodyData.append("purpose", "Sale");

    try {
      const response = await fetch("http://localhost:5174/api/pets/post", {
        method: "POST",
        body: bodyData,
      });

      if (!response.ok) throw new Error("Network response failed");

      setShowPopup(true);
      setFormData({
        name: "",
        age: "",
        area: "",
        justification: "",
        email: "",
        phone: "",
        type: "None",
        picture: null,
        price: "",
      });
      setFileName("");
    } catch (err) {
      console.error("Submit error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="post-pet-section">
      <h2 style={{ textAlign: "center", color: "#e91e63" }}>Sell a Pet</h2>
      <img src={postPet} alt="Pet" style={{ display: "block", margin: "0 auto", maxWidth: "100%" }} />

      <form onSubmit={handleSubmit} encType="multipart/form-data" style={{ marginTop: "2rem" }}>
        <div className="input-box">
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </div>

        <div className="input-box">
          <label>Pet Age:</label>
          <input type="text" name="age" value={formData.age} onChange={handleChange} />
        </div>

        <div className="input-box">
          <label>Picture:</label>
          <label className="file-input-label" style={{ cursor: "pointer", backgroundColor: "#f5f5f5", padding: "8px 12px", borderRadius: "6px", display: "inline-block", color: "#333" }}>
            <span>{fileName || "Choose a Picture"}</span>
            <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: "none" }} />
          </label>
        </div>

        <div className="input-box">
          <label>Location:</label>
          <input type="text" name="area" value={formData.area} onChange={handleChange} />
        </div>

        <div className="filter-selection-service">
          <label>Type:</label>
          <select name="type" value={formData.type} onChange={handleChange}>
            <option value="None">None</option>
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
            <option value="Rabbit">Rabbit</option>
            <option value="Bird">Bird</option>
            <option value="Fish">Fish</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="input-box">
          <label>Justification:</label>
          <textarea name="justification" rows="4" value={formData.justification} onChange={handleChange} style={{ resize: "none" }}></textarea>
        </div>

        <div className="input-box">
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>

        <div className="input-box">
          <label>Phone:</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
        </div>

        <div className="input-box">
          <label>Sell Price (₹):</label>
          <input type="number" name="price" placeholder="Enter price in INR" value={formData.price} onChange={handleChange} style={{ borderColor: errors.price ? "red" : "" }} />
        </div>

        {Object.keys(errors).length > 0 && (
          <p className="error-message" style={{ color: "red", textAlign: "center" }}>
            Please fill all fields correctly.
          </p>
        )}

        <button type="submit" className="cta-button" disabled={isSubmitting} style={{ backgroundColor: "#e91e63", color: "white", padding: "10px 20px", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}>
          {isSubmitting ? "Submitting..." : "Sell Pet"}
        </button>

        {showPopup && (
          <div className="popup">
            <div className="popup-content" style={{ textAlign: "center", backgroundColor: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.2)" }}>
              <h4>Submission Received! We’ll reach out soon.</h4>
              <button className="close-btn" onClick={() => setShowPopup(false)} style={{ marginTop: "10px", padding: "6px 12px", backgroundColor: "#e91e63", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                Close
              </button>
            </div>
          </div>
        )}
      </form>
    </section>
  );
};

export default PostPetSection;