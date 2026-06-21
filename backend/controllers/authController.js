import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail, sendWelcomeEmail } from "../mailtrap/emails.js";
export const signUp = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    if (!email || !password || !name) {
      return res.status(400).json({
        message: "All field required.",
        error: true,
        success: false,
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: "User already exist.",
        error: true,
        success: false,
      });
    }

    const hashedPwd = await bcrypt.hash(password, 10);

    const verificationToken = Math.floor(
      10000 + Math.random() * 90000,
    ).toString();

    const user = new User({
      email,
      password: hashedPwd,
      name,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });

    await user.save();

    generateTokenAndSetCookie(res, user.id);
    await sendVerificationEmail(user.email, verificationToken);

    res.status(201).json({
      success: true,
      error: false,
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("Error : ", error);
    res.status(500).json({
      message: "Server error",
      error: true,
      success: false,
    });
  }
};

export const verifyEmail = async (req, res) => {
  const { code } = req.body;

  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or Expired Verification Code .",
      });
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    await sendWelcomeEmail(user.email, user.name);

    return res.status(200).json({
      message: "User verified successfully .",
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
      success: false,
      error: true,
    });
    console.error("Error verifing user", error);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No account found with this email",
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    }

    generateTokenAndSetCookie(res, user.id);
    user.lastLogin = new Date();
    await user.save();

    return res.status(200).json({
      success: true,
      error: false,
      message: "Logged in successfully",
      user,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
export const logout = async (req, res) => {
  res.clearCookie("token");
  res
    .status(200)
    .json({ message: "Logout successfully .", success: true, error: false });
};
