import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: {
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
  trialPeriod: {
    type: Number,
    default:3 //3 days
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
  hashedPassword: { // Hashed password for security
    type: String,
  },
  monthlyRequestsCount:{
    type:Number,
    default:100 //100 credit //3 days
  },
  
},{ timestamps: true });


const UserModel = mongoose.model('users', userSchema);

export default UserModel;