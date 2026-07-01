import axios from "axios";

const API = axios.create({
  baseURL: "/api/chats",
  withCredentials: true,
});

const sendMessage = async ({ content, chatId }) => {
  try {
    const payload = { content };

    if (chatId) {
      payload.chatId = chatId;
    }

    const { data } = await API.post("/send-message", payload);
    return data.data;
  } catch (error) {
    throw error;
  }
};

const getMessages = async ({ chatId }) => {
  try {
    const { data } = await API.get(`/${chatId}/messages`);
    return data.data;
  } catch (error) {
    throw error;
  }
};

const getChats = async () => {
  try {
    const { data } = await API.get("/");
    return data.data;
  } catch (error) {
    throw error;
  }
};
const deleteChat = async ({ chatId }) => {
  try {
    await API.delete(`/${chatId}`);
  } catch (error) {
    throw error;
  }
};

export { sendMessage, getMessages, getChats, deleteChat };
