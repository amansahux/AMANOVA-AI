import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import { sendMail } from "../services/mail.service.js";
import { generateToken } from "../utils/generateToken.js";
import { RegisterMail } from "../utils/regsiterEmail.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await userModel.findOne({
      $or: [{ email }, { username }],
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists with this email or username" });
    }

    const user = await userModel.create({ username, email, password });

    const verifyToken = generateToken(user._id, user.email, "10m");
    const verificationLink = `${config.base_url}/api/auth/verify-email?token=${verifyToken}`;

    await sendMail({
      to: user.email,
      subject: "Verify Your Email - Amanova AI",
      html: RegisterMail({ verifyToken, verificationLink }),
    });

    res.status(201).json({
      message:
        "User registered successfully. Please check your email to verify your account.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const user = await userModel.findOne({ $or: [{ email }, { username }] });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (!user.verified) {
      return res.status(400).json({ message: "Please verify your email" });
    }

    const token = generateToken(user._id, user.email, "24h");

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "lax",
      secure: false,
    });

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        verified: user.verified,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const verify = async (req, res) => {
  try {
    const { token } = req.query;
    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }

    const decoded = jwt.verify(token, config.jwt_secret);
    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.verified = true;
    await user.save();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
