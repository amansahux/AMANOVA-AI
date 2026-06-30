import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  sendMessage,
  getChats,
  getMessages,
  deleteChat,
} from "../controllers/chat.controller.js";
import { validate } from "../middleware/zod.middleware.js";
import { ChatValidator } from "../validator/chat.validator.js";
const chatRoutes = Router();

chatRoutes.post("/send-message", authMiddleware, validate(ChatValidator), sendMessage);
chatRoutes.get("/", authMiddleware, getChats);
chatRoutes.get("/:chatId/messages", authMiddleware, getMessages);
chatRoutes.delete("/:chatId", authMiddleware, deleteChat);

export default chatRoutes;
