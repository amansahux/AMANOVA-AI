import React, { useState, useRef, useCallback, useEffect, memo } from "react";
import { motion } from "framer-motion";
import { Send, Paperclip, Mic } from "lucide-react";
import { useSelector } from "react-redux";

const MAX_HEIGHT = 220;

const PromptInput = ({ onSend }) => {
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef(null);
  const isSending = useSelector((state) => state.chat.isSending);

  /* Auto-resize textarea */
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    const next = Math.min(ta.scrollHeight, MAX_HEIGHT);
    ta.style.height = `${next}px`;
    ta.style.overflowY = ta.scrollHeight > MAX_HEIGHT ? "auto" : "hidden";
  }, [value]);

  const handleSubmit = useCallback(() => {
    const trimmed = value.trim();
    if (!trimmed || isSending) return;
    onSend(trimmed);
    setValue("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
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
    <div className="flex-none px-4 pb-4 pt-3 bg-[#050505]/95 backdrop-blur-xl border-t border-[#201f1f]">
      <div className="max-w-3xl mx-auto">

        {/* Input wrapper — Framer handles focus ring animation */}
        <motion.div
          animate={{
            borderColor: isFocused ? "rgba(255,186,68,0.4)" : "rgba(42,42,42,1)",
            boxShadow: isFocused
              ? "0 0 0 3px rgba(255,186,68,0.08), 0 4px 20px rgba(0,0,0,0.3)"
              : "0 4px 20px rgba(0,0,0,0.2)",
          }}
          transition={{ duration: 0.15 }}
          className="flex items-end gap-3 px-4 py-3 rounded-2xl bg-[#131313] border border-[#2a2a2a]"
        >
          {/* Attachment */}
          <button
            type="button"
            title="Attach file"
            className="flex-none p-1.5 rounded-lg self-end mb-0.5 text-[#a98a7f] hover:bg-[#201f1f] hover:text-[#e5e2e1] transition-all duration-150"
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
            className="flex-1 bg-transparent resize-none outline-none text-sm leading-6 text-[#e5e2e1] caret-[#FFBA44] placeholder:text-[#353534] min-h-[24px]"
            style={{ maxHeight: `${MAX_HEIGHT}px` }}
          />

          {/* Right controls */}
          <div className="flex items-center gap-1.5 self-end mb-0.5">
            {/* Mic */}
            <button
              type="button"
              title="Voice input"
              className="flex-none p-1.5 rounded-lg text-[#a98a7f] hover:bg-[#201f1f] hover:text-[#e5e2e1] transition-all duration-150"
            >
              <Mic size={18} />
            </button>

            {/* Send */}
            <motion.button
              type="button"
              title="Send message"
              onClick={handleSubmit}
              disabled={!canSend}
              whileTap={canSend ? { scale: 0.92 } : {}}
              className={`flex-none w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-150
                ${canSend
                  ? "bg-gradient-to-br from-[#FFBA44] to-[#ff7d3c] hover:shadow-[0_4px_14px_rgba(255,186,68,0.4)] cursor-pointer"
                  : "bg-[#1c1b1b] cursor-not-allowed"
                }`}
            >
              <Send
                size={15}
                strokeWidth={2.5}
                className={`translate-x-[1px] ${canSend ? "text-white" : "text-[#353534]"}`}
              />
            </motion.button>
          </div>
        </motion.div>

        {/* Footer disclaimer */}
        <p className="text-center text-xs mt-2.5 text-[#353534]">
          AMANOVA AI can make mistakes. Consider checking important information.
        </p>
      </div>
    </div>
  );
};

export default memo(PromptInput);
