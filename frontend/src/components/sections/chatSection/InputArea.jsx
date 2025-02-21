import { Camera, Send } from 'lucide-react'
import React from 'react'

const InputArea = ({handleSubmit,inputText,setInputText,setShowCameraPanel}) => {
    return (
        <div className="p-4 bg-gray-800 sticky bottom-0">
            <form onSubmit={handleSubmit} className="flex space-x-2 max-w-6xl mx-auto">
                <button
                    type="button"
                    onClick={() => setShowCameraPanel(true)}
                    className="p-3 text-white bg-violet-600 rounded-full hover:bg-violet-700 transition-colors flex items-center space-x-2"
                >
                    <Camera size={20} />
                    {/* <span className="hidden sm:inline">Camera</span> */}
                </button>
                <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 bg-gray-700 text-white rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
                <button
                    type="submit"
                    className="p-3 text-white bg-violet-600 rounded-full hover:bg-violet-700 flex items-center space-x-2"
                >
                    <Send size={20} />
                    <span className="hidden sm:inline">Send</span>
                </button>
            </form>
        </div>
    )
}

export default InputArea
