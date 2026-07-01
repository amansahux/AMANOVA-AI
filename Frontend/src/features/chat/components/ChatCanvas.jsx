import React, { useRef, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Message from "./Message";
import { Sparkles } from "lucide-react";
import { useSelector } from "react-redux";

const TypingIndicator = () => (
  <motion.div
    initial={{ opacity: 0, y: 5 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.8 }}
    className="flex mb-6 ml-1"
  >
    <motion.div
      animate={{ scale: [1, 1.35, 1], opacity: [0.5, 1, 0.5] }}
      transition={{
        duration: 1.2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="w-[11px] h-[11px] rounded-full mt-1.5 bg-[#FFBA44] shadow-[0_0_10px_rgba(255,186,68,0.4)]"
    />
  </motion.div>
);

export const EmptyState = () => (
  <div className="flex flex-col items-center justify-center h-full text-center px-6">
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Logo */}
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
        style={{
          background:
            "linear-gradient(135deg, #FFBA44 0%, #ff7d3c 100%)",
          boxShadow: "0 8px 32px rgba(255,186,68,0.25)",
        }}
      >
        <Sparkles size={30} className="text-white" />
      </div>

      <h2
        className="text-2xl font-semibold mb-2"
        style={{ color: "#e5e2e1" }}
      >
        How can I help you today?
      </h2>
      <p className="text-sm " style={{ color: "#a98a7f" }}>
        Start a conversation with AMANOVA AI. Ask me anything — I'm here to
        assist.
      </p>
    </motion.div>
  </div>
);

const ChatCanvas = ({ onRegenerate }) => {
  const bottomRef = useRef(null);
  const currentChat = useSelector((state) => state.chat.currentChat);
  const isSending = useSelector((state) => state.chat.isSending);
  const isLoadingMessages = useSelector(
    (state) => state.chat.isLoadingMessages
  );

  const messages = currentChat?.messages || [];

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isSending]);

  if (isLoadingMessages) {
    return (
      <div className="flex-1 overflow-hidden px-4 py-6">
        <div className="max-w-3xl mx-auto flex flex-col gap-8 opacity-60">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex flex-col gap-6">
              {/* User message skeleton */}
              <div className="flex justify-end">
                <div className="w-[60%] sm:w-[45%] h-[52px] rounded-2xl animate-pulse bg-[#1c1b1b]" />
              </div>

              {/* AI message skeleton */}
              <div className="flex gap-3">
                <div className="flex-1 space-y-3 pt-2">
                  <div className="h-4 w-[90%] rounded animate-pulse bg-[#1c1b1b]" />
                  <div className="h-4 w-[75%] rounded animate-pulse bg-[#1c1b1b]" />
                  <div className="h-4 w-[85%] rounded animate-pulse bg-[#1c1b1b]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex-1 overflow-y-auto chat-scroll"
      style={{ minHeight: 0 }}
    >
      <div className="max-w-3xl mx-auto px-4 py-6">
        <AnimatePresence mode="popLayout">
            {messages.map((msg, idx) => (
              <Message
                key={msg._id || msg.id || idx}
                message={msg}
                isLast={idx === messages.length - 1 && msg.role === "assistant"}
                onRegenerate={onRegenerate}
              />
            ))}
          </AnimatePresence>

          {/* Typing indicator */}
          <AnimatePresence>
            {isSending && <TypingIndicator />}
          </AnimatePresence>

        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default memo(ChatCanvas);
