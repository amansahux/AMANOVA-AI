import express from "express";
import authRouter from "./routes/auth.routes.js";

const app = express();
app.use(express.json())

app.get("/api", (req, res) => {
  res.status(200).json({ message: "Hello World" });
});

//Routes

app.use("/api/auth", authRouter)

export default app;