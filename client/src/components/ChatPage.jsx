import React, { use, useEffect, useState } from "react";
import axios from "../config/api";
import { useAuth } from "../contexts/AuthContext";
import { TbMessageHeart } from "react-icons/tb";

const ChatPage = ({ selectedFriend }) => {
  const { user } = useAuth();
  const [currentFriend, setCurrentFriend] = useState("");
  const [messages, setMessages] = useState("");
  const [chats, setChats] = useState("--No Messages Yet--");

  const fetchCurrentUser = async () => {
    try {
      const res = await axios.get(`/user/getCurrentUser/${selectedFriend}`);
      setCurrentFriend(res.data.data);
    } catch (error) {
      console.error("Error fetching current user:", error);
    }
  };

  const fetchMessages = async () => {
    try {
    } catch (error) {}
  };

  useEffect(() => {
    if (selectedFriend) {
      fetchCurrentUser();
      fetchMessages();
    }
  }, [selectedFriend]);

  const handleSendMessage = async (e) => {
    try {
      const messagePack = {
        senderId: user._id,
        receiverId: selectedFriend,
        message: messages,
      };
      console.log(messages);
      const res = await axios.post("/user/send", messagePack);
      setMessages("");
      receiveMessages();
    } catch (error) {
      console.log("Error sending message:", error);
    }
  };

  const receiveMessages = async () => {
    try {
      const res = await axios.get(`/user/getMessages/${selectedFriend}`);
      setChats(res.data.data);
    } catch (error) {
      setChats("--No Messages Yet--");
    }
  };

  useEffect(() => {
    if (selectedFriend) {
      const interval = setInterval(() => {
        receiveMessages();
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [selectedFriend]);

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend(e);
    }
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
      <div className="flex-1 flex flex-col z-60">
        <header className="h-16 bg-base-100 border-b border-base-300 flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <img
              src={selectedFriend.avatar}
              alt={selectedFriend.name}
              className="rounded-full w-10 h-10"
            />
            <span className="font-semibold">{selectedFriend.name}</span>
          </div>
          <button className="btn btn-sm btn-outline">Logout</button>
        </header>
        {/* Chat Window */}
        <section className="flex-1 overflow-y-auto p-6 flex flex-col gap-2">
          {chats !== "--No Messages Yet--" ? (
            chats.map((chat, index) => (
              <div
                className={`${
                  chat.senderId === user._id
                    ? "bg-secondary text-secondary-content self-end"
                    : "bg-primary text-primary-content self-start"
                } p-3 rounded-lg max-w-[70%]`}
                key={index}
              >
                {chat.text}
              </div>
            ))
          ) : (
            <div className="text-error p-3 rounded-lg h-full flex justify-center items-center">
              {chats}
            </div>
          )}
        </section>
        {/* Message Input */}
        <form
          className="p-4 bg-base-100 border-t border-base-300 flex gap-2"
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
