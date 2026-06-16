import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";

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

    res.status(201).json({
      success: true,
      error: false,
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {

    console.log("Error : ",error)
    res.status(500).json({
      
      message:"Server error",
      error:true,
      success:false
    })
  }
};

export const login = async (req, res) => {
  res.send("login");
};
export const logout = async (req, res) => {
  res.send("logout");
};
