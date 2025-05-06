import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";
import "./AuthPopup.css";

const API_BASE_URL = "http://localhost:5174";

export default function AuthPopup({ onClose, onLoginSuccess }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const endpoint = isSignUp ? "/api/auth/signup" : "/api/auth/signin";
    const url = `${API_BASE_URL}${endpoint}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || `Error ${response.status}`);
      }

      if (isSignUp) {
        toast.success("Account Created Successfully! Please Sign In.", { autoClose: 3000 });
        setIsSignUp(false);
        setFormData({ name: "", email: "", password: "" });
        return;
      }

      if (!data.token) throw new Error("No token received after sign-in.");
      const decoded = jwtDecode(data.token);
      if (!decoded.id) throw new Error("Invalid token: Missing user ID");
      
      const userData = {
        id: decoded.id,
        name: decoded.name || "User",
        email: decoded.email || formData.email,
        role: decoded.role || "user",
        token: data.token,
      };
      
      localStorage.setItem("userToken", data.token);
      localStorage.setItem("userInfo", JSON.stringify(userData));
      localStorage.setItem("userId", decoded.id); // ✅ Set userId separately
      
      toast.success("Welcome Back! 🚀", { autoClose: 3000 });
      onLoginSuccess(userData);
      onClose(); // Close after login
      
    } catch (error) {
      console.error("Auth Error:", error.message);
      toast.error(error.message || "Something went wrong. Please try again.", { autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-overlay">
      <div className="auth-modal">
        {/* ✅ Working Close Button */}
        <button
          className="auth-close"
          onClick={() => {
            console.log("Closing popup...");
            onClose();
          }}
          aria-label="Close"
        >
          <AiOutlineClose size={22} />
        </button>

        <h2 className="auth-heading">{isSignUp ? "Create Account" : "Sign In"}</h2>

        <form onSubmit={handleSubmit} className="auth-form">
          {isSignUp && (
            <input
              name="name"
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          )}
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="auth-submit" disabled={loading}>
            {loading ? "Processing..." : isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>

        <div className="auth-toggle-text">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}
          <button className="auth-toggle-btn" onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}
