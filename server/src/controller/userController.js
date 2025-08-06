import User from "../model/userModel.js";
import Message from "../model/messageModel.js";

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
