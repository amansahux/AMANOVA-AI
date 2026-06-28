import { ChatMistralAI } from "@langchain/mistralai";
import config from "../config/config.js";

const model = new ChatMistralAI({
  model: "mistral-small-latest",
  apiKey: config.mistral_api_key,
  temperature: 0
});

export const mistralPrompt = async (prompt) => {
  const result = await model.invoke(prompt);
  console.log(result.content);
};