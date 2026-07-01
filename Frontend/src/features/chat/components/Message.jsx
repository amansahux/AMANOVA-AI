import React, { memo, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { motion } from "framer-motion";
import { Copy, Check, ThumbsUp, ThumbsDown, RefreshCw, } from "lucide-react";

/* ─── Code Block ──────────────────────────────────────── */
const CodeBlock = memo(({ language, children }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(String(children).replace(/\n$/, ""));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative rounded-xl overflow-hidden my-3 border border-[#2a2a2a]">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#1c1b1b] border-b border-[#2a2a2a]">
        <span className="text-xs font-mono text-[#a98a7f]">{language || "code"}</span>
        <button
          onClick={handleCopy}
          className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg transition-all duration-150
            ${copied
              ? "text-[#FFBA44] bg-[#FFBA44]/10"
              : "text-[#a98a7f] hover:bg-[#201f1f] hover:text-[#e5e2e1]"
            }`}
        >
          {copied ? <><Check size={12} />Copied</> : <><Copy size={12} />Copy</>}
        </button>
      </div>

      <SyntaxHighlighter
        style={vscDarkPlus}
        language={language}
        PreTag="div"
        customStyle={{
          margin: 0,
          padding: "16px",
          backgroundColor: "#0e0e0e",
          fontSize: "13px",
          lineHeight: "1.6",
        }}
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    </div>
  );
});
CodeBlock.displayName = "CodeBlock";

/* ─── Markdown element map ────────────────────────────── */
const markdownComponents = {
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || "");
    return !inline && match ? (
      <CodeBlock language={match[1]}>{children}</CodeBlock>
    ) : (
      <code
        className="px-1.5 py-0.5 rounded text-xs font-mono bg-[#1c1b1b] text-[#FFBA44] border border-[#2a2a2a]"
        {...props}
      >
        {children}
      </code>
    );
  },
  p: ({ children }) => (
    <p className="mb-3 last:mb-0 leading-7 text-[#e5e2e1]">{children}</p>
  ),
  h1: ({ children }) => (
    <h1 className="text-xl font-bold mb-3 mt-4 text-[#e5e2e1]">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-lg font-semibold mb-2 mt-4 text-[#e5e2e1]">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-base font-semibold mb-2 mt-3 text-[#e5e2e1]">{children}</h3>
  ),
  ul: ({ children }) => (
    <ul className="mb-3 pl-5 space-y-1 list-disc text-[#e5e2e1]">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-3 pl-5 space-y-1 list-decimal text-[#e5e2e1]">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="leading-6 text-[#e5e2e1]">{children}</li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="pl-4 py-1 my-3 rounded-r-lg italic border-l-[3px] border-[#FFBA44] bg-[#FFBA44]/5 text-[#e2bfb3]">
      {children}
    </blockquote>
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto my-4 rounded-xl border border-[#2a2a2a]">
      <table className="w-full border-collapse">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-[#1c1b1b]">{children}</thead>
  ),
  th: ({ children }) => (
    <th className="px-4 py-2.5 text-left text-sm font-semibold text-[#e5e2e1] border-b border-[#2a2a2a]">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-2.5 text-sm text-[#e5e2e1] border-b border-[#201f1f]">
      {children}
    </td>
  ),
  hr: () => <hr className="border-[#201f1f] my-4" />,
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="underline text-[#FFBA44] hover:text-[#ff7d3c] transition-colors duration-150"
    >
      {children}
    </a>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-[#e5e2e1]">{children}</strong>
  ),
};

/* ─── Single Message ──────────────────────────────────── */
const Message = memo(({ message, isLast, onRegenerate }) => {
  const isUser = message.role === "user";
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  /* User bubble */
  if (isUser) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="flex justify-end mb-5"
      >
        <div className="max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-7 text-[#e5e2e1] bg-gradient-to-br from-[#FFBA44]/15 to-[#ff7d3c]/8 border border-[#FFBA44]/20">
          {message.content}
        </div>
      </motion.div>
    );
  }

  /* AI bubble */
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="flex gap-3 mb-6 group"
    >

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="text-sm prose prose-invert max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
            {message.content || ""}
          </ReactMarkdown>
        </div>

        {/* Action row — visible on group hover */}
        <div className="flex items-center gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
          {/* Copy */}
          <button
            onClick={handleCopy}
            title="Copy"
            className={`p-1.5 rounded-lg transition-all duration-150 hover:bg-[#1c1b1b]
              ${copied ? "text-[#FFBA44]" : "text-[#a98a7f] hover:text-[#e5e2e1]"}`}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
          </button>

          {/* Like */}
          <button
            onClick={() => { setLiked(!liked); setDisliked(false); }}
            title="Like"
            className={`p-1.5 rounded-lg transition-all duration-150 hover:bg-[#1c1b1b]
              ${liked ? "text-[#FFBA44]" : "text-[#a98a7f] hover:text-[#e5e2e1]"}`}
          >
            <ThumbsUp size={14} />
          </button>

          {/* Dislike */}
          <button
            onClick={() => { setDisliked(!disliked); setLiked(false); }}
            title="Dislike"
            className={`p-1.5 rounded-lg transition-all duration-150 hover:bg-[#1c1b1b]
              ${disliked ? "text-red-400" : "text-[#a98a7f] hover:text-[#e5e2e1]"}`}
          >
            <ThumbsDown size={14} />
          </button>

          {/* Regenerate */}
          {isLast && onRegenerate && (
            <button
              onClick={onRegenerate}
              title="Regenerate"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs text-[#a98a7f] hover:bg-[#1c1b1b] hover:text-[#e5e2e1] transition-all duration-150"
            >
              <RefreshCw size={13} />
              Regenerate
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
});
Message.displayName = "Message";

export default Message;
