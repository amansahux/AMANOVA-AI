import React, { useEffect, memo } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import ChatCanvas from '../components/ChatCanvas';
import useChat from '../hook/useChat';

const SpecificChat = () => {
    const { chatId } = useParams();
    const { handleGetMessages } = useChat();
    const { handleRegenerate } = useOutletContext();

    useEffect(() => {
        if (chatId) {
            handleGetMessages({ chatId });
        }
    }, [chatId]); // We omit handleGetMessages from deps to avoid infinite loops since useChat isn't fully stable yet

    return <ChatCanvas onRegenerate={handleRegenerate} />;
}

export default memo(SpecificChat);