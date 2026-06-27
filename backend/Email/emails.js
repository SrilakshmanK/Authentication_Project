import { transporter } from "./email.config.js";


import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_EMAIL,
} from "./emailTemplates.js";


export const sendVerificationEmail = async (email, verificationToken) => {
  try {
    const response = await transporter.sendMail({
      from: `"Auth App" <${process.env.EMAIL}>`,
      to: email,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
    });

    console.log("Email sent successfully", response.messageId);
  } catch (error) {
    console.error("Error sending verification email", error);
  }
};

export const sendWelcomeEmail = async (email, name) => {
  try {
    const response = await transporter.sendMail({
      from: `"Auth App" <${process.env.EMAIL}>`,
      to: email,
      subject: "Welcome Email",
      html: WELCOME_EMAIL.replace("{name}", name),
    });

    console.log("Email sent successfully", response.messageId);
  } catch (error) {
    console.error("Error sending welcome email", error);
  }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
  try {
    const response = await transporter.sendMail({
      from: `"Auth App" <${process.env.EMAIL}>`,
      to: email,
      subject: "Reset Password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace(
        "{resetURL}",
        resetURL
      ),
    });

    console.log("Email sent successfully", response.messageId);
  } catch (error) {
    console.error("Error sending reset password email", error);
  }
};

export const sendResetSuccessEmail = async (email, name) => {
  try {
    const response = await transporter.sendMail({
      from: `"Auth App" <${process.env.EMAIL}>`,
      to: email,
      subject: "Password Reset Successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE.replace("{user}", name),
    });

    console.log("Email sent successfully", response.messageId);
  } catch (error) {
    console.error("Error sending password reset success email", error);
  }
};
