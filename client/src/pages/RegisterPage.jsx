import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (!acceptedTerms) {
      setError("You must accept the terms and privacy policy.");
      return;
    }
    setLoading(true);
    // Simulate registration
    setTimeout(() => {
      setLoading(false);
      setSuccess("Registration successful! You can now login.");
      setTimeout(() => navigate("/login"), 1200);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <form className="card w-full max-w-sm bg-base-100 shadow-xl p-8" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        {error && <div className="alert alert-error mb-4 py-2 px-3">{error}</div>}
        {success && <div className="alert alert-success mb-4 py-2 px-3">{success}</div>}
        <div className="form-control mb-4">
          <label className="label">Name</label>
          <input type="text" className="input input-bordered" value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div className="form-control mb-4">
          <label className="label">Email</label>
          <input type="email" className="input input-bordered" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div className="form-control mb-4">
          <label className="label">Password</label>
          <input type="password" className="input input-bordered" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <div className="form-control mb-6">
          <label className="label">Confirm Password</label>
          <input type="password" className="input input-bordered" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
        </div>
        <div className="form-control mb-4">
          <label className="cursor-pointer label justify-start gap-2">
            <input
              type="checkbox"
              className="checkbox checkbox-primary"
              checked={acceptedTerms}
              onChange={e => setAcceptedTerms(e.target.checked)}
              required
            />
            <span className="label-text text-sm">
              I accept the <a href="#" className="link link-primary">Terms</a> and <a href="#" className="link link-primary">Privacy Policy</a>
            </span>
          </label>
        </div>
        <button className="btn btn-secondary w-full mb-2" type="submit" disabled={loading}>
          {loading ? <span className="loading loading-spinner"></span> : "Register"}
        </button>
        <div className="divider">or sign up with</div>
        <div className="flex flex-col gap-2 mb-2">
          <button type="button" className="btn btn-outline btn-primary w-full flex items-center gap-2" onClick={() => alert('Google sign up coming soon!')}>
            <svg className="w-5 h-5" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M44.5 20H24v8.5h11.7C34.7 33.1 29.8 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c2.7 0 5.2.9 7.2 2.4l6.4-6.4C33.5 5.1 28.1 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 20-8.1 20-21 0-1.4-.1-2.4-.3-3.5z"/><path fill="#34A853" d="M6.3 14.7l7 5.1C15.1 17.1 19.2 14 24 14c2.7 0 5.2.9 7.2 2.4l6.4-6.4C33.5 5.1 28.1 3 24 3c-7.2 0-13.2 4.1-16.7 10.1z"/><path fill="#FBBC05" d="M24 44c5.8 0 10.7-2.1 14.3-5.7l-6.6-5.4C29.7 34.9 27 36 24 36c-5.7 0-10.6-3.7-12.3-8.8l-7 5.4C7.8 41.1 15.3 44 24 44z"/><path fill="#EA4335" d="M44.5 20H24v8.5h11.7c-1.2 3.2-4.2 5.5-7.7 5.5-5.7 0-10.6-3.7-12.3-8.8l-7 5.4C7.8 41.1 15.3 44 24 44c10.5 0 20-8.1 20-21 0-1.4-.1-2.4-.3-3.5z"/></g></svg>
            Google
          </button>
          <button type="button" className="btn btn-outline btn-neutral w-full flex items-center gap-2" onClick={() => alert('GitHub sign up coming soon!')}>
            <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.58 2 12.26c0 4.5 2.87 8.32 6.84 9.67.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.1-1.5-1.1-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05A9.38 9.38 0 0 1 12 7.43c.85.004 1.71.12 2.51.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.07.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z"/></svg>
            GitHub
          </button>
          <button type="button" className="btn btn-outline btn-info w-full flex items-center gap-2" onClick={() => alert('Facebook sign up coming soon!')}>
            <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#1877F3" d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg>
            Facebook
          </button>
        </div>
        <div className="text-center mt-2">
          <span>Already have an account? </span>
          <Link to="/login" className="link link-primary">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
