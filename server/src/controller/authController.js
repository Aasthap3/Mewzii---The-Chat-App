import User from "../model/userModel.js";
import bcrypt from "bcrypt";
import { genAuthToken } from "../utils/auth.js";
import cloudinary from "../config/cloudinary.js";

// Helper function to upload file to cloudinary
const uploadToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "chat-app-profiles",
      transformation: [
        { width: 400, height: 400, crop: "fill", gravity: "face" }
      ]
    });
    return result.secure_url;
  } catch (error) {
    throw new Error(`Cloudinary upload failed: ${error.message}`);
  }
};

export const register = async (req, res, next) => {
  try {
    const { username, fullname, email, password } = req.body;

    if (!username || !fullname || !email || !password) {
      const error = new Error("All fields are required");
      error.statusCode = 400;
      return next(error);
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error("User already exists with this email");
      error.statusCode = 400;
      return next(error);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a placeholder profile picture URL (no need to upload to Cloudinary)
    const profilePictureUrl = `https://placehold.co/600x400?text=${fullname
      .charAt(0)
      .toUpperCase()}`;

    // Create user
    const newUser = await User.create({
      username,
      fullname,
      email,
      password: hashedPassword,
      profilePicture: profilePictureUrl,
      role: "User",
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { emailOrUsername, password } = req.body;

    console.log("Login attempt with data:", req.body);
    if (!emailOrUsername || !password) {
      const error = new Error("Email/Username and password are required");
      error.statusCode = 400;
      return next(error);
    }

    // Find user by email or username
    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      return next(error);
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const error = new Error("Invalid credentials");
      error.statusCode = 401;
      return next(error);
    }

    await genAuthToken(user._id, res);

    res.status(200).json({
      message: "Login successful",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const googleLogin = async (req, res, next) => {
  try {
    console.log('googleLogin req.body:', req.body);
    const { name, email, id, imageUrl } = req.body;

    if (!name || !email || !id) {
      const error = new Error('Missing required Google user fields');
      error.statusCode = 400;
      return next(error);
    }

    const existingUser = await User.findOne({ email });
    console.log('googleLogin existingUser:', existingUser);

    if (!existingUser) {
      // Create new user if not exists
      const googleProfileLink = imageUrl ? (imageUrl.split("=s96")[0] + "=s400-c") : null;
      const placeholderLink = `https://placehold.co/600x400?text=${name.charAt(0).toUpperCase()}`;
      const photo = googleProfileLink || placeholderLink;

      const hashedGoogleId = await bcrypt.hash(id, 10);
      const userName = email.split("@")[0];

      const newUser = await User.create({
        username: userName,
        fullname: name,
        email,
        profilePicture: photo,
        googleId: hashedGoogleId,
        role: "User",
        type: "googleUser",
        status: "Active",
      });

      await genAuthToken(newUser._id, res);

      res.status(201).json({
        message: "User created successfully",
        data: newUser,
      });
    } else if (existingUser.type === "normalUser") {
      const hashedGoogleId = await bcrypt.hash(id, 10);
      const upgradedUser = await User.findByIdAndUpdate(
        existingUser._id,
        {
          googleId: hashedGoogleId,
          type: "googleUser",
        },
        { new: true }
      );

      await genAuthToken(upgradedUser._id, res);

      res.status(200).json({
        message: "User logged in successfully",
        data: upgradedUser,
      });
    } else {
      const isMatch = await bcrypt.compare(id, existingUser.googleId);
      if (!isMatch) {
        const error = new Error("Google ID does not match");
        error.statusCode = 401;
        return next(error);
      }
      await genAuthToken(existingUser._id, res);
      res.status(200).json({
        message: "Login successful",
        data: existingUser,
      });
    }
  } catch (error) {
    console.error('googleLogin error:', error);
    next(error);
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("secret", "", {
      expires: new Date(Date.now()),
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      const error = new Error("User ID is required");
      error.statusCode = 400;
      return next(error);
    }

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};
