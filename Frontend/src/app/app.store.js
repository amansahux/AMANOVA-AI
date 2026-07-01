import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/state/auth.slice.js";
import chatReducer from "../features/chat/state/chat.service.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
  },
});
