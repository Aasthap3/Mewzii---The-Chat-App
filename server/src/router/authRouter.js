import express from "express";
import { register, login, googleLogin, logout, deleteUser } from "../controller/authController.js";
import { Protect } from "../middleware/authMiddleware.js";
import multer from "multer";

const uploads = multer();

const router = express.Router();

router.post("/register", uploads.single("image"), register);
router.post("/login", login);
router.post("/googleLogin", uploads.single("image"), googleLogin);
router.get("/logout", logout);
router.delete("/deleteUser/:id", Protect, deleteUser);

export default router;
