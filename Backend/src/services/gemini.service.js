import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import config from "../config/config.js";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: config.gemini_api_key,
});

export const geminiResponse = async (prompt) => {
  const result = await model.invoke(prompt);
  return result.text;
};
