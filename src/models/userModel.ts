import mongoose from "mongoose";

//Schema
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:false
    },
    trialActive:{ //As soon as a user got registered this user will have access to three days of trial
        type:Boolean,
        default:true
    },
    trialExpires:{
        type:Date,
    },
    subscription:{
        type:String,
        enum:['Trial','Free','Basic','Premium']
    },
    apiRequestCount:{
        type:Number,
        default:0
    },
    monthlyRequestCount:{
        type:Number,
        default:0
    },
    nextBillingDate:Date,
    payments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Payment'
        }
    ],
    history:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'History'
        }
    ],



})