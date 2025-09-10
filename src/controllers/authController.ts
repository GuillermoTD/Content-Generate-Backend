import { Request, Response } from "express";
import { Mongoose } from "mongoose";
import UserModel from "../models/userModel";
import bcrypt from "bcryptjs";
import jwt, { Jwt } from "jsonwebtoken";
import moment from "moment";
import tokenGenerator from "../utils/tokenGenerator";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validaciones
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: "Email and password are required"
      });
    }

    if (typeof email !== "string" || typeof password !== "string") {
      return res.status(400).json({
        success: false, 
        error: "Email and password must be strings"
      });
    }

    // Buscar usuario
    const user = await UserModel.findOne({ email }).exec();
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "Invalid credentials" // ← No revelar si usuario existe
      });
    }

    // ✅ CORRECTO: Comparar password PLANA con hash de la BD
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        error: "Invalid credentials" // ← Mismo mensaje por seguridad
      });
    }

    // Generar token
    const token = tokenGenerator(user._id.toString());

    // Responder
    return res.status(200).json({
      success: true,
      data: {
        id: user._id,
        email: user.email,
        username: user.userName,
        token,
      }
    });

  } catch (error: any) {
    console.error("Login error:", error);
    
    return res.status(500).json({
      success: false,
      error: "Internal server error"
    });
  }
};

export const signup = async (req: Request, res: Response) => {
  try {
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

    //send the response
    res.send({
      id: savedUser?._id,
      message: "User Create Successfully",
      data: {
        email: savedUser?.email,
        username: savedUser?.userName,
      },
      token,
    });
  } catch (err) {
    console.error("Signup error:", err);

    // Si ya se estableció un status code, usarlo
    const status = res.statusCode !== 200 ? res.statusCode : 500;
    res.json({ status });
  }
};
