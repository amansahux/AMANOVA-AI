import React, { useState, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  Plus,
  Search,
  MessageCircle,
  Trash2,
  Settings,
  LogOut,
  X,
  Sparkles,
  AlertTriangle,
} from "lucide-react";
import useChat from "../hook/useChat";
import useAuth from "../../auth/hook/useAuth";
import { useDispatch } from "react-redux";
import { setCurrentChat } from "../state/chat.service";
import ConfirmModal from "./ConfirmModal";

/* ─── Chat List Item ──────────────────────────────────── */
const ChatItem = memo(({ chat, isActive, onSelect, onRequestDelete }) => {
  return (
    <Link to={`/chat/${chat._id}`}>
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -10 }}
        transition={{ duration: 0.15 }}
        onClick={() => onSelect(chat)}
        className={`group relative flex items-center gap-2 px-3 py-2 rounded-xl cursor-pointer transition-all duration-150
        ${
          isActive
            ? "bg-[#FFBA44]/10 border border-[#FFBA44]/20"
            : "border border-transparent hover:bg-[#1c1b1b]"
        }`}
      >
        <MessageCircle
          size={14}
          className={`shrink-0 ${isActive ? "text-[#FFBA44]" : "text-[#a98a7f]"}`}
        />
        <span
          className={`flex-1 text-sm truncate ${
            isActive
              ? "text-[#FFBA44] font-medium"
              : "text-[#e5e2e1] font-normal"
          }`}
        >
          {(chat.title ?? "").replace(/^"|"$/g, "")}
        </span>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onRequestDelete(chat);
          }}
          className="shrink-0 p-1 cursor-pointer rounded-lg text-[#a98a7f] opacity-0 group-hover:opacity-100 focus:opacity-100 hover:bg-red-500/20 hover:text-red-400 transition-all duration-150"
        >
          <Trash2 size={13} />
        </button>
      </motion.div>
    </Link>
  );
});
ChatItem.displayName = "ChatItem";

