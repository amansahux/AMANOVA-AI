import express from "express";
import authRouter from "./routes/auth.routes.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/error.middleware.js";
import chatRoutes from "./routes/chat.routes.js";
const app = express();
app.use(express.json())
app.use(morgan("dev"))
app.use(cookieParser())

app.get("/api", (req, res) => {
  res.status(200).json({ message: "Hello World" });
});

//Routes

app.use("/api/auth", authRouter)
app.use("/api/chats", chatRoutes)



//Error Handler

app.use(errorHandler);

export default app;