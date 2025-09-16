import { Request, Response } from "express";
import { Mongoose } from "mongoose";
import UserModel from "../models/userModel";
import bcrypt from "bcryptjs";
import moment from "moment";
import tokenGenerator from "../utils/tokenGenerator";
import generateTokenCookie from "../utils/generateTokenCookie";
import asyncHandler from "express-async-handler";

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Validaciones
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  if (typeof email !== "string" || typeof password !== "string") {
    throw new Error("Email and password must be strings");
  }

  // Buscar usuario
  const user = await UserModel.findOne({ email }).exec();
  if (!user) {
    throw new Error("This user does not exist");
  }

  // comparando la contraseña plana con la contraseña hasheada
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  // Generar token
  const token = tokenGenerator(user._id.toString());

  //Generar y enviar la cookie
  // generateTokenCookie(res, token);
  console.log("vamos a generar cookie");

  res.cookie("token", token, {
    httpOnly: true, //don't allow js to read the cookie with javascript in the browser
    secure: false, //this cookie will never be sent with http(not secure)
    sameSite: "strict", //this cookie will only be sent for requests coming from the same site
    maxAge: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
  });

  // Responder al cliente
  res.status(200).json({
    success: true,
    data: {
      id: user._id,
      email: user.email,
      username: user.userName,
    },
  });
});

export const signup = asyncHandler(async (req: Request, res: Response) => {
  const { email, password, userName } = req.body;

  //Valide the email, password and the userName
  if (!email || !password || !userName) {
    throw new Error("Al fields are required");
    console.log(email, password, userName);
  }

  if (typeof email !== "string" || typeof password !== "string") {
    throw new Error("Email and password must be strings");
  }

  //Verifyng if the user already exist
  const userExist = await UserModel.findOne({ email });

  if (userExist) {
    //this status code indicate that the client is trying to send a resource that violate the current state of a resourse like duplicated resources
    res.status(409);
    throw new Error("This user already exist");
    return; 
  }

  //hashing password
  const salt = await bcrypt.genSalt(10);
  const encriptedPassword = await bcrypt.hash(password, salt); //password hashed with a salt

  //Crear nuevo usuario
  const newUser = new UserModel({
    email: email.toLocaleLowerCase(),
    userName: userName,
    password: encriptedPassword,
  });

  //Add the date the trial will end
  newUser.trialExpires = moment().add(newUser.trialPeriod, "days").toDate();

  //Saving user
  const savedUser = await newUser.save();

  //Generate token (JWT)
  const token = tokenGenerator(savedUser?._id.toString());

  //Send cookie
  res.cookie("token", token, {
    httpOnly: true, //don't allow js to read the cookie with javascript in the browser
    secure: false, //this cookie will never be sent with http(not secure)
    sameSite: "strict", //this cookie will only be sent for requests coming from the same site
    maxAge: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
  });

  //send the response
  res.send({
    id: savedUser?._id,
    message: "User Create Successfully",
    data: {
      email: savedUser?.email,
      username: savedUser?.userName,
    }
  });
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  res.cookie("token","",{maxAge:0});
  res.status(200).json({message:"User Logged out successfully"})
})