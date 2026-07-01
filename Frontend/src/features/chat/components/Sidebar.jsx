import React, { useState, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  MessageSquare,
  Trash2,
  Settings,
  LogOut,
  ChevronRight,
  X,
  Sparkles,
} from "lucide-react";
import useChat from "../hook/useChat";
import useAuth from "../../auth/hook/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentChat } from "../state/chat.service";

const ChatItem = memo(({ chat, isActive, onSelect, onDelete }) => {
  const [showDelete, setShowDelete] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.15 }}
      className="group relative flex items-center gap-2 px-3 py-2 rounded-xl cursor-pointer transition-all duration-150"
      style={{
        backgroundColor: isActive
          ? "rgba(255,186,68,0.12)"
          : "transparent",
        border: isActive
          ? "1px solid rgba(255,186,68,0.2)"
          : "1px solid transparent",
      }}
      onMouseEnter={() => setShowDelete(true)}
      onMouseLeave={() => setShowDelete(false)}
      onClick={() => onSelect(chat)}
    >
      <MessageSquare
        size={14}
        className={isActive ? "text-primary shrink-0" : "text-on-surface-variant shrink-0"}
        style={{ color: isActive ? "#FFBA44" : undefined }}
      />
      <span
        className="flex-1 text-sm truncate"
        style={{
          color: isActive ? "#FFBA44" : "#e5e2e1",
          fontWeight: isActive ? "500" : "400",
        }}
      >
        {chat.title || "New Chat"}
      </span>
      <AnimatePresence>
        {showDelete && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.1 }}
            onClick={(e) => {
              e.stopPropagation();
              onDelete(chat._id || chat.id);
            }}
            className="shrink-0 p-1 rounded-lg hover:bg-red-500/20 text-on-surface-variant hover:text-red-400 transition-all duration-150"
          >
            <Trash2 size={13} />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
});
ChatItem.displayName = "ChatItem";

