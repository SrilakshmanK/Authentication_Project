 // malb knse tcwt lpvt

import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true only for 465
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

console.log("SMTP Config:");
console.log({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
});


transporter.verify()
  .then(() => console.log("SMTP Ready"))
  .catch(err => console.error("SMTP Error:", err));
