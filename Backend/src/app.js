import express from "express";
import authRouter from "./routes/auth.routes.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/error.middleware.js";
import chatRoutes from "./routes/chat.routes.js";
import passport from "passport";
import config from "./config/config.js";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";


const app = express();
app.use(express.json())
app.use(morgan("dev"))
app.use(cookieParser())
app.use(passport.initialize());



passport.use(new GoogleStrategy({
  clientID: config.google_client_id,
  clientSecret: config.google_client_secret,
  callbackURL: `${config.base_url}/api/auth/google/callback`,
}, (accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}));

app.get("/api", (req, res) => {
  res.status(200).json({ message: "Hello World" });
});

//Routes

app.use("/api/auth", authRouter)
app.use("/api/chats", chatRoutes)



//Error Handler

app.use(errorHandler);

export default app;