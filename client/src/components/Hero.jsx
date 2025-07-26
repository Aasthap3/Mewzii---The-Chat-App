import React from "react";
import { Link } from "react-router-dom";
import chat from "../assets/chat.svg";

const Hero = () => (
  <section className="w-full flex flex-col items-center justify-center py-16 px-4 bg-gradient-to-br from-primary/10 to-secondary/10">
    <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-center">
      Welcome to <span className="text-primary">Mewzii Chat</span>!
    </h1>
    <p className="mb-8 text-lg md:text-xl text-base-content/70 max-w-2xl text-center">
      Connect, chat, and make friends instantly. Experience a modern, secure, and customizable chat platform.
    </p>
    <div className="flex gap-4 justify-center mb-8">
      <Link to="/register" className="btn btn-primary btn-lg">Get Started</Link>
    </div>
    <img src={chat} alt="Chat Illustration" className="w-80 h-80 object-contain rounded-xl" />
  </section>
);

export default Hero;
