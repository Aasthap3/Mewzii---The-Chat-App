import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import {FcGoogle} from "react-icons/fc";
import cat from "../assets/cat.svg";
import axios from "../config/api";
import toast from "react-hot-toast";
import { useGoogleAuth } from "../config/googleAuth";

const LoginPage = () => {
  const { theme } = useTheme();
  const {
    isLoading,
    error: googleError,
    isInitialized,
    signInWithGoogle,
  } = useGoogleAuth();
  const [loginData, setLoginData] = useState({
    emailOrUsername: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setLoading(true);
    try {
      const res = await axios.post("/auth/login", loginData);
        toast.success("Login successful!");
        navigate("/chat");
    } catch (error) {
      setFormError(
        `Error: ${error?.response?.status || 500} : ${
          error?.response?.data?.message || "Login failed"
        }`
      );
    }
    setLoading(false);
    setLoginData({
      emailOrUsername: "",
      password: "",
    });
  };

  const handleGoogleSuccess = async (userData) => {
    try {
      console.log("Google login successful:", userData);
      const res = await axios.post("/auth/googleLogin", userData);
      toast.success(res.data.message);
      navigate("/chat");
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Google login failed. Please try again.");
    }
  };

  const handleGoogleFailure = (error) => {
    console.error("Google login error:", error);
    toast.error("Google login failed. Please try again.");
  };

  const handleGoogleSignIn = async () => {
    signInWithGoogle(handleGoogleSuccess, handleGoogleFailure);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-200 via-base-100 to-base-300 px-2 py-6">
      <div className="card flex flex-col md:flex-row shadow-2xl bg-base-100 max-w-3xl w-full overflow-hidden mx-2">
        {/* Illustration Side */}
        <div className="flex flex-col justify-center items-center bg-gradient-to-br from-primary/10 to-secondary/10 p-6 md:p-10 w-full md:w-1/2 min-w-[220px] md:min-w-[300px] order-1 md:order-none">
          <img
            src={cat}
            alt="Login Illustration"
            className="w-32 h-32 sm:w-48 sm:h-48 md:w-72 md:h-72 object-contain mb-4 md:mb-6 animate-fade-in"
          />
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-primary mb-1 md:mb-2 text-center">
            Welcome Back!
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-base-content/70 text-center">
            Sign in to continue chatting with your friends.
          </p>
        </div>
        {/* Form Side */}
        <div className="w-full flex flex-col justify-center items-center p-2 sm:p-4 md:p-8 order-2">
          <form
            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl bg-base-100 rounded-lg shadow-none md:shadow p-4 sm:p-6 md:p-8"
            onSubmit={handleSubmit}
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-center mb-4 md:mb-6 tracking-tight">
              Sign In
            </h2>
            {(formError || googleError) && (
              <div className="alert alert-error mb-4 py-2 px-3 text-center">
                {formError || googleError}
              </div>
            )}
            <div className="form-control mb-3 md:mb-4">
              <label className="label font-semibold">Email or Username</label>
              <input
                type="text"
                className="input input-bordered input-md w-full"
                name="emailOrUsername"
                value={loginData.emailOrUsername}
                onChange={handleChange}
                required
                placeholder="Enter your email or username"
              />
            </div>
            <div className="form-control mb-4 md:mb-6">
              <label className="label font-semibold">Password</label>
              <input
                type="password"
                className="input input-bordered input-md w-full"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
              />
            </div>
            <button
              className="btn btn-primary btn-lg w-full mb-2 shadow-md hover:scale-[1.02] transition-transform text-base md:text-lg"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Login"
              )}
            </button>
            <div className="divider">or sign in with</div>
            {googleError ? (
              <button
                className="btn btn-outline btn-error font-sans flex items-center justify-center gap-2 m-2 w-full text-base md:text-lg"
                disabled
              >
                <FcGoogle className="text-xl" />
                {googleError}
              </button>
            ) : (
              <button
                onClick={handleGoogleSignIn}
                className="btn btn-outline font-sans flex items-center justify-center gap-2 m-2 w-full text-base md:text-lg"
                disabled={!isInitialized || isLoading}
              >
                <FcGoogle className="text-xl" />
                {isLoading
                  ? "Loading..."
                  : isInitialized
                  ? "Continue with Google"
                  : "Google Auth Error"}
              </button>
            )}
            <div className="text-center mt-2">
              <span>Don't have an account? </span>
              <Link to="/register" className="link link-primary">
                Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
