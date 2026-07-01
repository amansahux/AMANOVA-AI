import React, { useState, useRef, useCallback, useEffect, memo } from "react";
import { motion } from "framer-motion";
import { Send, Paperclip, Mic } from "lucide-react";
import { useSelector } from "react-redux";

const PromptInput = ({ onSend }) => {
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef(null);
  const isSending = useSelector((state) => state.chat.isSending);

  /* ── Auto-resize textarea — respects device viewport height ── */


  const handleSubmit = useCallback(() => {
    const trimmed = value.trim();
    if (!trimmed || isSending) return;
    onSend(trimmed);
    setValue("");
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
    /* Outer wrapper — full-width, respects sidebar */
    <div className="flex-none w-full px-3 sm:px-6 pb-4 pt-3 bg-[#050505]/95 backdrop-blur-xl">

      {/* Centered column — max-w matches ChatCanvas */}
      <div className="w-full max-w-3xl mx-auto">

        {/* ── Input card — Framer Motion handles focus-ring colour smoothly ── */}
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
          className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-3 rounded-2xl bg-[#131313] border border-[#2a2a2a]"
        >
          {/* ── Attach ── */}
          <button
            type="button"
            title="Attach file"
            aria-label="Attach file"
            className="flex-none p-1.5 rounded-lg self-end mb-0.5 text-[#a98a7f] hover:bg-[#201f1f] hover:text-[#e5e2e1] transition-all duration-150 cursor-pointer"
          >
            <Paperclip size={18} />
          </button>

          {/* ── Textarea ── */}
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Message AMANOVA AI..."
            rows={1}
            aria-label="Chat message input"
            className={[
              "flex-1  min-w-0 bg-transparent resize-none outline-none",
              "text-sm leading-6 text-[#e5e2e1] caret-[#FFBA44]",
              "placeholder:text-[#a98a7f]/50",
              "min-h-[24px]",
              "transition-none",
            ].join(" ")}
          />

          {/* ── Right controls ── */}
          <div className="flex items-center gap-1 sm:gap-1.5 self-end mb-0.5">

            {/* Mic — hidden on very small screens to save space */}
            <button
              type="button"
              title="Voice input"
              aria-label="Voice input"
              className="hidden xs:flex flex-none p-1.5 rounded-lg text-[#a98a7f] hover:bg-[#201f1f] hover:text-[#e5e2e1] transition-all duration-150 cursor-pointer items-center justify-center"
            >
              <Mic size={18} />
            </button>

            {/* Send */}
            <motion.button
              type="button"
              title="Send message"
              aria-label="Send message"
              onClick={handleSubmit}
              disabled={!canSend}
              whileTap={canSend ? { scale: 0.9 } : {}}
              className={[
                "flex-none w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-150",
                canSend
                  ? "bg-gradient-to-br from-[#FFBA44] to-[#ff7d3c] hover:shadow-[0_4px_14px_rgba(255,186,68,0.4)] cursor-pointer"
                  : "bg-[#1c1b1b] cursor-not-allowed",
              ].join(" ")}
            >
              <Send
                size={15}
                strokeWidth={2.5}
                className={`translate-x-[1px] ${canSend ? "text-white" : "text-[#353534]"}`}
              />
            </motion.button>
          </div>
        </motion.div>

        {/* ── Hint ── */}
        <p className="text-center text-[11px] sm:text-xs mt-2 text-[#353534] select-none">
          AMANOVA AI can make mistakes. Consider checking important information.
        </p>
      </div>
    </div>
  );
};

export default memo(PromptInput);
