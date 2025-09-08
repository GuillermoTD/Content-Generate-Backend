import mongoose from "mongoose";
import { Request, Response } from "express";
import UserModel from "../models/userModel";
import bcrypt from "bcryptjs";
import jsonwebtoken from 'jsonwebtoken';

// Create a new user

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    if (typeof email !== "string" || typeof password !== "string") {
      throw new Error("Email and password must be strings");
    }

    const user = await UserModel.findOne({ email }).exec(); //check if the user exist in the database
    
    if(!user){ //if user doesn't exist, return an error
        res.status(404);
        throw new Error("User does not exist");
    }

    const encriptedPassword  = await bcrypt.hash(password,10) //password hashed with a salt 

    const matchPassword = await bcrypt.compare(encriptedPassword, user.hashedPassword); //compare the password with the hashed password

    if(!matchPassword){ //if the password doesn't match, return an error
        res.status(401);
        throw new Error("Invalid credentials");
    }

    //Generate token (JWT)
    // const token = jsonwebtoken;

    //send the response
    res.json({
      id:user?._id,
      status:"success",
      email:user?.email,
      username:user?.username,
      // token
    })

  } catch (error) {}
};
