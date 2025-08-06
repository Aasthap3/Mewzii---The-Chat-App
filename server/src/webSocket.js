const OnlineUsers = {};

export const webSocket = (io) => {
  io.on("connection", (socket) => {
    socket.on("register", (userId) => {
      OnlineUsers[userId] = socket.id;
      console.log("Online Users:", OnlineUsers);
    });

    socket.on("unregister", (userId) => {
      delete OnlineUsers[userId];
      console.log("Online Users:", OnlineUsers);
    });

    socket.on("sendMessage", ({ from, to, content, timestamp }) => {
      const receiverSocketId = OnlineUsers[to];
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("receiveMessage", {
          from,
          to,
          content,
          timestamp,
        });
      }
    });
  });
};
