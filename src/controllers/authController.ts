import { Request, Response } from "express";
import { Mongoose } from "mongoose";
import UserModel from "../models/userModel";
import bcrypt from "bcryptjs";
import moment from "moment";
import tokenGenerator from "../utils/tokenGenerator";
import generateTokenCookie from "../utils/generateTokenCookie";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validaciones
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: "Email and password are required",
      });
    }

    if (typeof email !== "string" || typeof password !== "string") {
      return res.status(400).json({
        success: false,
        error: "Email and password must be strings",
      });
    }

    // Buscar usuario
    const user = await UserModel.findOne({ email }).exec();
    if (!user) {
      console.log(user);
      return res.status(404).json({
        success: false,
        error: "This user does not exist", // ← No revelar si usuario existe
      });
    }

    // comparando la contraseña plana con la contraseña hasheada
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        error: "Invalid password", // ← Mismo mensaje por seguridad
      });
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
    return res.status(200).json({
      success: true,
      data: {
        id: user._id,
        email: user.email,
        username: user.userName,
        token,
      },
    });
  } catch (error: any) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
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

    if (res.statusCode !== 200) {
      res.json({
        message: err instanceof Error ? err.message : "Internal server error",
        status: res.statusCode,
      });
    }
  }
};
