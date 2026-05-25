import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import SplashScreen from "./components/SplashScreen";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token"),
  );
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setShowSplash(false), 1800);
    return () => clearTimeout(timeout);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
  };

  if (showSplash) {
    return (
      <div className="app-shell">
        <div className="app-background">
          <span />
          <span />
          <span />
          <span />
          <div className="background-node" />
          <div className="background-node" />
          <div className="background-node" />
          <div className="background-node" />
        </div>
        <SplashScreen />
      </div>
    );
  }

  return (
    <div className="app-shell">
      <div className="app-background">
        <span />
        <span />
        <span />
        <span />
        <div className="background-node" />
        <div className="background-node" />
        <div className="background-node" />
        <div className="background-node" />
      </div>
      <Router>
        <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        <div className="app-container">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route
              path="/login"
              element={<Login setIsAuthenticated={setIsAuthenticated} />}
            />
            <Route
              path="/dashboard"
              element={
                isAuthenticated ? <Dashboard /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Navigate to="/dashboard" />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;

// Developer Note: Local storage token status defines default authentication state.
