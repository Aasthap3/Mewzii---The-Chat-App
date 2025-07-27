
import React, { useState } from "react";
import ProfileHeader from "../components/userProfile/ProfileHeader";
import ProfileBio from "../components/userProfile/ProfileBio";
import ProfileSettings from "../components/userProfile/ProfileSettings";
import ProfileActions from "../components/userProfile/ProfileActions";

// Dummy user data for demonstration
const dummyUser = {
  username: "demouser",
  fullname: "Demo User",
  email: "demo@demo.com",
  avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  bio: "Hey! I'm a chat enthusiast and love meeting new people.",
  joined: "2024-01-15",
  theme: "light",
};

const UserProfilePage = () => {
  const [user, setUser] = useState(dummyUser);
  const [editingBio, setEditingBio] = useState(false);
  const [bioInput, setBioInput] = useState(user.bio);

  const handleEditBio = () => setEditingBio(true);
  const handleSaveBio = () => {
    setUser({ ...user, bio: bioInput });
    setEditingBio(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-300 py-8 px-2 flex flex-col items-center">
      <div className="w-full max-w-2xl">
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
