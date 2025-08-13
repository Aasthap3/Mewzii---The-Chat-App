import mongoose from "mongoose";

const friendSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    friendId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["requested", "accepted", "rejected", "blocked"],
    },
  },
  { timestamps: true }
);

const FriendList = mongoose.model("FriendList", friendSchema);

export default FriendList;
