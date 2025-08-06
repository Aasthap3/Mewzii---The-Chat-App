import React from "react";
import { FiEdit2 } from "react-icons/fi";

const ProfileHeader = ({ user, onEdit }) => (
  <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 p-6 bg-base-100 rounded-xl shadow mb-8 relative">
    {/* Edit Button */}
    <button 
      onClick={onEdit}
      className="absolute top-4 right-4 btn btn-ghost btn-sm btn-circle hover:bg-primary/10"
      title="Edit Profile"
    >
      <FiEdit2 className="w-4 h-4" />
    </button>
    
    <img 
      src={user.avatar} 
      alt={user.fullname} 
      className="w-28 h-28 rounded-full border-4 border-primary shadow object-cover" 
      onError={(e) => {
        e.target.src = `https://placehold.co/600x400?text=${user.fullname?.charAt(0)?.toUpperCase() || "U"}`;
      }}
    />
    <div className="flex-1 text-center md:text-left">
      <h2 className="text-3xl font-bold mb-1">{user.fullname || "Unknown User"}</h2>
      <div className="text-base-content/70 mb-2">@{user.username || "unknown"}</div>
      <div className="text-base-content/70 mb-2">{user.email || "No email provided"}</div>
      <span className="badge badge-outline">Joined {user.joined || "Recently"}</span>
    </div>
  </div>
);

export default ProfileHeader;
