import dotenv from "dotenv";
dotenv.config();

// Updated CORS configuration for multiple ports
import express from "express";
import connectDB from "./src/config/db.js";
await connectDB();
import cloudinary from "./src/config/cloudinary.js";
import AuthRouter from "./src/router/authRouter.js";
import UserRouter from "./src/router/userRouter.js";
import AdminRouter from "./src/router/adminRouter.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import http from "http";
import { Server } from "socket.io";
import { webSocket } from "./src/webSocket.js";

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"], // Support both ports
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/auth", AuthRouter);
app.use("/user", UserRouter);
app.use("/admin", AdminRouter);

app.get("/", (req, res) => {
  res.json({ message: "Mewzii Chat App Connected" });
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message || "Internal Server Error",
  });
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:5174"], // Support both ports
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Initialize WebSocket handlers for live messaging
webSocket(io);

const PORT = process.env.PORT || 4500;

server.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  try {
    await cloudinary.api.resources({ max_results: 1 });
    console.log("Cloudinary is connected successfully");
  } catch (error) {
    console.error("Cloudinary connection failed:", error);
    process.exit(1);
  }
});

