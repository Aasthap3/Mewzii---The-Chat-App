import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    // Simulate login
    setTimeout(() => {
      setLoading(false);
      if (email === "demo@demo.com" && password === "demo123") {
        navigate("/chat");
      } else {
        setError("Invalid email or password");
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <form className="card w-full max-w-sm bg-base-100 shadow-xl p-8" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <div className="alert alert-error mb-4 py-2 px-3">{error}</div>}
        <div className="form-control mb-4">
          <label className="label">Email</label>
          <input type="email" className="input input-bordered" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div className="form-control mb-6">
          <label className="label">Password</label>
          <input type="password" className="input input-bordered" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <button className="btn btn-primary w-full mb-2" type="submit" disabled={loading}>
          {loading ? <span className="loading loading-spinner"></span> : "Login"}
        </button>
        <div className="text-center mt-2">
          <span>Don't have an account? </span>
          <Link to="/register" className="link link-primary">Register</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
