import dotenv from "dotenv";
dotenv.config();

console.log("EMAIL:", process.env.EMAIL);
console.log("PASSWORD:", process.env.EMAIL_PASSWORD);

import { transporter } from "./Email/email.config.js";

async function test() {
  try {
    const info = await transporter.sendMail({
      from: `"Auth App" <${process.env.EMAIL}>`,
      to: process.env.EMAIL,
      subject: "Nodemailer Test",
      text: "Hello! Your Nodemailer setup is working.",
    });

    console.log("Email sent!");
    console.log(info.messageId);
  } catch (error) {
    console.error(error);
  }
}

test();