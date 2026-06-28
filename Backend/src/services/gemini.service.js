import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import config from "../config/config.js";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-flash-lite",
  apiKey: config.gemini_api_key,
});

export const geminiPrompt = async (prompt) => {
  const result = await model.invoke(prompt);
  console.log(result.content);
};
