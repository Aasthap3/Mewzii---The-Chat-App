import express from 'express';
import { getAllUsers, CurrentUser } from '../controller/userController.js';
import { Protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get("/getAllUsers", Protect, getAllUsers);
router.get("/getCurrentUser/:id", Protect, CurrentUser);

export default router;