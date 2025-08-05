import React, { useEffect, useState } from "react";
import axios from "../config/api";
import { useAuth } from "../contexts/AuthContext";
import { TbMessageHeart } from "react-icons/tb";

const dummySender = "64e8c0a5f01c6a1234567890";
const dummyReceiver = "64e8c0a5f01c6a0987654321";
const chats = [
  {
    senderId: "64e8c0a5f01c6a1234567890",
    receiverId: "64e8c0a5f01c6a0987654321",
    text: "Hey!",
    timestamp: "2025-07-28T12:01:00Z",
  },
  {
    senderId: "64e8c0a5f01c6a0987654321",
    receiverId: "64e8c0a5f01c6a1234567890",
    text: "Hi! What's up?",
    timestamp: "2025-07-28T12:02:00Z",
  },
  {
    senderId: "64e8c0a5f01c6a1234567890",
    receiverId: "64e8c0a5f01c6a0987654321",
    text: "Just working on a new project.",
    timestamp: "2025-07-28T12:03:00Z",
  },
  {
    senderId: "64e8c0a5f01c6a0987654321",
    receiverId: "64e8c0a5f01c6a1234567890",
    text: "Oh nice, what kind?",
    timestamp: "2025-07-28T12:04:00Z",
  },
  {
    senderId: "64e8c0a5f01c6a1234567890",
    receiverId: "64e8c0a5f01c6a0987654321",
    text: "A chat app with MERN stack.",
    timestamp: "2025-07-28T12:05:00Z",
  },
  {
    senderId: "64e8c0a5f01c6a0987654321",
    receiverId: "64e8c0a5f01c6a1234567890",
    text: "Sounds cool!",
    timestamp: "2025-07-28T12:06:00Z",
  },
  {
    senderId: "64e8c0a5f01c6a1234567890",
    receiverId: "64e8c0a5f01c6a0987654321",
    text: "Thanks 😄",
    timestamp: "2025-07-28T12:07:00Z",
  },
  {
    senderId: "64e8c0a5f01c6a0987654321",
    receiverId: "64e8c0a5f01c6a1234567890",
    text: "Need any help?",
    timestamp: "2025-07-28T12:08:00Z",
  },
  {
    senderId: "64e8c0a5f01c6a1234567890",
    receiverId: "64e8c0a5f01c6a0987654321",
    text: "Maybe with real-time features.",
    timestamp: "2025-07-28T12:09:00Z",
  },
  {
    senderId: "64e8c0a5f01c6a0987654321",
    receiverId: "64e8c0a5f01c6a1234567890",
    text: "Sure! I’ve done that with Socket.io.",
    timestamp: "2025-07-28T12:10:00Z",
  },
  {
    senderId: "64e8c0a5f01c6a1234567890",
    receiverId: "64e8c0a5f01c6a0987654321",
    text: "Perfect! I’ll ping you soon.",
    timestamp: "2025-07-28T12:11:00Z",
  },
  {
    senderId: "64e8c0a5f01c6a0987654321",
    receiverId: "64e8c0a5f01c6a1234567890",
    text: "Looking forward to it!",
    timestamp: "2025-07-28T12:12:00Z",
  },
  {
    senderId: "64e8c0a5f01c6a1234567890",
    receiverId: "64e8c0a5f01c6a0987654321",
    text: "Do you have any reusable components?",
    timestamp: "2025-07-28T12:13:00Z",
  },
  {
    senderId: "64e8c0a5f01c6a0987654321",
    receiverId: "64e8c0a5f01c6a1234567890",
    text: "Yes, will share the repo.",
    timestamp: "2025-07-28T12:14:00Z",
  },
  {
    senderId: "64e8c0a5f01c6a1234567890",
    receiverId: "64e8c0a5f01c6a0987654321",
    text: "Awesome, thanks!",
    timestamp: "2025-07-28T12:15:00Z",
  },
  {
    senderId: "64e8c0a5f01c6a0987654321",
    receiverId: "64e8c0a5f01c6a1234567890",
    text: "No problem at all.",
    timestamp: "2025-07-28T12:16:00Z",
  },
  {
    senderId: "64e8c0a5f01c6a1234567890",
    receiverId: "64e8c0a5f01c6a0987654321",
    text: "Let’s deploy it soon.",
    timestamp: "2025-07-28T12:17:00Z",
  },
  {
    senderId: "64e8c0a5f01c6a0987654321",
    receiverId: "64e8c0a5f01c6a1234567890",
    text: "Yeah, use Render or Vercel?",
    timestamp: "2025-07-28T12:18:00Z",
  },
  {
    senderId: "64e8c0a5f01c6a1234567890",
    receiverId: "64e8c0a5f01c6a0987654321",
    text: "Let’s try Vercel first.",
    timestamp: "2025-07-28T12:19:00Z",
  },
  {
    senderId: "64e8c0a5f01c6a0987654321",
    receiverId: "64e8c0a5f01c6a1234567890",
    text: "Alright. Let’s push code tonight.",
    timestamp: "2025-07-28T12:20:00Z",
  },
  {
    senderId: "64e8c0a5f01c6a1234567890",
    receiverId: "64e8c0a5f01c6a0987654321",
    text: "Sure, catch you later!",
    timestamp: "2025-07-28T12:21:00Z",
  },
  {
    senderId: "64e8c0a5f01c6a0987654321",
    receiverId: "64e8c0a5f01c6a1234567890",
    text: "Bye 👋",
    timestamp: "2025-07-28T12:22:00Z",
  },
  {
    senderId: "64e8c0a5f01c6a1234567890",
    receiverId: "64e8c0a5f01c6a0987654321",
    text: "👋",
    timestamp: "2025-07-28T12:23:00Z",
  },
];

const ChatPage = ({ selectedFriend }) => {
  const { user } = useAuth();
  const [currentFriend, setCurrentFriend] = useState("");
  const [messages, setMessages] = useState("");

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

  const handleSendMessage = async (message) => {
    console.log("Sending message:", messages);
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
          {chats.map((msg) => (
            <div
              key={msg.id}
              className={`chat ${
                msg.senderId === dummyReceiver ? "chat-end" : "chat-start"
              }`}
            >
              <div className="chat-header text-xs mb-1 flex items-center gap-2">
                {msg.senderId}{" "}
                <span className="opacity-60">{msg.timestamp}</span>
              </div>
              <div className="chat-bubble">{msg.text}</div>
            </div>
          ))}
        </section>
        {/* Message Input */}
        <form
          className="p-4 bg-base-100 border-t border-base-300 flex gap-2"
          onSubmit={handleSend}
        >
          <input
            type="text"
            className="input input-bordered flex-1"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
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
