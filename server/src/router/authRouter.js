import express from "express";
import { register, login, googleLogin, logout, deleteUser } from "../controller/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/googleLogin", googleLogin);
router.get("/logout", logout);
router.delete("/deleteUser/:id", deleteUser);

export default router;
