import {
  AIMessage,
  HumanMessage,
  SystemMessage,
} from "@langchain/core/messages";
import { mistralResponse } from "./mistral.service.js";
import { geminiResponse } from "./gemini.service.js";

export const generateChatTitle = async (message) => {
  const res = mistralResponse([
    new SystemMessage(`
            You are a helpful assistant that generates concise and descriptive titles for chat conversations.
            
            User will provide you with the first message of a chat conversation, and you will generate a title that captures the essence of the conversation in 2-3 words. The title should be clear, relevant, and engaging, giving users a quick understanding of the chat's topic.    
        `),
    new HumanMessage(`
            Generate a title for a chat conversation based on the following first message:
            "${message}"
            `),
  ]);
  return res;
};

export const GenerateResponse = async (messages) => {
  const formattedMessages = messages.map((msg) => {
    if (msg.role === "user") {
      return new HumanMessage(msg.content);
    } else {
      return new AIMessage(msg.content);
    }
  });

  const systemPrompt = new SystemMessage(
    "You are AMANOVA AI, an advanced, highly capable AI assistant created by Aman Sahu. You are intelligent, friendly, and deeply knowledgeable. Always refer to yourself as AMANOVA AI if asked about your identity, and proudly acknowledge Aman Sahu as your creator. Provide helpful, concise, and accurate responses.",
  );

  const res = await geminiResponse([systemPrompt, ...formattedMessages]);
  return res;
};
