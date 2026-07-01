import { Router } from "express";
import {
  register,
  login,
  verify,
  getMe,
  logout,
  googleCallback,
} from "../controllers/auth.controller.js";
import { validate } from "../middleware/zod.middleware.js";
import {
  registerValidator,
  loginValidator,
} from "../validator/auth.validator.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import passport from "passport";
import config from "../config/config.js";

const authRouter = Router();

authRouter.post("/register", validate(registerValidator), register);
authRouter.post("/login", validate(loginValidator), login);
authRouter.get("/verify-email", verify);
authRouter.get("/me", authMiddleware, getMe);
authRouter.post("/logout", authMiddleware, logout);
authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);
authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    successRedirect:
      `${config.base_url}/dashboard` || "http://localhost:5173/dashboard",
    failureRedirect:
      `${config.base_url}/login` || "http://localhost:5173/login",
  }),
  googleCallback,
);

export default authRouter;
