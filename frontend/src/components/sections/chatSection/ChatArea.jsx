import React, { useRef, useCallback, useEffect, useState } from "react";
import { VariableSizeList as List } from "react-window";
import ReactMarkdown from "react-markdown";
import { useSelector } from "react-redux";
import CapuredImagePreviewPanel from "./CapuredImagePreviewPanel";

// Chat message row component
const MessageRow = ({ index, data, style }) => {
    const message = data[index];

    const formatTimestamp = (timestamp) => new Date(timestamp).toLocaleString();

    return (
        <div style={{ ...style, paddingBottom: 10 }} className={` flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`rounded-lg p-3 max-w-[80%] sm:max-w-[70%] md:max-w-[60%] 
                ${message.type === 'user' ? 'bg-violet-600 text-white' : 'bg-gray-800 text-gray-200'}`}>
                
                {message.image && (
                    <img
                        src={message.image}
                        alt="Captured"
                        className="rounded-lg w-full cursor-pointer hover:opacity-90 transition-opacity"
                    />
                )}

                {message.text && <ReactMarkdown>{message.text}</ReactMarkdown>}

                {message.timestamp && (
                    <p className="text-xs opacity-75 mt-2">{formatTimestamp(message.timestamp)}</p>
                )}
            </div>
        </div>
    );
};

const ChatArea = ({ messages }) => {
    const listRef = useRef(null);
    const rowHeights = useRef({});
    const [listHeight, setListHeight] = useState(500);

    const { loading:isSending } = useSelector(state => state.SendMsg);

    // Function to measure row height dynamically
    const getItemSize = useCallback((index) => {
        const message = messages[index];
        if (!message) return 80;

        let baseHeight = 40; // Minimum height
        if (message.text) baseHeight += message.text.length / 2; // Adjust based on text length
        if (message.image) baseHeight += 150; // Add height for images

        return Math.max(baseHeight, 60);
    }, [messages]);

    // Auto-scroll to the bottom when new messages arrive
    useEffect(() => {
        if (listRef.current) {
            listRef.current.scrollToItem(messages.length - 1, "end");
        }
    }, [messages]);

    return (
        <div className="flex-1 overflow-hidden p-4">
            <List
                ref={listRef}
                height={listHeight} // Dynamic height based on available space
                itemCount={messages.length}
                itemSize={getItemSize} // Dynamic row height
                width="100%"
                itemData={messages}
            >
                {MessageRow}
            </List>

            <CapuredImagePreviewPanel />

            {isSending && (
                <div className="flex justify-start mb-20 ">
                    <div className="rounded-lg p-3 max-w-[80%] sm:max-w-[70%] md:max-w-[60%] bg-violet-600 text-white">
                        <p className="mb-2">Loading...</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatArea;
