import React, { useEffect, useState, useCallback, useRef } from "react";
import { useSelector } from "react-redux";
import useChat from "../hook/useChat";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import ChatCanvas from "../components/ChatCanvas";
import PromptInput from "../components/PromptInput";

const Dashboard = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const {
    initializedSocketConnection,
    handleGetChats,
    handleSendMessage,
    currentChat,
    isSending,
  } = useChat();

  // Initialize socket and fetch chats on mount
  useEffect(() => {
    initializedSocketConnection();
    handleGetChats();
  }, []);

  // Detect mobile breakpoint
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const handler = (e) => setIsMobile(e.matches);
    setIsMobile(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Derive current chat title
  const currentChatTitle = currentChat?.chat?.title || null;

  // Get current chat id for sending messages
  const currentChatId = currentChat?.chat?.id || currentChat?.chat?._id || null;

  // Handle sending a message
  const handleSend = useCallback(
    (content) => {
      handleSendMessage({ content, chatId: currentChatId });
    },
    [handleSendMessage, currentChatId]
  );

  // Handle regenerate (resend last user message)
  const messages = currentChat?.messages || [];
  const lastUserMessage = [...messages]
    .reverse()
    .find((m) => m.role === "user");

  const handleRegenerate = useCallback(() => {
    if (lastUserMessage?.content) {
      handleSendMessage({
        content: lastUserMessage.content,
        chatId: currentChatId,
      });
    }
  }, [lastUserMessage, handleSendMessage, currentChatId]);

  return (
    <div
      className="flex overflow-hidden"
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#050505",
      }}
    >
      {/* SIDEBAR — Desktop: always visible, Mobile: slide-over drawer */}
      {!isMobile ? (
        <Sidebar isMobile={false} />
      ) : (
        <Sidebar
          isMobile={true}
          isOpen={isMobileSidebarOpen}
          onClose={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* MAIN CONTENT AREA */}
      <div className="flex flex-col flex-1 overflow-hidden" style={{ minWidth: 0 }}>
        {/* FIXED HEADER */}
        <Header
          currentChatTitle={currentChatTitle}
          onMenuToggle={() => setIsMobileSidebarOpen(true)}
        />

        {/* SCROLLABLE CHAT CANVAS — ONLY this scrolls */}
        <ChatCanvas onRegenerate={handleRegenerate} />

        {/* FIXED PROMPT INPUT */}
        <PromptInput onSend={handleSend} />
      </div>
    </div>
  );
};

export default Dashboard;
