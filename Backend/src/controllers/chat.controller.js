import chatModel from "../models/chat.model.js";
import messageModel from "../models/message.model.js";
import ApiError from "../utils/ApiError.js";

export const sendMessage = async (req, res, next) => {};

export const getChats = async (req, res, next) => {
  try {
    const userId = req.user._id;
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
    const userId = req.user._id;
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

    const chat = await chatModel.findOneAndDelete({
      chat: chatId,
      user: req.user._id,
    });
    if (!chat) {
      throw new ApiError("Chat not found", 404);
    }
    await messageModel.deleteMany({ chat: chatId });
    return res.status(200).json({ message: "Chat deleted successfully" });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
