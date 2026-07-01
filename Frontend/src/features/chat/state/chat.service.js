import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chatSlice",
  initialState: {
    chats: [],
    currentChat: null,
    isSending: false,
    isLoadingChats: false,
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
  setError,
} = chatSlice.actions;

