import React, { useRef, useEffect, useState } from "react";
import axios from "../config/api";
import { useAuth } from "../contexts/AuthContext";
import { TbMessageHeart } from "react-icons/tb";
import { CiMenuKebab } from "react-icons/ci";
import apiSocket from "../config/socket";
import toast from "react-hot-toast";

const ChatPage = ({ selectedFriend, onFriendshipChange }) => {
  const { user } = useAuth();
  const [currentFriend, setCurrentFriend] = useState("");
  const [messages, setMessages] = useState("");
  const [chats, setChats] = useState("");
  const messageEndRef = useRef(null);

  const handleInputKeyDown = async (e) => {
    if (e.key === "Enter") {
      await handleSendMessage(e);
    }
  };

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  const fetchCurrentUser = async () => {
    try {
      const res = await axios.get(`/user/getCurrentUser/${selectedFriend._id}`); // Use selectedFriend._id
      setCurrentFriend(res.data.data);
    } catch (error) {
      console.error("Error fetching current user:", error);
    }
  };

  const fetchMessages = async () => {
    try {
      const res = await axios.get(`/user/getMessages/${selectedFriend._id}`); // Use selectedFriend._id
      // Sort messages by timestamp to ensure correct order
      const sortedChats = (res.data.data || []).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
      setChats(sortedChats);
    } catch (error) {
      setChats([]);
    }
  };

  useEffect(() => {
    if (selectedFriend) {
      fetchCurrentUser();
      fetchMessages();
    }
  }, [selectedFriend]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!messages.trim()) return;

    try {
      const messagePack = {
        senderId: user._id,
        receiverId: selectedFriend._id, // Use selectedFriend._id instead of selectedFriend
        content: messages,
        timestamp: new Date().toISOString(),
      };
      const res = await axios.post("/user/send", messagePack);
      apiSocket.emit("sendMessage", {
        from: user._id,
        to: selectedFriend._id,
        content: messages,
        timestamp: messagePack.timestamp,
      });
      // Add message and sort to maintain chronological order
      setChats((prev) => {
        const newChats = [...prev, { ...messagePack }];
        return newChats.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
      });
      setMessages("");
    } catch (error) {
      console.log("Error sending message:", error);
    }
  };

  const handleBlock = async () => {
    try {
      const res = await axios.post(`/user/blockUser/${selectedFriend._id}`);
      toast.success(res.data.message);
      console.log("Blocked user:", selectedFriend._id);
      // Trigger refresh of friends list and go back to main view
      if (onFriendshipChange) {
        onFriendshipChange();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to block user");
      console.error("Error blocking user:", error);
    }
  }

  const handleUnfriend = async () => {
    try {
      const res = await axios.post(`/user/unfriend/${selectedFriend._id}`);
      toast.success(res.data.message);
      console.log("Unfriended user:", selectedFriend._id);
      // Trigger refresh of friends list and go back to main view
      if (onFriendshipChange) {
        onFriendshipChange();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to unfriend user");
      console.error("Error unfriending user:", error);
    }
  }

  useEffect(() => {
    if (!user._id || !selectedFriend?._id) return;
    console.log("Selected friend:", selectedFriend);
    apiSocket.emit("register", user._id);

    const handleReceiveMessage = (msgPacket) => {
      if (msgPacket.from === selectedFriend._id) {
        setChats((prev) => {
          const newMessage = {
            ...msgPacket,
            senderId: msgPacket.from,
            receiverId: msgPacket.to,
            content: msgPacket.content,
            timestamp: msgPacket.timestamp,
          };
          const newChats = [...prev, newMessage];
          // Sort to maintain chronological order
          return newChats.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        });
      }
    };

    apiSocket.on("receiveMessage", handleReceiveMessage);

    return () => {
      apiSocket.off("receiveMessage", handleReceiveMessage);
      apiSocket.emit("unregister", user._id);
    };
  }, [selectedFriend, user._id]);

  const formatToISTDateTime = (utcTimestamp) => {
  const options = {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  const formatted = new Date(utcTimestamp).toLocaleString("en-GB", options);

  return formatted.replace(",", ""); // Remove comma between date and time
};

  if (!selectedFriend) {
    return (
      <>
        <div className="flex flex-col items-center justify-center h-screen text-base-content">
          <h2 className="text-2xl font-semibold mb-2">Welcome to Mewzii!</h2>
          <p className="mb-4">Select a friend to start chatting.</p>
          <TbMessageHeart className="text-8xl" />
        </div>
      </>
    );
  }
  return (
    <>
      <div className="flex-1 flex flex-col absolute h-screen top-0">
        <header className="ml-10 h-20 z-50 md:ml-0 top-0 border-b border-base-300 flex items-center justify-between px-6 flex-shrink-0">
          <div className="flex items-center gap-3">
            <img
              src={selectedFriend.profilePicture}
              alt={selectedFriend.fullname}
              className="rounded-full w-10 h-10 object-cover"
              onError={(e) => {
                console.log(
                  "Image failed to load:",
                  selectedFriend.profilePicture
                );
                e.target.src = `https://placehold.co/600x400?text=${selectedFriend.fullname
                  .charAt(0)
                  .toUpperCase()}`;
              }}
            />
            <div className="grid">
              <span className="font-semibold">{selectedFriend.fullname}</span>
              <span className="font-medium">@{selectedFriend.username}</span>
            </div>
          </div>
          <div className="dropdown dropdown-end">
              <button tabIndex={0} className="btn btn-ghost btn-circle hover:bg-primary/10" onClick={() => console.log("Menu clicked")}>
            <CiMenuKebab className="text-2xl" />
          </button>
          <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40 mt-2 z-50"
            >
              <li key="block">
                <button onClick={handleBlock}>Block</button>
              </li>
              <li key="Unfriend">
                <button onClick={handleUnfriend}>Unfriend</button>
              </li>
            </ul>
          </div>
        </header>
        {/* Chat Window */}
        <section className="flex-1 overflow-y-auto p-6 flex flex-col gap-2 min-h-0">
          {chats.length > 0 ? (
            chats.map((chat) => (
              <div
                className={`${
                  chat.senderId === user._id
                    ? "bg-secondary text-secondary-content self-end"
                    : "bg-primary text-primary-content self-start"
                } p-2 rounded-lg max-w-[70%]`}
                key={chat._id || `${chat.senderId}-${chat.timestamp}`}
              >
                {chat.content}
                <span className="text-xs text-gray-400 flex justify-end">
                  {formatToISTDateTime(chat.timestamp)}
                </span>
              </div>
            ))
          ) : (
            <div className="text-error p-3 rounded-lg h-full flex justify-center items-center">
              --No Messages Yet--
            </div>
          )}
          <div ref={messageEndRef}></div>
        </section>
        {/* Message Input */}
        <form
          className="p-4 bg-base-100 border-t border-base-300 flex gap-2 flex-shrink-0 sm:w-screen md:w-[83vw]"
          onSubmit={handleSendMessage}
        >
          <input
            type="text"
            className="input input-bordered flex-1"
            placeholder="Type a message..."
            name="messages"
            value={messages}
            onChange={(e) => setMessages(e.target.value)}
            onKeyDown={handleInputKeyDown}
          />
          <button className="btn btn-primary" type="submit">
            Send
          </button>
        </form>
      </div>
    </>
  );
};

export default ChatPage;
