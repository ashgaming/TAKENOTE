import React from 'react'


const ChatArea = ({ messages }) => {
    const formatTimestamp = (timestamp) => {
        return new Date(timestamp).toLocaleString();
    };

    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
                <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`rounded-lg p-3 max-w-[80%] sm:max-w-[70%] md:max-w-[60%] ${message.type === 'user' ? 'bg-violet-600 text-white' : 'bg-gray-800 text-gray-200'
                        }`}>
                        {message.image && (
                            <img
                                src={message.image}
                                alt="Captured"
                                className="rounded-lg w-full cursor-pointer hover:opacity-90 transition-opacity"
                                onClick={() => window.open(message.image, '_blank')}
                            />
                        )}
                        {message.text && <p className="mb-2">{message.text}</p>}

                        {message.timestamp && (
                            <p className="text-xs opacity-75 mt-2">{formatTimestamp(message.timestamp)}</p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ChatArea
