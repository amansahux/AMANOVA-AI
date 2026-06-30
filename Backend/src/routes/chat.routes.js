import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  sendMessage,
  getChats,
  getMessages,
  deleteChat,
} from "../controllers/chat.controller.js";
const chatRoutes = Router();

chatRoutes.post("/message", authMiddleware, sendMessage);
chatRoutes.get("/", authMiddleware, getChats);
chatRoutes.get("/:chatId/messages", authMiddleware, getMessages);
chatRoutes.delete("/:chatId/delete", authMiddleware, deleteChat);

export default chatRoutes;
