import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import { sendMail } from "../services/mail.service.js";
import { generateToken } from "../utils/generateToken.js";
import { RegisterMail } from "../utils/registerEmail.js";
import redis from "../config/cache.js";
import ApiError from "../utils/ApiError.js";

export const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await userModel.findOne({
      $or: [{ email }, { username }],
    });
    if (existingUser) {
      return next(
        new ApiError("User already exists with this email or username", 400),
      );
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

export const login = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;

    const user = await userModel.findOne({ $or: [{ email }, { username }] });
    if (!user) {
      return next(new ApiError("Invalid credentials", 400));
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return next(new ApiError("Invalid credentials", 400));
    }

    if (!user.verified) {
      return next(new ApiError("Please verify your email", 400));
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

export const verify = async (req, res, next) => {
  try {
    const { token } = req.query;
    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }

    const decoded = jwt.verify(token, config.jwt_secret);
    const user = await userModel.findById(decoded.id);

    if (!user) {
      return next(new ApiError("Invalid or expired verification link", 404));
    }

    user.verified = true;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      error: null,
    }); // Need to make this professional
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user.id).select("-password");
    if (!user) {
      return next(new ApiError("Invalid credentials", 404));
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

export const logout = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token ||
      (req.headers.authorization && req.headers.authorization.split(" ")[1]);

    if (!token) {
      return next(new ApiError("No token provided", 400));
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

export const googleCallback = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.redirect(
        config.node_env === "development"
          ? "http://localhost:5173/login"
          : "https://snitch-kd3p.onrender.com/login",
      );
    }

    const { id, displayName, emails } = req.user;
    const email = emails[0].value;
    let user = await userModel.findOne({ email });

    if (!user) {
      // Sign up the user
      user = await userModel.create({
        username: displayName,
        email: email,
        googleId: id,
        verified: true,
      });
    }

    const token = generateToken(user._id, user.email, "24h");

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "lax",
      secure: false,
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};
