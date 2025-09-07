import mongoose from "mongoose";

const historySchema = new mongoose.Schema(
  {
    user: {
      // Reference to the user who made the payment
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ContentHistoryModel = mongoose.model("ContentHistory", historySchema);

export default ContentHistoryModel;
