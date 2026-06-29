import apiInstance from "./email.config.js";

import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_EMAIL,
} from "./emailTemplates.js";

const sendEmail = async ({ to, subject, htmlContent }) => {
  try {
    await apiInstance.transactionalEmails.sendTransacEmail({
      sender: {
        email: process.env.SENDER_EMAIL,
        name: process.env.SENDER_NAME,
      },

      to: [
        {
          email: to,
        },
      ],

      subject,

      htmlContent,
    });

    console.log("Email sent successfully");
    
  } catch (error) {
    console.error("Email Error:", error);
    throw error;
  }
};

export const sendVerificationEmail = async (
  email,
  verificationToken
) => {
  await sendEmail({
    to: email,
    subject: "Verify your Email",
    htmlContent: VERIFICATION_EMAIL_TEMPLATE.replace(
      "{verificationCode}",
      verificationToken
    ),
  });
};

export const sendWelcomeEmail = async (
  email,
  name
) => {
  await sendEmail({
    to: email,
    subject: "Welcome to Auth App",
    htmlContent: WELCOME_EMAIL.replace("{name}", name),
  });
};


export const sendPasswordResetEmail = async (
  email,
  resetURL
) => {
  await sendEmail({
    to: email,
    subject: "Reset Password",
    htmlContent: PASSWORD_RESET_REQUEST_TEMPLATE.replace(
      "{resetURL}",
      resetURL
    ),
  });
};
export const sendResetSuccessEmail = async (
  email,
  name
) => {
  await sendEmail({
    to: email,
    subject: "Password Reset Successful",
    htmlContent: PASSWORD_RESET_SUCCESS_TEMPLATE.replace(
      "{user}",
      name
    ),
  });
};