const Sidebar = ({ isOpen, onClose, isMobile }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const {
    chats,
    currentChat,
    handleGetMessages,
    handleDeleteChat,
    isLoadingChats,
  } = useChat();
  const { user, logout } = useAuth();
  const dispatch = useDispatch();

  const filteredChats = chats.filter((chat) =>
    (chat.title || "New Chat")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const handleSelectChat = useCallback(
    (chat) => {
      handleGetMessages({ chatId: chat._id || chat.id });
      if (isMobile && onClose) onClose();
    },
    [handleGetMessages, isMobile, onClose]
  );

  const handleDeleteChatItem = useCallback(
    (chatId) => {
      handleDeleteChat({ chatId });
    },
    [handleDeleteChat]
  );

  const handleNewChat = useCallback(() => {
    dispatch(setCurrentChat(null));
    if (isMobile && onClose) onClose();
  }, [dispatch, isMobile, onClose]);

  const sidebarContent = (
    <div
      className="flex flex-col h-full"
      style={{ backgroundColor: "#0e0e0e", width: "280px" }}
    >
      {/* TOP SECTION - Fixed */}
      <div className="flex-none px-4 pt-5 pb-3 space-y-3">
        {/* Logo */}
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #FFBA44 0%, #ff7d3c 100%)",
              }}
            >
              <Sparkles size={16} className="text-white" />
            </div>
            <span
              className="font-semibold text-base tracking-tight"
              style={{ color: "#e5e2e1" }}
            >
              AMANOVA AI
            </span>
          </div>
          {isMobile && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-white/10 transition-colors duration-150"
              style={{ color: "#a98a7f" }}
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* New Chat Button */}
        <button
          onClick={handleNewChat}
          className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 group"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,186,68,0.15) 0%, rgba(255,125,60,0.1) 100%)",
            border: "1px solid rgba(255,186,68,0.25)",
            color: "#FFBA44",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background =
              "linear-gradient(135deg, rgba(255,186,68,0.25) 0%, rgba(255,125,60,0.18) 100%)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background =
              "linear-gradient(135deg, rgba(255,186,68,0.15) 0%, rgba(255,125,60,0.1) 100%)";
          }}
        >
          <Plus size={16} strokeWidth={2.5} />
          New Chat
        </button>

        {/* Search */}
        <div className="relative">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: "#a98a7f" }}
          />
          <input
            type="text"
            placeholder="Search chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm rounded-xl outline-none transition-all duration-150"
            style={{
              backgroundColor: "#1c1b1b",
              border: "1px solid #2a2a2a",
              color: "#e5e2e1",
              caretColor: "#FFBA44",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,186,68,0.4)";
              e.currentTarget.style.boxShadow =
                "0 0 0 2px rgba(255,186,68,0.08)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "#2a2a2a";
              e.currentTarget.style.boxShadow = "none";
            }}
          />
        </div>

        {/* Divider */}
        <div style={{ height: "1px", backgroundColor: "#201f1f" }} />
      </div>

      {/* SCROLLABLE CHAT HISTORY */}
      <div
        className="flex-1 overflow-y-auto sidebar-scroll px-3 py-1"
        style={{ minHeight: 0 }}
      >
        {isLoadingChats ? (
          <div className="flex flex-col gap-2 px-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-9 rounded-xl animate-pulse"
                style={{ backgroundColor: "#1c1b1b" }}
              />
            ))}
          </div>
        ) : filteredChats.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-10 gap-2 text-center"
            style={{ color: "#a98a7f" }}
          >
            <MessageSquare size={28} style={{ opacity: 0.4 }} />
            <p className="text-sm" style={{ opacity: 0.7 }}>
              {searchQuery ? "No chats found" : "No chats yet"}
            </p>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {filteredChats.map((chat) => (
              <ChatItem
                key={chat._id || chat.id}
                chat={chat}
                isActive={
                  currentChat?.chat?.id === (chat._id || chat.id) ||
                  currentChat?.chat?._id === (chat._id || chat.id)
                }
                onSelect={handleSelectChat}
                onDelete={handleDeleteChatItem}
              />
            ))}
          </AnimatePresence>
        )}
      </div>

      {/* BOTTOM FIXED SECTION */}
      <div
        className="flex-none px-3 pb-4 pt-2"
        style={{ borderTop: "1px solid #201f1f" }}
      >
        {/* Profile */}
        <div
          className="flex items-center gap-3 px-2 py-2.5 rounded-xl mb-1 transition-all duration-150 cursor-pointer"
          style={{ color: "#e5e2e1" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#1c1b1b";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
          }}
        >
          {/* Avatar */}
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold shrink-0"
            style={{
              background:
                "linear-gradient(135deg, #FFBA44 0%, #ff7d3c 100%)",
              color: "#fff",
            }}
          >
            {user?.name?.[0]?.toUpperCase() ||
              user?.username?.[0]?.toUpperCase() ||
              "A"}
          </div>
          <div className="flex-1 min-w-0">
            <p
              className="text-sm font-medium truncate"
              style={{ color: "#e5e2e1" }}
            >
              {user?.name || user?.username || "User"}
            </p>
            <p
              className="text-xs truncate"
              style={{ color: "#a98a7f" }}
            >
              {user?.email || ""}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-1 px-1">
          <button
            className="flex-1 flex items-center justify-center gap-2 py-2 text-xs rounded-lg transition-all duration-150"
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
            <Settings size={14} />
            <span>Settings</span>
          </button>
          <button
            onClick={logout}
            className="flex-1 flex items-center justify-center gap-2 py-2 text-xs rounded-lg transition-all duration-150"
            style={{ color: "#a98a7f" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(255,100,100,0.1)";
              e.currentTarget.style.color = "#ff6464";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "#a98a7f";
            }}
          >
            <LogOut size={14} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={onClose}
              className="fixed inset-0 z-40"
              style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 z-50 overflow-hidden"
              style={{
                boxShadow: "4px 0 24px rgba(0,0,0,0.4)",
              }}
            >
              {sidebarContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  }

  return (
    <div
      className="relative flex-none h-full overflow-hidden"
      style={{ borderRight: "1px solid #201f1f" }}
    >
      {sidebarContent}
    </div>
  );
};

export default memo(Sidebar);
