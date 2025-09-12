import { Response } from "express";

const generateTokenCookie = (res: Response, token: string) => {
  console.log("Generating token cookie with token:", token);
  res.cookie("token", token, {
    httpOnly: true, //don't allow js to read the cookie with javascript in the browser
    secure: false, //this cookie will never be sent with http(not secure)
    sameSite: process.env.NODE_ENV === "development" ? "none" : "lax", //this cookie will only be sent for requests coming from the same site
    maxAge: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
  });
};

export default generateTokenCookie;
