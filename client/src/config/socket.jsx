import { io } from "socket.io-client";

const apiSocket = io("http://localhost:4500", {withCredentials: true});

export default apiSocket;