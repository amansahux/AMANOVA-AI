import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chatSlice",
  initialState: {
    chats: [],
    currentChat: null,
    isLoadingChats: false,
    isLoadingMessages: false,
    isSending: false,
    error: null,
  },
  reducers: {
    setChats: (state, action) => {
      state.chats = action.payload;
    },

    setCurrentChat: (state, action) => {
      state.currentChat = action.payload;
    },

    setIsSending: (state, action) => {
      state.isSending = action.payload;
    },

    setIsLoadingChats: (state, action) => {
      state.isLoadingChats = action.payload;
    },
    setIsLoadingMessages: (state, action) => {
      state.isLoadingMessages = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export default chatSlice.reducer;
export const {
  setChats,
  setCurrentChat,
  setIsSending,
  setIsLoadingChats,
  setIsLoadingMessages,
  setError,
} = chatSlice.actions;
