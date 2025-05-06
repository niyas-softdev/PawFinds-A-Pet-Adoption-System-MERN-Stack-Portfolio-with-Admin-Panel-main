// ✅ Navbar.js - Fully Corrected
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import logo from "./images/logo.png";
import AuthPopup from "../auth/AuthPopup";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    const storedUser = localStorage.getItem("userInfo");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);

        if (decoded.exp < currentTime) {
          handleLogout();
          return;
        }

        const userObj = storedUser ? JSON.parse(storedUser) : {
          name: decoded?.name || "User",
          role: decoded?.role || "user",
        };

        setUser(userObj);

        if (userObj.role === "admin" && location.pathname !== "/admin-panel") {
          navigate("/admin-panel");
        }
      } catch (err) {
        console.error("Token decode error:", err);
        handleLogout();
      }
    }
  }, [location.pathname, navigate]);

  const handleLogout = () => {
    try {
      // ✅ Remove all possible user-related localStorage items
      localStorage.removeItem("userToken");
      localStorage.removeItem("userInfo");
      localStorage.removeItem("userId"); // <- you forgot this one!
  
      // ✅ Reset state
      setUser(null);
      setProfileOpen(false);
  
      // ✅ Redirect to home
      navigate("/");
  
      // Optional: force refresh to clear stale UI state
      // window.location.reload();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  

  const handleLoginSuccess = (userData) => {
    try {
      const { token } = userData;
      if (!token) throw new Error("Invalid token received");
      localStorage.setItem("userToken", token);
      localStorage.setItem("userInfo", JSON.stringify(userData));
      setUser(userData);

      if (userData.role === "admin") {
        navigate("/admin-panel");
      }
    } catch (error) {
      console.error("Login token decode failed:", error);
    }
  };

  return (
    <>
      <nav className="navbar-container" style={{ backgroundColor: "var(--orange)" }}>
        <Link className="logo-container" to="/">
          <img className="navbar-logo" src={logo} alt="PawFinds Logo" />
          <p>Meow</p>
        </Link>

        <ul className="navbar-links">
          {user?.role === "admin" ? (
            <li><Link to="/admin-panel">Admin Dashboard</Link></li>
          ) : (
            <>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/pets">Pets</Link></li>
              <li><Link to="/petFoodList">Foods</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </>
          )}
        </ul>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {user ? (
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                style={{
                  background: "none",
                  border: "2px solid var(--white)",
                  borderRadius: "20px",
                  padding: "5px 15px",
                  fontWeight: "bold",
                  color: "var(--black)",
                  cursor: "pointer",
                }}
              >
                <FaUserCircle style={{ marginRight: "6px", verticalAlign: "middle" }} />
                {user.name}
              </button>

              {profileOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "40px",
                    right: 0,
                    backgroundColor: "white",
                    border: "1px solid #ccc",
                    borderRadius: "6px",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                    zIndex: 99,
                  }}
                >
                  {user.role !== "admin" && (
                    <Link
                      to="/profile"
                      onClick={() => setProfileOpen(false)}
                      style={{
                        display: "block",
                        padding: "8px 16px",
                        textDecoration: "none",
                        color: "#333",
                      }}
                    >
                      My Profile
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    style={{
                      width: "100%",
                      padding: "8px 16px",
                      border: "none",
                      background: "none",
                      textAlign: "left",
                      cursor: "pointer",
                      color: "#333",
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setShowAuthPopup(true)}
              className="navbar-button"
              style={{
                border: "2px solid var(--white)",
                borderRadius: "20px",
                padding: "5px 15px",
                backgroundColor: "white",
                color: "var(--orange)",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Login / Register
            </button>
          )}
        </div>
      </nav>

      {showAuthPopup && (
        <AuthPopup
          onClose={() => setShowAuthPopup(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </>
  );
};

export default Navbar;