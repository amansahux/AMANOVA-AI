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
  setIsLoadingChats,
  setCurrentChat,
  setError,
  setIsSending,
  setIsLoadingChats,
} from "../state/chat.service.js";

export const useChat = () => {
  const { chats, currentChat, error, isSending, isLoadingChats } = useSelector(
    (state) => state.chat,
  );
  const dispatch = useDispatch();

  const handleGetChats = async () => {
    try {
      dispatch(setIsLoadingChats(true));
      const response = await getChats();
      dispatch(setChats(response));
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      dispatch(setIsLoadingChats(false));
    }
  };

  const handleGetMessages = async ({ chatId }) => {
    try {
      dispatch(isLoadingChats(true));
      const response = await getMessages({ chatId });
      dispatch(setCurrentChat(response));
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      dispatch(isLoadingChats(false));
    }
  };
  const handleDeleteChat = async ({ chatId }) => {
    try {
      dispatch(setIsLoadingChats(true));
      await deleteChat({ chatId });
      handleGetChats();
      dispatch(setCurrentChat(null));
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      dispatch(setIsLoadingChats(false));
    }
  };

  return {
    initializedSocketConnection,
    handleGetChats,
    handleGetMessages,
    handleDeleteChat,
    chats,
    currentChat,
    error,
    isSending,
    isLoadingChats,
  };
};

export default useChat;
