import React, { useRef, useState } from "react";

const mockUsers = [
  { id: 1, name: "Alice", avatar: "https://i.pravatar.cc/40?img=1" },
  { id: 2, name: "Bob", avatar: "https://i.pravatar.cc/40?img=2" },
  { id: 3, name: "Charlie", avatar: "https://i.pravatar.cc/40?img=3" },
];

const initialMessages = [
  { id: 1, sender: "Alice", text: "Hello!", time: "10:00" },
  { id: 2, sender: "You", text: "Hi Alice!", time: "10:01" },
];

const ChatInterface = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [selectedUser, setSelectedUser] = useState(mockUsers[0]);
  const [search, setSearch] = useState("");
  const messagesEndRef = useRef(null);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([
      ...messages,
      { id: messages.length + 1, sender: "You", text: input, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
    ]);
    setInput("");
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSend(e);
    }
  };

  return (
    <div className="h-screen flex bg-base-200">
      {/* Sidebar */}
      <aside className="w-64 bg-base-100 border-r border-base-300 flex flex-col">
        <div className="p-4 font-bold text-lg border-b border-base-300">Conversations</div>
        <input
          className="input input-bordered m-3"
          placeholder="Search users..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <ul className="flex-1 overflow-y-auto">
          {mockUsers.filter(u => u.name.toLowerCase().includes(search.toLowerCase())).map(user => (
            <li
              key={user.id}
              className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-base-200 ${selectedUser.id === user.id ? "bg-primary/10" : ""}`}
              onClick={() => setSelectedUser(user)}
            >
              <img src={user.avatar} alt={user.name} className="rounded-full w-8 h-8" />
              <span>{user.name}</span>
            </li>
          ))}
        </ul>
      </aside>
      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="h-16 bg-base-100 border-b border-base-300 flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <img src={selectedUser.avatar} alt={selectedUser.name} className="rounded-full w-10 h-10" />
            <span className="font-semibold">{selectedUser.name}</span>
          </div>
          <button className="btn btn-sm btn-outline">Logout</button>
        </header>
        {/* Chat Window */}
        <section className="flex-1 overflow-y-auto p-6 flex flex-col gap-2">
          {messages.map(msg => (
            <div key={msg.id} className={`chat ${msg.sender === "You" ? "chat-end" : "chat-start"}`}>
              <div className="chat-header text-xs mb-1 flex items-center gap-2">
                {msg.sender} <span className="opacity-60">{msg.time}</span>
              </div>
              <div className="chat-bubble">{msg.text}</div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </section>
        {/* Message Input */}
        <form className="p-4 bg-base-100 border-t border-base-300 flex gap-2" onSubmit={handleSend}>
          <input
            type="text"
            className="input input-bordered flex-1"
            placeholder="Type a message..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleInputKeyDown}
          />
          <button className="btn btn-primary" type="submit">Send</button>
        </form>
      </main>
    </div>
  );
};

export default ChatInterface;
