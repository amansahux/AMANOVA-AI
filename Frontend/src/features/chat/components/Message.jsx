import React, { memo, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { motion } from "framer-motion";
import {
  Copy,
  Check,
  ThumbsUp,
  ThumbsDown,
  RefreshCw,
  Sparkles,
} from "lucide-react";

// Code block with copy button
const CodeBlock = memo(({ language, children }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(String(children).replace(/\n$/, ""));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="relative rounded-xl overflow-hidden my-3"
      style={{ border: "1px solid #2a2a2a" }}
    >
      {/* Header bar */}
      <div
        className="flex items-center justify-between px-4 py-2"
        style={{ backgroundColor: "#1c1b1b", borderBottom: "1px solid #2a2a2a" }}
      >
        <span className="text-xs font-mono" style={{ color: "#a98a7f" }}>
          {language || "code"}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg transition-all duration-150"
          style={{
            color: copied ? "#FFBA44" : "#a98a7f",
            backgroundColor: copied
              ? "rgba(255,186,68,0.1)"
              : "transparent",
          }}
          onMouseEnter={(e) => {
            if (!copied) {
              e.currentTarget.style.backgroundColor = "#201f1f";
              e.currentTarget.style.color = "#e5e2e1";
            }
          }}
          onMouseLeave={(e) => {
            if (!copied) {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "#a98a7f";
            }
          }}
        >
          {copied ? (
            <>
              <Check size={12} />
              Copied
            </>
          ) : (
            <>
              <Copy size={12} />
              Copy
            </>
          )}
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

// Markdown components
const markdownComponents = {
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || "");
    return !inline && match ? (
      <CodeBlock language={match[1]}>{children}</CodeBlock>
    ) : (
      <code
        className="px-1.5 py-0.5 rounded text-xs font-mono"
        style={{
          backgroundColor: "#1c1b1b",
          color: "#FFBA44",
          border: "1px solid #2a2a2a",
        }}
        {...props}
      >
        {children}
      </code>
    );
  },
  p({ children }) {
    return (
      <p className="mb-3 last:mb-0 leading-7" style={{ color: "#e5e2e1" }}>
        {children}
      </p>
    );
  },
  h1({ children }) {
    return (
      <h1
        className="text-xl font-bold mb-3 mt-4"
        style={{ color: "#e5e2e1" }}
      >
        {children}
      </h1>
    );
  },
  h2({ children }) {
    return (
      <h2
        className="text-lg font-semibold mb-2 mt-4"
        style={{ color: "#e5e2e1" }}
      >
        {children}
      </h2>
    );
  },
  h3({ children }) {
    return (
      <h3
        className="text-base font-semibold mb-2 mt-3"
        style={{ color: "#e5e2e1" }}
      >
        {children}
      </h3>
    );
  },
  ul({ children }) {
    return (
      <ul
        className="mb-3 pl-5 space-y-1 list-disc"
        style={{ color: "#e5e2e1" }}
      >
        {children}
      </ul>
    );
  },
  ol({ children }) {
    return (
      <ol
        className="mb-3 pl-5 space-y-1 list-decimal"
        style={{ color: "#e5e2e1" }}
      >
        {children}
      </ol>
    );
  },
  li({ children }) {
    return (
      <li className="leading-6" style={{ color: "#e5e2e1" }}>
        {children}
      </li>
    );
  },
  blockquote({ children }) {
    return (
      <blockquote
        className="pl-4 py-1 my-3 rounded-r-lg italic"
        style={{
          borderLeft: "3px solid #FFBA44",
          backgroundColor: "rgba(255,186,68,0.05)",
          color: "#e2bfb3",
        }}
      >
        {children}
      </blockquote>
    );
  },
  table({ children }) {
    return (
      <div className="overflow-x-auto my-4 rounded-xl" style={{ border: "1px solid #2a2a2a" }}>
        <table className="w-full border-collapse">{children}</table>
      </div>
    );
  },
  thead({ children }) {
    return (
      <thead style={{ backgroundColor: "#1c1b1b" }}>{children}</thead>
    );
  },
  th({ children }) {
    return (
      <th
        className="px-4 py-2.5 text-left text-sm font-semibold"
        style={{
          color: "#e5e2e1",
          borderBottom: "1px solid #2a2a2a",
        }}
      >
        {children}
      </th>
    );
  },
  td({ children }) {
    return (
      <td
        className="px-4 py-2.5 text-sm"
        style={{
          color: "#e5e2e1",
          borderBottom: "1px solid #201f1f",
        }}
      >
        {children}
      </td>
    );
  },
  hr() {
    return <hr style={{ borderColor: "#201f1f", margin: "16px 0" }} />;
  },
  a({ href, children }) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="underline transition-colors duration-150"
        style={{ color: "#FFBA44" }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "#ff7d3c";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "#FFBA44";
        }}
      >
        {children}
      </a>
    );
  },
  strong({ children }) {
    return (
      <strong className="font-semibold" style={{ color: "#e5e2e1" }}>
        {children}
      </strong>
    );
  },
};

// Single message component
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

  if (isUser) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="flex justify-end mb-5"
      >
        <div
          className="max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-7"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,186,68,0.15) 0%, rgba(255,125,60,0.08) 100%)",
            border: "1px solid rgba(255,186,68,0.2)",
            color: "#e5e2e1",
          }}
        >
          {message.content}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="flex gap-3 mb-6 group"
    >
      {/* AI Avatar */}
      <div
        className="w-7 h-7 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
        style={{
          background: "linear-gradient(135deg, #FFBA44 0%, #ff7d3c 100%)",
        }}
      >
        <Sparkles size={13} className="text-white" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="text-sm prose prose-invert max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={markdownComponents}
          >
            {message.content || ""}
          </ReactMarkdown>
        </div>

        {/* Action row */}
        <div
          className="flex items-center gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
        >
          <button
            onClick={handleCopy}
            title="Copy"
            className="p-1.5 rounded-lg transition-all duration-150"
            style={{
              color: copied ? "#FFBA44" : "#a98a7f",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#1c1b1b";
              if (!copied) e.currentTarget.style.color = "#e5e2e1";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              if (!copied) e.currentTarget.style.color = "#a98a7f";
            }}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
          </button>

          <button
            onClick={() => {
              setLiked(!liked);
              setDisliked(false);
            }}
            title="Like"
            className="p-1.5 rounded-lg transition-all duration-150"
            style={{ color: liked ? "#FFBA44" : "#a98a7f" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#1c1b1b";
              if (!liked) e.currentTarget.style.color = "#e5e2e1";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              if (!liked) e.currentTarget.style.color = "#a98a7f";
            }}
          >
            <ThumbsUp size={14} />
          </button>

          <button
            onClick={() => {
              setDisliked(!disliked);
              setLiked(false);
            }}
            title="Dislike"
            className="p-1.5 rounded-lg transition-all duration-150"
            style={{ color: disliked ? "#ff6464" : "#a98a7f" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#1c1b1b";
              if (!disliked) e.currentTarget.style.color = "#e5e2e1";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              if (!disliked) e.currentTarget.style.color = "#a98a7f";
            }}
          >
            <ThumbsDown size={14} />
          </button>

          {isLast && onRegenerate && (
            <button
              onClick={onRegenerate}
              title="Regenerate"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs transition-all duration-150"
              style={{ color: "#a98a7f" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#1c1b1b";
                e.currentTarget.style.color = "#e5e2e1";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#a98a7f";
              }}
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
