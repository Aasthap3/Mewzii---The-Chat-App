import React from "react";

const ProfileBio = ({ user, onEdit }) => (
  <div className="bg-base-100 rounded-xl shadow p-6 mb-8">
    <div className="flex justify-between items-center mb-2">
      <h3 className="text-xl font-semibold">Bio</h3>
      <button className="btn btn-xs btn-outline" onClick={onEdit}>Edit</button>
    </div>
    <p className="text-base-content/80">{user.bio}</p>
  </div>
);

export default ProfileBio;
