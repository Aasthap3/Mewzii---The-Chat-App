
import React from "react";
import Hero from "../components/Hero";
import Features from "../components/Features";
import UserReviews from "../components/UserReviews";
import Footer from "../components/Footer";


const HomePage = () => (
  <div className="min-h-screen flex flex-col bg-base-100">
    <div className="mb-16"><Hero /></div>
    <div className="mb-16"><Features /></div>
    <div className="mb-16"><UserReviews /></div>
    <Footer />
  </div>
);

export default HomePage;
