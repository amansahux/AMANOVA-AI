import { Router } from "express";
import { register, login, verify, getMe } from "../controllers/auth.controller.js";
import { validate } from "../middleware/zod.middleware.js";
import { registerValidator, loginValidator } from "../validator/auth.validator.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const authRouter = Router();

authRouter.post("/register", validate(registerValidator), register);
authRouter.post("/login", validate(loginValidator), login);
authRouter.get("/verify-email", verify);
authRouter.get("/me", authMiddleware, getMe);

export default authRouter;