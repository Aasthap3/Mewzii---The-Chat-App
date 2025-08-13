import User from "../model/userModel.js";
import Message from "../model/messageModel.js";
import FriendList from "../model/friendModel.js";
import cloudinary from "../config/cloudinary.js";
import bcrypt from "bcrypt";

export const getAllUsers = async (req, res, next) => {
  try {
    const userId = req.user._id;
    
    // Find all accepted friendships where current user is either userId or friendId
    const acceptedFriendships = await FriendList.find({
      $or: [
        { userId: userId, status: "accepted" },
        { friendId: userId, status: "accepted" }
      ]
    });

    // Extract friend IDs from the friendships
    const friendIds = acceptedFriendships.map(friendship => {
      return friendship.userId.toString() === userId.toString() 
        ? friendship.friendId 
        : friendship.userId;
    });

    // Get user details for all accepted friends
    const friends = await User.find({ 
      _id: { $in: friendIds } 
    }).select('-password');

    res.status(200).json({
      data: friends,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllUsersForFriendRequest = async (req, res, next) => {
  try {
    const userId = req.user._id;
    
    // Get all existing friendships (any status) to exclude them
    const existingFriendships = await FriendList.find({
      $or: [
        { userId: userId },
        { friendId: userId }
      ]
    });

    // Extract all user IDs that have any friendship relation
    const excludeIds = existingFriendships.map(friendship => {
      return friendship.userId.toString() === userId.toString() 
        ? friendship.friendId 
        : friendship.userId;
    });

    // Add current user to exclude list
    excludeIds.push(userId);

    // Get users that have no friendship relation with current user
    const users = await User.find({ 
      _id: { $nin: excludeIds } 
    }).select('-password');

    res.status(200).json({
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

export const CurrentUser = async (req, res, next) => {
  try {
    const recieverId = req.params.id;
    const sender = req.user;
    const reciever = await User.findById(recieverId);
    res.status(200).json({ data: reciever });
  } catch (error) {
    next(error);
  }
};

export const sendMessage = async (req, res, next) => {
  try {
    const { senderId, receiverId, content, timestamp } = req.body;
    const newMessage = await Message.create({
      senderId,
      receiverId,
      content,
      timestamp,
    });
    res.status(200).json({
      message: "Message sent successfully",
      content: newMessage.content,
    });
  } catch (error) {
    next(error);
  }
};

export const recieveMessages = async (req, res, next) => {
  try {
    const reciever = req.params._id;
    const sender = req.user._id;
    const chats = await Message.find({
      $or: [
        { senderId: sender, receiverId: reciever },
        { senderId: reciever, receiverId: sender },
      ],
    }).sort({ timestamp: 1 });

    res
      .status(200)
      .json({ message: "Messages retrieved successfully", data: chats });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { fullname, username, email, profilePicture } = req.body;

    // Check if username is already taken by another user
    if (username) {
      const existingUser = await User.findOne({
        username,
        _id: { $ne: userId },
      });
      if (existingUser) {
        return res.status(400).json({
          message: "Username is already taken",
        });
      }
    }

    // Check if email is already taken by another user
    if (email) {
      const existingEmail = await User.findOne({
        email,
        _id: { $ne: userId },
      });
      if (existingEmail) {
        return res.status(400).json({
          message: "Email is already registered",
        });
      }
    }

    // Update user profile
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        ...(fullname && { fullname }),
        ...(username && { username }),
        ...(email && { email }),
        ...(profilePicture && { profilePicture }),
      },
      { new: true, runValidators: true }
    ).select("-password");

    res.status(200).json({
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

export const uploadProfilePicture = async (req, res, next) => {
  try {
    const userId = req.user._id;

    if (!req.file) {
      return res.status(400).json({
        message: "No image file provided",
      });
    }

    // Convert buffer to base64
    const base64String = req.file.buffer.toString("base64");
    const dataURI = `data:${req.file.mimetype};base64,${base64String}`;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: "profile-pictures",
      transformation: [
        { width: 400, height: 400, crop: "fill", gravity: "face" },
        { quality: "auto", fetch_format: "auto" },
      ],
    });

    // Update user's profile picture in database
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePicture: result.secure_url },
      { new: true }
    ).select("-password");

    res.status(200).json({
      message: "Profile picture uploaded successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Upload error:", error);
    next(error);
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { currentPassword, newPassword } = req.body;

    // Validation
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message: "Current password and new password are required",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        message: "New password must be at least 6 characters long",
      });
    }

    // Get user with password (since we exclude it by default)
    const user = await User.findById(userId).select("+password");
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isCurrentPasswordValid) {
      return res.status(400).json({
        message: "Current password is incorrect",
      });
    }

    // Check if new password is different from current password
    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
      return res.status(400).json({
        message: "New password must be different from current password",
      });
    }

    // Hash new password
    const saltRounds = 10;
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update password in database
    await User.findByIdAndUpdate(
      userId,
      { password: hashedNewPassword },
      { new: true }
    );

    res.status(200).json({
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Change password error:", error);
    next(error);
  }
};

export const RequestFriend = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const friendId = req.params.id;

    await FriendList.create({
      userId,
      friendId,
      status: "requested",
    });

    res.status(200).json({
      message: "Friend request sent!",
    });
  } catch (error) {
    next(error);
  }
};

export const FriendRequests = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const requests = await FriendList.find({
      friendId: userId,
      status: "requested",
    }).populate("userId");

    res.status(200).json({
      message: "Friend requests retrieved successfully",
      data: requests,
    });
  } catch (error) {
    next(error);
  }
};

export const AcceptFriendRequest = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const requestId = req.params.id;

    await FriendList.findByIdAndUpdate(requestId, {
      status: "accepted",
    });

    res.status(200).json({
      message: "Friend request accepted!",
    });
  } catch (error) {
    next(error);
  }
};

export const DeclineFriendRequest = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const requestId = req.params.id;

    await FriendList.findByIdAndUpdate(requestId, {
      status: "rejected",
    });

    res.status(200).json({
      message: "Friend request declined!",
    });
  } catch (error) {
    next(error);
  }
};

export const BlockUser = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const targetUserId = req.params.id;

    // Update existing friend request to blocked or create new blocked entry
    await FriendList.findOneAndUpdate(
      {
        $or: [
          { userId: userId, friendId: targetUserId },
          { userId: targetUserId, friendId: userId }
        ]
      },
      { status: "blocked" },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.status(200).json({
      message: "User blocked successfully!",
    });
  } catch (error) {
    next(error);
  }
};

export const UnfriendUser = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const friendId = req.params.id;

    // Find and delete the friendship record
    const deletedFriendship = await FriendList.findOneAndDelete({
      $or: [
        { userId: userId, friendId: friendId, status: "accepted" },
        { userId: friendId, friendId: userId, status: "accepted" }
      ]
    });

    if (!deletedFriendship) {
      return res.status(404).json({
        message: "Friendship not found or already removed",
      });
    }

    res.status(200).json({
      message: "User unfriended successfully!",
    });
  } catch (error) {
    next(error);
  }
};