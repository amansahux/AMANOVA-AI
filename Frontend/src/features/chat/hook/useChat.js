import React from "react";
import { initializedSocketConnection } from "../service/chat.socket.js";
import {
  sendMessage,
  getMessages,
  getChats,
  deleteChat,
} from "../service/chat.service.js";
import { useDispatch, useSelector } from "react-redux";
import {
  setChats,
  setCurrentChat,
  setError,
  setIsSending,
  setIsLoadingChats,
  setIsLoadingMessages,
} from "../state/chat.service.js";
import useToast from "../../../shared/toast/useToast.js";
import { handleError } from "../utils/handleError.js";

export const useChat = () => {
  const {
    chats,
    currentChat,
    error,
    isSending,
    isLoadingChats,
    isLoadingMessages,
  } = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  const toast = useToast();
  console.log(currentChat)

  const handleGetChats = async () => {
    try {
      dispatch(setIsLoadingChats(true));
      const response = await getChats();
      dispatch(setChats(response));
    } catch (error) {
      handleError(error, dispatch, toast);
    } finally {
      dispatch(setIsLoadingChats(false));
    }
  };
  const handleGetMessages = async ({ chatId }) => {
    try {
      dispatch(setIsLoadingMessages(true));
      const response = await getMessages({ chatId });
      dispatch(setCurrentChat(response));
    } catch (error) {
      handleError(error, dispatch, toast);
    } finally {
      dispatch(setIsLoadingMessages(false));
    }
  };
  const handleDeleteChat = async ({ chatId }) => {
    try {
      dispatch(setIsLoadingChats(true));
      await deleteChat({ chatId });
      await handleGetChats();
    } catch (error) {
      handleError(error, dispatch, toast);
    } finally {
      dispatch(setIsLoadingChats(false));
    }
  };
  const handleSendMessage = async ({ content, chatId }) => {
    try {
      dispatch(setIsSending(true));
      const response = await sendMessage({ content, chatId });
      await handleGetChats();
      if (response?.chat?.id) dispatch(setCurrentChat(response));
    } catch (error) {
      handleError(error, dispatch, toast);
    } finally {
      dispatch(setIsSending(false));
    }
  };

  return {
    initializedSocketConnection,
    handleGetChats,
    handleGetMessages,
    handleDeleteChat,
    handleSendMessage,
    chats,
    currentChat,
    error,
    isSending,
    isLoadingChats,
    isLoadingMessages,
  };
};

export default useChat;
