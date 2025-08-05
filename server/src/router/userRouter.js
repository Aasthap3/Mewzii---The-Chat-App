import express from 'express';
import { getAllUsers, CurrentUser, recieveMessages, sendMessage } from '../controller/userController.js';
import { Protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get("/getAllUsers", Protect, getAllUsers);
router.get("/getCurrentUser/:id", Protect, CurrentUser);
router.get("/getMessages/:_id", Protect, recieveMessages);
router.post("/send", Protect, sendMessage);

export default router;