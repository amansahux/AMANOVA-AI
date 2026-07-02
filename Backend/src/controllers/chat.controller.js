import chatModel from "../models/chat.model.js";
import messageModel from "../models/message.model.js";
import { generateChatTitle, GenerateResponse } from "../services/ai.service.js";
import ApiError from "../utils/ApiError.js";

export const sendMessage = async (req, res, next) => {
  try {
    const { content, chatId } = req.body;
    const userId = req.user.id;

    let title,
      chat = null;

    if (!chatId) {
      title = await generateChatTitle(content);
      chat = await chatModel.create({
        user: userId,
        title: title,
      });
    }

    const userMessage = await messageModel.create({
      chat: chatId || chat._id,
      content: content,
      role: "user",
    });

    const messages = await messageModel.find({
      chat: chatId || chat._id,
    });
    let AiResponse = null;
    try {
      AiResponse = await GenerateResponse(messages);
    } catch (error) {
      await messageModel.deleteOne({ _id: userMessage._id });
      if (!chatId && chat) {
        await chatModel.deleteOne({ _id: chat._id });
      }
      return res.status(503).json({
        success: false,
        message: "AI service unavailable try again later",
        error: error.message,
      });
    }

    const AiMessage = await messageModel.create({
      chat: chatId || chat._id,
      content: AiResponse,
      role: "ai",
    });
    return res.status(200).json({
      success: true,
      data: {
        chat: {
          id: chatId || chat._id,
          title: title,
        },
        message: {
          id: AiMessage._id,
          content: AiMessage.content,
          role: AiMessage.role,
        },
      },
      error: null,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const getChats = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const chats = await chatModel.find({
      user: userId,
    });
    if (!chats) {
      throw new ApiError("Chats not found", 404);
    }

    return res.status(200).json({
      success: true,
      message: "Chats fetched successfully",
      data: chats,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const chatId = req.params.chatId;

    // 1. Validate Chat Belongs to User
    const chat = await chatModel.findOne({
      _id: chatId,
      user: userId,
    });

    if (!chat) {
      throw new ApiError("Chat not found or access denied", 404);
    }

    // 2. Populate and Paginate Messages
    const messages = await messageModel.find({ chat: chatId });

    return res.status(200).json({
      success: true,
      message: "Messages fetched successfully",
      data: {
        chatId: chat._id,
        title: chat.title,
        messages,
      },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const deleteChat = async (req, res, next) => {
  try {
    const { chatId } = req.params;
    if (!chatId) {
      return next(new ApiError("Chat ID is required", 400));
    }
    await chatModel.findOneAndDelete({
      _id: chatId,
      user: req.user.id,
    });
    await messageModel.deleteMany({ chat: chatId });
    return res.status(200).json({ message: "Chat deleted successfully" });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
