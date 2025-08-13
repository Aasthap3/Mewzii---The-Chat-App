import express from 'express';
import { getAllUsers, getAllUsersForFriendRequest, CurrentUser, recieveMessages, sendMessage, updateProfile, uploadProfilePicture, changePassword, RequestFriend, FriendRequests, AcceptFriendRequest, DeclineFriendRequest, BlockUser, UnfriendUser } from '../controller/userController.js';
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
router.get("/getAllUsersForFriendRequest", Protect, getAllUsersForFriendRequest);
router.get("/getCurrentUser/:id", Protect, CurrentUser);
router.get("/getMessages/:_id", Protect, recieveMessages);
router.post("/send", Protect, sendMessage);
router.put("/updateProfile", Protect, updateProfile);
router.post("/uploadProfilePicture", Protect, upload.single('profilePicture'), uploadProfilePicture);
router.put("/changePassword", Protect, changePassword);
router.post("/sendFriendRequest/:id", Protect, RequestFriend);
router.get("/getFriendRequests", Protect, FriendRequests);
router.post("/acceptFriendRequest/:id", Protect, AcceptFriendRequest);
router.post("/declineFriendRequest/:id", Protect, DeclineFriendRequest);
router.post("/blockUser/:id", Protect, BlockUser);
router.post("/unfriend/:id", Protect, UnfriendUser);

export default router;