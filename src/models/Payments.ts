import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    user: {
      // Reference to the user who made the payment
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
    },
    reference: {
      // Unique payment reference
      type: String,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
      required: true,
    },
    susbcriptionPlan: {
      // Subscription plan chosen by the user
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      default: 0,
    },
    monthlyRequestCount: {
      // Monthly API request limit based on subscription type
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const paymentModel = mongoose.model("Payments", paymentSchema);

export default paymentModel;