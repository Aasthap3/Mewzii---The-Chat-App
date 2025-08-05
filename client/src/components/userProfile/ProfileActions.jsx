import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../config/api";
import { toast } from "react-hot-toast";
import { useAuth } from "../../contexts/AuthContext";

const ProfileActions = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    toast.promise(
      axios.get("/auth/logout").then(() => {
        logout();
        navigate("/login");
      }),
      {
        loading: "Logging out...",
        success: <b>Logged out successfully!</b>,
        error: <b>Logout failed.</b>,
      }
    );
  };

  const handleDeleteAccount = (userId) => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      toast.promise(
        axios.delete(`/auth/deleteUser/${userId}`).then(() => {
          logout();
          navigate("/register");
        }),
        {
          loading: "Deleting account...",
          success: <b>Account deleted successfully!</b>,
          error: <b>Failed to delete account.</b>,
        }
      );
    }
  };

  return (
    <>
      <div className="bg-base-100 rounded-xl shadow p-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <Link to="/chat" className="btn btn-secondary w-full md:w-auto">
          Go to Chat
        </Link>
        <button
          className="btn btn-outline btn-error w-full md:w-auto"
          onClick={() => handleDeleteAccount(userId)}
        >
          Delete Account
        </button>
        <button
          className="btn btn-outline w-full md:w-auto"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default ProfileActions;
