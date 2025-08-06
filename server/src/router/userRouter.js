import express from 'express';
import { getAllUsers, CurrentUser, recieveMessages, sendMessage, updateProfile, uploadProfilePicture } from '../controller/userController.js';
import { Protect } from '../middleware/authMiddleware.js';
import multer from 'multer';

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

const router = express.Router();

router.get("/getAllUsers", Protect, getAllUsers);
router.get("/getCurrentUser/:id", Protect, CurrentUser);
router.get("/getMessages/:_id", Protect, recieveMessages);
router.post("/send", Protect, sendMessage);
router.put("/updateProfile", Protect, updateProfile);
router.post("/uploadProfilePicture", Protect, upload.single('profilePicture'), uploadProfilePicture);

export default router;