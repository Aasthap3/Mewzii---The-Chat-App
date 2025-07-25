import React from "react";
import { Link } from "react-router-dom";

const features = [
  {
    title: "Real-time Messaging",
    desc: "Chat instantly with friends and groups.",
    icon: "💬",
  },
  {
    title: "Custom Themes",
    desc: "Switch between beautiful daisyUI themes.",
    icon: "🎨",
  },
  {
    title: "Secure Login",
    desc: "Your data is protected with modern authentication.",
    icon: "🔒",
  },
];

const HomePage = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 px-4">
    <div className="max-w-2xl w-full text-center mt-16">
      <h1 className="text-5xl font-extrabold mb-4">Welcome to <span className="text-primary">Mewzii Chat</span>!</h1>
      <p className="mb-8 text-lg text-base-content/70">Connect, chat, and make friends instantly. Experience a modern, secure, and customizable chat platform.</p>
      <div className="flex gap-4 justify-center mb-8">
        <Link to="/login" className="btn btn-primary btn-lg">Login</Link>
        <Link to="/register" className="btn btn-secondary btn-lg">Register</Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {features.map(f => (
          <div key={f.title} className="card bg-base-100 shadow-md p-6">
            <div className="text-4xl mb-2">{f.icon}</div>
            <h3 className="font-bold text-xl mb-1">{f.title}</h3>
            <p className="text-base-content/70">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default HomePage;
