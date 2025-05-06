import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminNavBar() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    try {
      localStorage.removeItem("userToken");
      localStorage.removeItem("userInfo");
      localStorage.removeItem("userId");
      navigate("/"); // redirect to home
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">Admin Panel</div>
      <div className="navbar-time">{currentTime.toLocaleString()}</div>
      <h3 className="logout-btn" onClick={handleLogout}>Logout</h3>
    </nav>
  );
}

export default AdminNavBar;
