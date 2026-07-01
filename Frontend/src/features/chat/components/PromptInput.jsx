import React, { useState, useRef, useCallback, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Paperclip, Mic } from "lucide-react";
import { useSelector } from "react-redux";

const MAX_HEIGHT = 220;

const PromptInput = ({ onSend }) => {
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef(null);
  const isSending = useSelector((state) => state.chat.isSending);

  // Auto-resize textarea
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    const newHeight = Math.min(ta.scrollHeight, MAX_HEIGHT);
    ta.style.height = `${newHeight}px`;
    ta.style.overflowY = ta.scrollHeight > MAX_HEIGHT ? "auto" : "hidden";
  }, [value]);

  const handleSubmit = useCallback(() => {
    const trimmed = value.trim();
    if (!trimmed || isSending) return;
    onSend(trimmed);
    setValue("");
    // Reset height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }, [value, isSending, onSend]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
      }
    },
    [handleSubmit]
  );

  const canSend = value.trim().length > 0 && !isSending;

  return (
    <div
      className="flex-none px-4 pb-4 pt-3"
      style={{
        backgroundColor: "rgba(5,5,5,0.95)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderTop: "1px solid #201f1f",
      }}
    >
      <div className="max-w-3xl mx-auto">
        {/* Input container */}
        <motion.div
          animate={{
            borderColor: isFocused
              ? "rgba(255,186,68,0.4)"
              : "rgba(42,42,42,1)",
            boxShadow: isFocused
              ? "0 0 0 3px rgba(255,186,68,0.08), 0 4px 20px rgba(0,0,0,0.3)"
              : "0 4px 20px rgba(0,0,0,0.2)",
          }}
          transition={{ duration: 0.15 }}
          className="flex items-end gap-3 px-4 py-3 rounded-2xl"
          style={{
            backgroundColor: "#131313",
            border: "1px solid #2a2a2a",
          }}
        >
          {/* Attachment button */}
          <button
            className="flex-none p-1.5 rounded-lg transition-all duration-150 self-end mb-0.5"
            style={{ color: "#a98a7f" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#201f1f";
              e.currentTarget.style.color = "#e5e2e1";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "#a98a7f";
            }}
            title="Attach file"
            type="button"
          >
            <Paperclip size={18} />
          </button>

          {/* Textarea */}
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Message AMANOVA AI..."
            rows={1}
            className="flex-1 bg-transparent resize-none outline-none text-sm leading-6"
            style={{
              color: "#e5e2e1",
              caretColor: "#FFBA44",
              minHeight: "24px",
              maxHeight: `${MAX_HEIGHT}px`,
            }}
          />

          {/* Right buttons */}
          <div className="flex items-center gap-1.5 self-end mb-0.5">
            {/* Mic button */}
            <button
              className="flex-none p-1.5 rounded-lg transition-all duration-150"
              style={{ color: "#a98a7f" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#201f1f";
                e.currentTarget.style.color = "#e5e2e1";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#a98a7f";
              }}
              title="Voice input"
              type="button"
            >
              <Mic size={18} />
            </button>

            {/* Send button */}
            <motion.button
              onClick={handleSubmit}
              disabled={!canSend}
              whileTap={canSend ? { scale: 0.92 } : {}}
              className="flex-none w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-150"
              style={{
                background: canSend
                  ? "linear-gradient(135deg, #FFBA44 0%, #ff7d3c 100%)"
                  : "#1c1b1b",
                cursor: canSend ? "pointer" : "not-allowed",
              }}
              onMouseEnter={(e) => {
                if (canSend) {
                  e.currentTarget.style.boxShadow =
                    "0 4px 14px rgba(255,186,68,0.4)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
              }}
              title="Send message"
              type="button"
            >
              <Send
                size={15}
                strokeWidth={2.5}
                style={{
                  color: canSend ? "#fff" : "#353534",
                  transform: "translateX(1px)",
                }}
              />
            </motion.button>
          </div>
        </motion.div>

        {/* Footer note */}
        <p
          className="text-center text-xs mt-2.5"
          style={{ color: "#353534" }}
        >
          AMANOVA AI can make mistakes. Consider checking important information.
        </p>
      </div>
    </div>
  );
};

export default memo(PromptInput);