/* ─── Sidebar ─────────────────────────────────────────── */
const Sidebar = ({ isOpen, onClose, isMobile }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [pendingDelete, setPendingDelete] = useState(null); // { id, title }
  const [pendingLogout, setPendingLogout] = useState(false);

  const {
    chats,
    currentChat,
    handleGetMessages,
    handleDeleteChat,
    isLoadingChats,
  } = useChat();
  const { user, logout } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const filteredChats = (chats ?? []).filter((chat) =>
    (chat.title ?? "New Chat")
      .toLowerCase()
      .includes((searchQuery ?? "").toLowerCase()),
  );

  const handleSelectChat = useCallback(
    (chat) => {
      // handleGetMessages({ chatId: chat._id || chat.id });
      if (isMobile && onClose) onClose();
    },
    [handleGetMessages, isMobile, onClose],
  );

  /* Open the confirm modal instead of deleting directly */
  const handleRequestDelete = useCallback((chat) => {
    setPendingDelete({
      id: chat._id || chat.id,
      title: (chat.title ?? "New Chat").replace(/^"|"$/g, ""),
    });
  }, []);

  /* Confirmed — actually delete */
  const handleConfirmDelete = useCallback(() => {
    if (pendingDelete?.id) handleDeleteChat({ chatId: pendingDelete.id });
    setPendingDelete(null);
  }, [pendingDelete, handleDeleteChat]);

  const handleNewChat = useCallback(() => {
    dispatch(setCurrentChat(null));
    navigate("/");
    if (isMobile && onClose) onClose();
  }, [dispatch, navigate, isMobile, onClose]);

  /* ── Shared sidebar DOM ── */
  const sidebarContent = (
    <div className="flex flex-col h-full w-[280px] bg-[#0e0e0e]">
      {/* TOP — Fixed */}
      <div className="flex-none px-4 pt-5 pb-3 space-y-3">
        {/* Logo row */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-gradient-to-br from-[#FFBA44] to-[#ff7d3c]">
              <Sparkles size={16} className="text-white" />
            </div>
            <span className="font-semibold text-base tracking-tight text-[#e5e2e1]">
              AMANOVA AI
            </span>
          </div>
          {isMobile && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#a98a7f] hover:bg-white/10 transition-colors duration-150"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* New Chat */}
        <button
          onClick={handleNewChat}
          className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium text-[#FFBA44]
            bg-gradient-to-br from-[#FFBA44]/15 to-[#ff7d3c]/10 border border-[#FFBA44]/25
            hover:from-[#FFBA44]/25 hover:to-[#ff7d3c]/18 transition-all duration-150"
        >
          <Plus size={16} strokeWidth={2.5} />
          New Chat
        </button>

        {/* Search */}
        <div className="relative mt-3">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a98a7f] pointer-events-none"
          />
          <input
            type="text"
            placeholder="Search chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm rounded-xl outline-none
              bg-[#1c1b1b] border border-[#2a2a2a] text-[#e5e2e1] caret-[#FFBA44]
              placeholder:text-[#a98a7f]/60
              focus:border-[#FFBA44]/40 focus:shadow-[0_0_0_2px_rgba(255,186,68,0.08)]
              transition-all duration-150"
          />
        </div>

        {/* Divider */}
        <div className="h-px bg-[#201f1f]" />
      </div>

      {/* SCROLLABLE CHAT HISTORY */}
      <div className="flex-1 overflow-y-auto sidebar-scroll px-3 py-1 min-h-0">
        {isLoadingChats ? (
          <div className="flex flex-col gap-2 px-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-9 rounded-xl animate-pulse bg-[#1c1b1b]"
              />
            ))}
          </div>
        ) : filteredChats.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 gap-2 text-center text-[#a98a7f]">
            <MessageCircle size={28} className="opacity-40" />
            <p className="text-sm opacity-70">
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
                onRequestDelete={handleRequestDelete}
              />
            ))}
          </AnimatePresence>
        )}
      </div>

      {/* BOTTOM — Fixed */}
      <div className="flex-none px-3 pb-4 pt-2 border-t border-[#201f1f]">
        {/* Profile row */}
        <div className="flex items-center gap-3 px-2 py-2.5 rounded-xl mb-1 cursor-pointer hover:bg-[#1c1b1b] transition-all duration-150">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 text-white bg-gradient-to-br from-[#FFBA44] to-[#ff7d3c]">
            {user?.name?.[0]?.toUpperCase() ||
              user?.username?.[0]?.toUpperCase() ||
              "A"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate text-[#e5e2e1]">
              {user?.name || user?.username || "User"}
            </p>
            <p className="text-xs truncate text-[#a98a7f]">
              {user?.email || ""}
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-1 px-1">
          <button className="flex-1 flex items-center justify-center gap-2 py-2 text-xs rounded-lg text-[#a98a7f] hover:bg-[#1c1b1b] hover:text-[#e5e2e1] transition-all duration-150">
            <Settings size={14} />
            Settings
          </button>
          <button
            onClick={() => setPendingLogout(true)}
            className="flex-1 flex cursor-pointer items-center justify-center gap-2 py-2 text-xs rounded-lg text-[#a98a7f] hover:bg-red-500/10 hover:text-red-400 transition-all duration-150"
          >
            <LogOut size={14} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );

  /* Mobile drawer */
  if (isMobile) {
    return (
      <>
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={onClose}
                className="fixed inset-0 z-40 bg-black/60"
              />
              <motion.div
                initial={{ x: -280 }}
                animate={{ x: 0 }}
                exit={{ x: -280 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="fixed left-0 top-0 bottom-0 z-50 overflow-hidden shadow-[4px_0_24px_rgba(0,0,0,0.4)]"
              >
                {sidebarContent}
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Delete modal */}
        {pendingDelete && (
          <ConfirmModal
            icon={<AlertTriangle size={22} className="text-red-400" />}
            iconBg="bg-red-500/10"
            iconBorder="border-red-500/20"
            title="Delete Chat?"
            description={
              <p>
                <span className="text-[#e5e2e1] font-medium">
                  {pendingDelete.title}{" "}
                </span>
                will be permanently deleted. This action cannot be undone.
              </p>
            }
            confirmLabel="Delete"
            confirmClass="text-white bg-red-500/80 hover:bg-red-500 border-red-500/30 hover:border-red-500/60 hover:shadow-[0_4px_14px_rgba(239,68,68,0.3)]"
            onConfirm={handleConfirmDelete}
            onCancel={() => setPendingDelete(null)}
          />
        )}

        {/* Logout modal */}
        {pendingLogout && (
          <ConfirmModal
            icon={<LogOut size={22} className="text-[#FFBA44]" />}
            iconBg="bg-[#FFBA44]/10"
            iconBorder="border-[#FFBA44]/20"
            title="Sign out?"
            description="You will be signed out of your account. Any unsaved changes will be lost."
            confirmLabel="Sign out"
            confirmClass="text-[#050505] bg-[#FFBA44] hover:bg-[#ffca6e] border-[#FFBA44]/40 hover:shadow-[0_4px_14px_rgba(255,186,68,0.35)]"
            onConfirm={() => {
              setPendingLogout(false);
              logout();
            }}
            onCancel={() => setPendingLogout(false)}
          />
        )}
      </>
    );
  }

  /* Desktop static */
  return (
    <>
      <div className="relative flex-none h-full overflow-hidden border-r border-[#201f1f]">
        {sidebarContent}
      </div>

      {/* Delete modal */}
      {pendingDelete && (
        <ConfirmModal
          icon={<AlertTriangle size={22} className="text-red-400" />}
          iconBg="bg-[#FFBA44]/10"
          iconBorder="border-[#FFBA44]/20"
          title="Delete Chat?"
          description={
            <p>
              <span className="text-[#e5e2e1] font-medium">
                {pendingDelete.title}{" "}
              </span>
              will be permanently deleted. This action cannot be undone.
            </p>
          }
          confirmLabel="Delete"
          confirmClass="text-[#050505] bg-[#FFBA44] hover:bg-[#ffca6e] border-[#FFBA44]/40 hover:shadow-[0_4px_14px_rgba(255,186,68,0.35)]"
          onConfirm={handleConfirmDelete}
          onCancel={() => setPendingDelete(null)}
        />
      )}

      {/* Logout modal */}
      {pendingLogout && (
        <ConfirmModal
          icon={<LogOut size={22} className="text-[#FFBA44]" />}
          iconBg="bg-[#FFBA44]/10"
          iconBorder="border-[#FFBA44]/20"
          title="Sign out?"
          description="You will be signed out of your account. Any unsaved changes will be lost."
          confirmLabel="Sign out"
          confirmClass="text-[#050505] bg-[#FFBA44] hover:bg-[#ffca6e] border-[#FFBA44]/40 hover:shadow-[0_4px_14px_rgba(255,186,68,0.35)]"
          onConfirm={() => {
            setPendingLogout(false);
            logout();
          }}
          onCancel={() => setPendingLogout(false)}
        />
      )}
    </>
  );
};

export default memo(Sidebar);
