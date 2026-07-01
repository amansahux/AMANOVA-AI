import React, { useRef, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Message from "./Message";
import { Sparkles } from "lucide-react";
import { useSelector } from "react-redux";

const TypingIndicator = () => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 8 }}
    className="flex gap-3 mb-6"
  >
    <div
      className="w-7 h-7 rounded-xl flex items-center justify-center shrink-0"
      style={{
        background: "linear-gradient(135deg, #FFBA44 0%, #ff7d3c 100%)",
      }}
    >
      <Sparkles size={13} className="text-white" />
    </div>
    <div className="flex items-center gap-2 pt-1">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -5, 0] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut",
          }}
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: "#FFBA44" }}
        />
      ))}
    </div>
  </motion.div>
);

const EmptyState = () => (
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
      <p className="text-sm max-w-sm" style={{ color: "#a98a7f" }}>
        Start a conversation with AMANOVA AI. Ask me anything — I'm here to
        assist.
      </p>

      {/* Suggestion chips */}
      <div className="flex flex-wrap gap-2.5 justify-center mt-6">
        {[
          "Explain quantum computing",
          "Write a React component",
          "Summarize a document",
          "Debug my code",
        ].map((suggestion) => (
          <div
            key={suggestion}
            className="px-4 py-2 rounded-xl text-sm cursor-default transition-all duration-150"
            style={{
              backgroundColor: "#1c1b1b",
              border: "1px solid #2a2a2a",
              color: "#e2bfb3",
            }}
          >
            {suggestion}
          </div>
        ))}
      </div>
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
      <div className="flex-1 flex items-center justify-center overflow-hidden">
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex items-center gap-3"
          style={{ color: "#a98a7f" }}
        >
          <div
            className="w-6 h-6 rounded-xl flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #FFBA44 0%, #ff7d3c 100%)",
            }}
          >
            <Sparkles size={12} className="text-white" />
          </div>
          <span className="text-sm">Loading messages...</span>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className="flex-1 overflow-y-auto chat-scroll"
      style={{ minHeight: 0 }}
    >
      {messages.length === 0 && !isSending ? (
        <EmptyState />
      ) : (
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
      )}
    </div>
  );
};

export default memo(ChatCanvas);
