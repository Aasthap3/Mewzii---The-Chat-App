import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import cat from "../assets/cat.svg";
import axios from "../config/api";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const [registerData, setRegisterData] = useState({
    username: "",
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=]{6,}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    if (!usernameRegex.test(registerData.username)) {
      setError(
        "Username must be 3-20 characters, letters, numbers, or underscores only."
      );
      setLoading(false);
      return;
    }
    if (!emailRegex.test(registerData.email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }
    if (!passwordRegex.test(registerData.password)) {
      setError(
        "Password must be at least 6 characters, include a letter and a number."
      );
      setLoading(false);
      return;
    }
    if (registerData.password !== registerData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }
    if (!acceptedTerms) {
      setError("You must accept the terms and privacy policy.");
      setLoading(false);
      return;
    }
    try {
      const res = await axios.post("/auth/register", registerData);
      toast.success("Registration successful! Please log in.");
      navigate("/login");
    } catch (err) {
      toast.error(
        `Error: ${err?.response?.status || 500} : ${
          err?.response?.data?.message || "Registration failed"
        }`
      );
    }
    setLoading(false);
    setRegisterData({
      username: "",
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-200 via-base-100 to-base-300 px-2 py-6">
      <div className="card flex flex-col lg:flex-row shadow-2xl bg-base-100 max-w-4xl w-full overflow-hidden mx-2">
        {/* Illustration Side */}
        <div className="hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-primary/10 to-secondary/10 p-6 md:p-10 w-full lg:w-1/2 min-w-[220px] md:min-w-[300px]">
          <img
            src={cat}
            alt="Register Illustration"
            className="w-32 h-32 sm:w-48 sm:h-72 object-contain mb-4 md:mb-6 animate-fade-in"
          />
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-primary mb-1 md:mb-2 text-center">
            Join Mewzii!
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-base-content/70 text-center">
            Create your account and start chatting with friends instantly.
          </p>
        </div>
        {/* Form Side */}
        <div className="w-full flex flex-col justify-center items-center p-2 sm:p-4 md:p-8">
          <form
            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl bg-base-100 rounded-lg shadow-none md:shadow p-4 sm:p-6 md:p-8"
            onSubmit={handleSubmit}
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-center mb-4 md:mb-6 tracking-tight">
              Create Account
            </h2>
            {error && (
              <div className="alert alert-error mb-4 py-2 px-3 text-center">
                {error}
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="form-control">
                <label className="label font-semibold">Full Name</label>
                <input
                  type="text"
                  className="input input-bordered input-md w-full"
                  name="fullname"
                  value={registerData.fullname}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label font-semibold">Username</label>
                <input
                  type="text"
                  className="input input-bordered input-md w-full"
                  name="username"
                  value={registerData.username}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-control mb-4">
              <label className="label font-semibold">Email</label>
              <input
                type="email"
                className="input input-bordered input-md w-full"
                name="email"
                value={registerData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="form-control">
                <label className="label font-semibold">Password</label>
                <input
                  type="password"
                  className="input input-bordered input-md w-full"
                  name="password"
                  value={registerData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label font-semibold">Confirm Password</label>
                <input
                  type="password"
                  className="input input-bordered input-md w-full"
                  name="confirmPassword"
                  value={registerData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-control mb-4">
              <label className="cursor-pointer label justify-start gap-2">
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  required
                />
                <span className="label-text text-sm">
                  I accept the{" "}
                  <a href="#" className="link link-primary">
                    Terms
                  </a>{" "}
                  and{" "}
                  <a href="#" className="link link-primary">
                    Privacy Policy
                  </a>
                </span>
              </label>
            </div>
            <button
              className="btn btn-primary btn-lg w-full mb-2 shadow-md hover:scale-[1.02] transition-transform text-base md:text-lg"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Register"
              )}
            </button>
            <div className="text-center mt-2">
              <span>Already have an account? </span>
              <Link to="/login" className="link link-primary">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
