
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProfileHeader from "../components/userProfile/ProfileHeader";
import ProfileBio from "../components/userProfile/ProfileBio";
import ProfileSettings from "../components/userProfile/ProfileSettings";
import ProfileActions from "../components/userProfile/ProfileActions";
import { useAuth } from "../contexts/AuthContext";

const UserProfilePage = () => {
  const { user: authUser, isLogin } = useAuth();
  const navigate = useNavigate();
  const [editingBio, setEditingBio] = useState(false);
  const [bioInput, setBioInput] = useState(authUser?.bio || "");

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
  }, [isLogin, navigate]);

  // Show loading or redirect if no user data
  if (!authUser && isLogin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-300 py-8 px-2 flex items-center justify-center">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  // Format the user data to match the expected structure
  const user = {
    username: authUser?.username || "",
    fullname: authUser?.fullname || "",
    email: authUser?.email || "",
    avatar: authUser?.profilePicture || `https://placehold.co/600x400?text=${authUser?.fullname?.charAt(0)?.toUpperCase() || "U"}`,
    bio: authUser?.bio || "Hey! I'm new to this chat app.",
    joined: authUser?.createdAt ? new Date(authUser.createdAt).toLocaleDateString() : "Recently",
    theme: "light", // You can add theme preference to user model later
  };

  const handleEditBio = () => setEditingBio(true);
  const handleSaveBio = () => {
    // Here you would typically make an API call to update the bio
    // For now, we'll just update the local state
    setEditingBio(false);
    // TODO: Add API call to update user bio
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-300 py-8 px-2 flex flex-col items-center">
      <div className="w-full max-w-2xl">
        {/* Back Navigation */}
        <div className="mb-6">
          <button 
            onClick={() => navigate("/chat")} 
            className="btn btn-ghost btn-sm gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Chat
          </button>
        </div>
        
        <ProfileHeader user={user} />
        {editingBio ? (
          <div className="bg-base-100 rounded-xl shadow p-6 mb-8">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-semibold">Edit Bio</h3>
              <button className="btn btn-xs btn-outline" onClick={() => setEditingBio(false)}>Cancel</button>
            </div>
            <textarea
              className="textarea textarea-bordered w-full mb-4"
              rows={3}
              value={bioInput}
              onChange={e => setBioInput(e.target.value)}
            />
            <button className="btn btn-primary btn-sm" onClick={handleSaveBio}>Save</button>
          </div>
        ) : (
          <ProfileBio user={user} onEdit={handleEditBio} />
        )}
        <ProfileSettings user={user} />
        <ProfileActions />
      </div>
    </div>
  );
};

export default UserProfilePage;
