import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ChatInterface from "./pages/ChatInterface";
import UserProfilePage from "./pages/UserProfilePage";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/about" element={<AboutPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/chat" element={<ChatInterface />} />
    <Route path="/userProfile" element={<UserProfilePage />} />
  </Routes>
);

export default AppRoutes;