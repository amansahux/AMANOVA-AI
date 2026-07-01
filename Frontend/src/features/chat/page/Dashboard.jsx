import { Outlet, useNavigate } from "react-router-dom";
import React, { useEffect, useState, useCallback } from "react";
import useChat from "../hook/useChat";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import PromptInput from "../components/PromptInput";

const Dashboard = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  const {
    initializedSocketConnection,
    handleGetChats,
    handleSendMessage,
    currentChat,
  } = useChat();

  // Initialize socket + fetch chats on mount
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

  const currentChatTitle = currentChat?.title
    ? String(currentChat.title).replace(/^"|"$/g, "")
    : null;
  const currentChatId = currentChat?.chatId

  const handleSend = useCallback(
    async (content) => {
      const newChatId = await handleSendMessage({ content, chatId: currentChatId });
      if (newChatId && !currentChatId) {
        navigate(`/chat/${newChatId}`);
      }
    },
    [handleSendMessage, currentChatId, navigate]
  );

  const messages = currentChat?.messages || [];
  const lastUserMessage = [...messages].reverse().find((m) => m.role === "user");

  const handleRegenerate = useCallback(() => {
    if (lastUserMessage?.content) {
      handleSendMessage({ content: lastUserMessage.content, chatId: currentChatId });
    }
  }, [lastUserMessage, handleSendMessage, currentChatId]);

  return (
    <div className="flex w-screen h-screen overflow-hidden bg-[#050505]">

      {/* SIDEBAR */}
      {!isMobile ? (
        <Sidebar isMobile={false} />
      ) : (
        <Sidebar
          isMobile={true}
          isOpen={isMobileSidebarOpen}
          onClose={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* MAIN AREA */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header
          currentChatTitle={currentChatTitle}
          onMenuToggle={() => setIsMobileSidebarOpen(true)}
        />
        <Outlet context={{ handleRegenerate }} />
        <PromptInput onSend={handleSend} />
      </div>
    </div>
  );
};

export default Dashboard;
