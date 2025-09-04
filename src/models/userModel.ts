import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
  payments: [ // Array of payment references
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payments",
    },
  ],
  history: [  // Array of history references
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "History",
    },
  ],
  trialActive: { // Indicates if the trial is active
    type: Boolean,
    default: true,
  },
  trialExpires: {
    type: Date,
  },
  subscriptionType: { // User's subscription type
    type: String,
    enum: ["Trial", "Free", "Basic", "Premium"],
  },
  apiRequestCount: { // Number of API requests made by the user
    type: Number,
    default:0
  },
  monthlyRequestLimit: { // Monthly API request limit based on subscription type
    type: Number,
    default: 0, 
  },
  nextBillingDate:Date,// Next billing date for paid subscriptions
  
},{ timestamps: true });


const userModel = mongoose.model('UserModel', userSchema);

export default userModel;