import User from "../model/userModel.js";

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
