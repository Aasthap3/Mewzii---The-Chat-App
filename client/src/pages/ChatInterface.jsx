import React, { useEffect, useRef, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "../config/api";
import { useAuth } from "../contexts/AuthContext";
import ChatPage from "../components/ChatPage";

const ChatInterface = () => {
  const { user, isLogin, logout } = useAuth();
  const navigate = useNavigate();
  const [chatUser, setChatUser] = useState("");
  const [selectedFriend, setSelectedFriend] = useState("");

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const fetchAllUsers = async () => {
    try {
      const res = await axios.get("/user/getAllUsers");
      setChatUser(res.data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    } else {
      fetchAllUsers();
    }
  }, [isLogin, navigate]);

  const handleLogout = async () => {
    try {
      await toast.promise(
        axios.get("/auth/logout"),
        {
          loading: "Logging out...",
          success: <b>Logged out successfully!</b>,
          error: <b>Logout failed.</b>,
        }
      );
      
      // Use the logout function from AuthContext
      logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      // Even if backend logout fails, clear frontend state
      logout();
      navigate("/login");
    }
  };

  return (
    <div className="h-screen flex bg-base-200 relative">
      {/* Overlay for mobile drawer, covers everything including header */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[99] md:hidden cursor-pointer"
          onClick={() => setSidebarOpen(false)}
          tabIndex={-1}
        />
      )}
      {/* Sidebar: overlays header on mobile, static on md+ */}
      <aside
        className={`z-[100] bg-base-100 border-r border-base-300 flex flex-col fixed md:static top-0 left-0 h-full w-64 transition-transform duration-200 md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:flex md:translate-x-0 md:relative`}
        style={{ minWidth: 0 }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-base-300">
          <span className="font-bold text-lg">Conversations</span>
          <div className="dropdown dropdown-end">
            <button tabIndex={0} className="btn btn-ghost btn-circle text-xl">
              <img
                src={user.profilePicture}
                alt="profile"
                className="w-full h-full rounded-full object-cover"
                onError={(e) => {
                  console.log("Image failed to load:", user.profilePicture);
                  e.target.src = `https://placehold.co/600x400?text=${user.fullname
                    ?.charAt(0)
                    ?.toUpperCase()}`; // Fallback image
                }}
              />
            </button>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40 mt-2 z-50"
            >
              <li>
                <button onClick={() => navigate("/userProfile")}>Profile</button>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
        <input
          className="input input-bordered m-3 w-55"
          placeholder="Search users..."
        />
        <ul className="flex-1 overflow-y-auto">
          {chatUser &&
            chatUser.map((friends, index) => (
              <li
                key={friends.id}
                className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-base-200 ${
                  selectedFriend.id === friends.id ? "bg-primary/10" : ""
                }`}
                onClick={() => {
                  setSelectedFriend(friends);
                  setSidebarOpen(false);
                }}
              >
                <img
                  src={friends.profilePicture}
                  alt={friends.name}
                  className="rounded-full w-8 h-8"
                  onError={(e) => {
                    console.log(
                      "Image failed to load:",
                      friends.profilePicture
                    );
                    e.target.src = `https://placehold.co/600x400/text=${friends.fullname
                      .charAt(0)
                      .toUpperCase()}`; // Fallback image
                  }}
                  onLoad={() =>
                    console.log(
                      "Image loaded successfully:",
                      friends.profilePicture
                    )
                  }
                />
                <span>{friends.fullname}</span>
              </li>
            ))}
        </ul>
      </aside>
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col z-50">
        {/* Topbar with menu button for mobile */}
        <div className="md:hidden flex items-center h-16 bg-base-100 border-b border-base-300 px-4">
          <button
            className="btn btn-ghost btn-circle text-2xl mr-2"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <FiMenu />
          </button>
          <span className="font-bold text-lg">Mewzii Chat</span>
        </div>
        <ChatPage selectedFriend={selectedFriend} />
      </div>
    </div>
  );
};

export default ChatInterface;
