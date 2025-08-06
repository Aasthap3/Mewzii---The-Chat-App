import User from "../model/userModel.js";
import Message from "../model/messageModel.js";
import cloudinary from "../config/cloudinary.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = (await User.find({ _id: { $ne: req.user._id } })) || "";
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
    res
      .status(200)
      .json({
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

    res.status(200).json({ message: "Messages retrieved successfully", data: chats });
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
        _id: { $ne: userId } 
      });
      if (existingUser) {
        return res.status(400).json({
          message: "Username is already taken"
        });
      }
    }

    // Check if email is already taken by another user
    if (email) {
      const existingEmail = await User.findOne({ 
        email, 
        _id: { $ne: userId } 
      });
      if (existingEmail) {
        return res.status(400).json({
          message: "Email is already registered"
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
    ).select('-password');

    res.status(200).json({
      message: "Profile updated successfully",
      data: updatedUser
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
        message: "No image file provided"
      });
    }

    // Convert buffer to base64
    const base64String = req.file.buffer.toString('base64');
    const dataURI = `data:${req.file.mimetype};base64,${base64String}`;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: 'profile-pictures',
      transformation: [
        { width: 400, height: 400, crop: 'fill', gravity: 'face' },
        { quality: 'auto', fetch_format: 'auto' }
      ]
    });

    // Update user's profile picture in database
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePicture: result.secure_url },
      { new: true }
    ).select('-password');

    res.status(200).json({
      message: "Profile picture uploaded successfully",
      data: updatedUser
    });
  } catch (error) {
    console.error("Upload error:", error);
    next(error);
  }
};
