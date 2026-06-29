import React from "react";
import {initializedSocketConnection} from "../service/chat.socket.js";

export const useChat = () => {
  return {
    initializedSocketConnection,
  };
};

export default useChat;
