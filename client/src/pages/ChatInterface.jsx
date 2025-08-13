import React, { useEffect, useRef, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { RiChatNewLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "../config/api";
import { useAuth } from "../contexts/AuthContext";
import ChatPage from "../components/ChatPage";
import NewChatPage from "../components/NewChatPage";

const ChatInterface = () => {
  const { user, isLogin, logout } = useAuth();
  const navigate = useNavigate();
  const [chatUser, setChatUser] = useState("");
  const [selectedFriend, setSelectedFriend] = useState("");

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [allUserModalOpen, setAllUserModalOpen] = useState(false);

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
      logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleNewChat = () => {
    setAllUserModalOpen(true);
  }

  const handleFriendshipChange = () => {
    // Refresh the friends list
    fetchAllUsers();
    // Clear selected friend to go back to main view
    setSelectedFriend("");
  };

  return (
    <div 
      className="h-screen flex bg-base-200 relative"
      onClick={() => sidebarOpen && setSidebarOpen(false)}
    >
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[99]"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`z-[100] bg-base-100 border-r border-base-300 flex flex-col fixed top-0 left-0 h-full w-64 transition-transform duration-200 md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:flex md:translate-x-0 md:relative md:z-60`}
        style={{ minWidth: 0 }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-base-300 h-18">
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
                    ?.toUpperCase()}`;
                }}
              />
            </button>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40 mt-2 z-50"
            >
              <li key="profile">
                <button onClick={() => navigate("/userProfile")}>Profile</button>
              </li>
              <li key="logout">
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex items-center justify-between p-4 border-b border-base-300 h-16">
          <input
          className="input input-bordered w-45"
          placeholder="Search users..."
        />
        <button onClick={handleNewChat}>
          <RiChatNewLine  className="text-xl"/>
        </button>
        </div>
        <div className="pt-3 pl-4 font-semibold">
          Recent Chats
        </div>
        <ul className="flex-1 overflow-y-auto">
          {chatUser &&
            chatUser.map((friends, index) => (
              <li
                key={friends._id}
                className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-base-200 ${
                  selectedFriend._id === friends._id ? "bg-primary/10" : ""
                }`}
                onClick={() => {
                  setSelectedFriend(friends);
                  setSidebarOpen(false);
                }}
              >
                <img
                  src={friends.profilePicture}
                  alt={friends.name}
                  className="rounded-full w-8 h-8 object-cover"
                  onError={(e) => {
                    console.log(
                      "Image failed to load:",
                      friends.profilePicture
                    );
                    e.target.src = `https://placehold.co/600x400?text=${friends.fullname
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
      <div className={`${selectedFriend ? "relative" : ""} flex-1 flex flex-col`}>
        {/* Topbar with menu button for mobile */}
        <div className={`${selectedFriend ? "bg-base-100 z-50" : ""} md:bg-base-100 flex items-center h-20 md:w-[83vw] border-b border-base-300 px-4 relative`}>
          <button
            className={`${selectedFriend ? "z-50" : "top-20"} md:hidden btn btn-ghost btn-circle text-2xl mr-2 absolute`}
            onClick={() => setSidebarOpen(true)}
          >
            <FiMenu />
          </button>
          <span className={`font-bold text-lg hidden ${!selectedFriend ? "md:inline" : ""}`}>Mewzii Chat</span>
        </div>
        <ChatPage 
          selectedFriend={selectedFriend} 
          onFriendshipChange={handleFriendshipChange}
        />
      </div>
      
      {/* New Chat Modal */}
      <NewChatPage 
        isOpen={allUserModalOpen} 
        isClose={() => setAllUserModalOpen(false)}
        onFriendshipChange={handleFriendshipChange}
      />
    </div>
  );
};

export default ChatInterface;
