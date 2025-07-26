import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import cat from "../assets/cat.svg";

const LoginPage = () => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    // Simulate login (accepts either demo@demo.com or demouser as username)
    setTimeout(() => {
      setLoading(false);
      if ((emailOrUsername === "demo@demo.com" || emailOrUsername === "demouser") && password === "demo123") {
        navigate("/chat");
      } else {
        setError("Invalid email/username or password");
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-200 via-base-100 to-base-300 px-2">
      <div className="card lg:card-side shadow-2xl bg-base-100 max-w-3xl w-full overflow-hidden">
        {/* Illustration Side */}
        <div className="hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-primary/10 to-secondary/10 p-10 w-1/2">
          <img src={cat} alt="Login Illustration" className="w-72 h-72 object-contain mb-6 animate-fade-in" />
          <h2 className="text-3xl font-extrabold text-primary mb-2">Welcome Back!</h2>
          <p className="text-lg text-base-content/70 text-center">Sign in to continue chatting with your friends.</p>
        </div>
        {/* Form Side */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 sm:p-12">
          <form className="w-full" onSubmit={handleSubmit}>
            <h2 className="text-3xl font-extrabold text-center mb-6 tracking-tight">Sign In</h2>
            {error && <div className="alert alert-error mb-4 py-2 px-3 text-center">{error}</div>}
            <div className="form-control mb-4">
              <label className="label font-semibold">Email or Username</label>
              <input type="text" className="input input-bordered input-md" value={emailOrUsername} onChange={e => setEmailOrUsername(e.target.value)} required placeholder="Enter your email or username" />
            </div>
            <div className="form-control mb-6">
              <label className="label font-semibold">Password</label>
              <input type="password" className="input input-bordered input-md" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Enter your password" />
            </div>
            <button className="btn btn-primary btn-lg w-full mb-2 shadow-md hover:scale-[1.02] transition-transform" type="submit" disabled={loading}>
              {loading ? <span className="loading loading-spinner"></span> : "Login"}
            </button>
            <div className="divider">or sign in with</div>
            <button type="button" className="btn btn-outline btn-primary w-full flex items-center gap-2 mb-2" onClick={() => alert('Google login coming soon!')}>
              <svg className="w-5 h-5" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M44.5 20H24v8.5h11.7C34.7 33.1 29.8 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c2.7 0 5.2.9 7.2 2.4l6.4-6.4C33.5 5.1 28.1 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 20-8.1 20-21 0-1.4-.1-2.4-.3-3.5z"/><path fill="#34A853" d="M6.3 14.7l7 5.1C15.1 17.1 19.2 14 24 14c2.7 0 5.2.9 7.2 2.4l6.4-6.4C33.5 5.1 28.1 3 24 3c-7.2 0-13.2 4.1-16.7 10.1z"/><path fill="#FBBC05" d="M24 44c5.8 0 10.7-2.1 14.3-5.7l-6.6-5.4C29.7 34.9 27 36 24 36c-5.7 0-10.6-3.7-12.3-8.8l-7 5.4C7.8 41.1 15.3 44 24 44z"/><path fill="#EA4335" d="M44.5 20H24v8.5h11.7c-1.2 3.2-4.2 5.5-7.7 5.5-5.7 0-10.6-3.7-12.3-8.8l-7 5.4C7.8 41.1 15.3 44 24 44c10.5 0 20-8.1 20-21 0-1.4-.1-2.4-.3-3.5z"/></g></svg>
              Google
            </button>
            <div className="text-center mt-2">
              <span>Don't have an account? </span>
              <Link to="/register" className="link link-primary">Register</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
