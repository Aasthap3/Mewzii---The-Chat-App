import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: function () {
        return this.type !== "googleUser";
      },
    },
    profilePicture: {
      type: String,
      default: "",
    },
    googleId: {
      type: String,
    },
    type: {
      type: String,
      enum: ["googleUser", "normalUser"],
      default: "normalUser",
    },
    status: {
      type: String,
      enum: ["Active", "Inactive", "Suspended"],
      default: "Active",
    },
    role: {
      type: String,
      enum: ["User"],
      default: "User",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
