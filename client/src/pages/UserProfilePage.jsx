
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProfileHeader from "../components/userProfile/ProfileHeader";
import ProfileEditModal from "../components/userProfile/ProfileEditModal";
import ProfileSettings from "../components/userProfile/ProfileSettings";
import ProfileActions from "../components/userProfile/ProfileActions";
import { useAuth } from "../contexts/AuthContext";

const UserProfilePage = () => {
  const { user: authUser, isLogin, updateUser } = useAuth();
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(authUser);

  // Update currentUser when authUser changes
  useEffect(() => {
    setCurrentUser(authUser);
  }, [authUser]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
  }, [isLogin, navigate]);

  // Show loading or redirect if no user data
  if (!currentUser && isLogin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-300 py-8 px-2 flex items-center justify-center">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  // Format the user data to match the expected structure
  const user = {
    username: currentUser?.username || "",
    fullname: currentUser?.fullname || "",
    email: currentUser?.email || "",
    avatar: currentUser?.profilePicture || `https://placehold.co/600x400?text=${currentUser?.fullname?.charAt(0)?.toUpperCase() || "U"}`,
    joined: currentUser?.createdAt ? new Date(currentUser.createdAt).toLocaleDateString() : "Recently",
    theme: "light", // You can add theme preference to user model later
    profilePicture: currentUser?.profilePicture || "",
  };

  const handleEditProfile = () => {
    setIsEditModalOpen(true);
  };

  const handleUserUpdate = (updatedUserData) => {
    // Update local state
    setCurrentUser(updatedUserData);
    // Update context if updateUser function exists
    if (updateUser) {
      updateUser(updatedUserData);
    }
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
        
        <ProfileHeader user={user} onEdit={handleEditProfile} />
        <ProfileSettings user={user} />
        <ProfileActions />
        
        {/* Edit Profile Modal */}
        <ProfileEditModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          user={user}
          onUserUpdate={handleUserUpdate}
        />
      </div>
    </div>
  );
};

export default UserProfilePage;
