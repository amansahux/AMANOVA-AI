import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import { sendMail } from "../services/mail.service.js";
import { generateToken } from "../utils/generateToken.js";
import { RegisterMail } from "../utils/registerEmail.js";
import redis from "../config/cache.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await userModel.findOne({
      $or: [{ email }, { username }],
    });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email or username",
        error: "User already exists",
      });
    }

    const user = await userModel.create({ username, email, password });

    const verifyToken = generateToken(user._id, user.email, "10m");
    const verificationLink = `${config.base_url}/api/auth/verify-email?token=${verifyToken}`;

    await sendMail({
      to: user.email,
      subject: "Verify Your Email - Amanova AI",
      html: RegisterMail({ verifyToken, verificationLink }), // Need to make this professional
    });

    res.status(201).json({
      success: true,
      message:
        "User registered successfully. Please check your email to verify your account.",
      error: null,
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const user = await userModel.findOne({ $or: [{ email }, { username }] });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
        error: "Invalid credentials",
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
        error: "Invalid credentials",
      });
    }

    if (!user.verified) {
      return res.status(400).json({
        success: false,
        message: "Please verify your email",
        error: "Please verify your email",
      });
    }

    const token = generateToken(user._id, user.email, "24h");

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "lax",
      secure: false,
    });

    res.status(200).json({
      success: true,
      message: "Login successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        verified: user.verified,
      },
      error: null,
    });
  } catch (error) {
    console.error(error);
    return next(error);
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
      return res.status(404).json({
        success: false,
        message: "User not found",
        error: "User not found",
      });
    }

    user.verified = true;
    await user.save();

    res.status(200).json({
      success: true,
      error: null,
      message: "Email verified successfully",
    }); // Need to make this professional
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        error: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      user: user,
      error: null,
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

export const logout = async (req, res) => {
  try {
    const token =
      req.cookies?.token ||
      (req.headers.authorization && req.headers.authorization.split(" ")[1]);

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "No token provided",
        error: "No token provided",
      });
    }

    await redis.set(token, Date.now().toString(), "EX", 24 * 60 * 60);
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });

    res
      .status(200)
      .json({ success: true, message: "Logout successful", error: null });
  } catch (error) {
    console.error("Logout error:", error);
    return next(error);
  }
};
