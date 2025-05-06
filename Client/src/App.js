import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/NavBar/Navbar";
import Home from "./Components/Home/Home";
import Footer from "./Components/Footer/Footer";
import Services from "./Components/Services/Services";
import Contact from "./Components/Contact/Contact";
import Pets from "./Components/Pets/Pets";
import AdoptForm from "./Components/AdoptForm/AdoptForm";
import AdminLogin from "./Components/AdminPanel/AdminLogin";
import PetFoodList from "./Components/Foods/Food";
import AuthPopup from "./Components/auth/AuthPopup";
import ProtectedRoute from "./Components/auth/ProtectedRoute";
import AdminPanel from "./Components/AdminPanel/AdminPanel"; // 👈 Admin dashboard entry
import "./App.css";
import UserProfile from "./Components/auth/UserProfile";

const Layout = ({ children }) => (
  <>
    <Navbar title="PawFinds" />
    {children}
    <Footer title="PawFinds" />
  </>
);

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home description="Ensure you are fully prepared to provide proper care and attention to your pet before welcoming them into your home." />
            </Layout>
          }
        />
        <Route path="/services" element={<Layout><Services /></Layout>} />
        <Route path="/login" element={<AuthPopup />} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
        <Route path="/pets" element={<Layout><Pets /></Layout>} />
        <Route path="/petFoodList" element={<Layout><PetFoodList /></Layout>} />
        <Route path="/adopt-form" element={<Layout><AdoptForm /></Layout>} />
        <Route path="/admin" element={<AdminLogin />} />
         <Route path="/profile" element={<UserProfile />} />


        {/* ✅ Protected Admin Dashboard */}
        <Route element={<ProtectedRoute roles={["admin"]} />}>
          <Route path="/admin-panel" element={<AdminPanel />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
