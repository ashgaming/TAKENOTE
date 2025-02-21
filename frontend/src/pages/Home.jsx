import React, { useState, useCallback, useRef } from 'react';
import SideBar from '../components/layouts/SideBar';
import Navbar from '../components/layouts/Navbar';
import ChatArea from '../components/sections/chatSection/ChatArea';
import InputArea from '../components/sections/chatSection/InputArea';
import CameraPanel from '../components/sections/chatSection/CameraPanel';


const Home = () => {

    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    
    const [showCameraPanel, setShowCameraPanel] = useState(false);
   

    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);


    

  

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputText.trim()) {
            const newMessage = {
                type: 'user',
                text: inputText,
                timestamp: new Date().toISOString()
            };
            setMessages([...messages, newMessage]);

            setTimeout(() => {
                setMessages(prev => [...prev, {
                    type: 'ai',
                    text: 'This is a simulated AI response to your message.',
                    timestamp: new Date().toISOString()
                }]);
            }, 1000);
            setInputText('');
        }
    };

   
    return (
        <div className="flex h-screen bg-gray-900">

            <SideBar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            <div className="flex-1 flex flex-col relative">

                <Navbar toggleSidebar={toggleSidebar} />

                {/* Camera Panel */}
                {showCameraPanel && (
                    <CameraPanel  setMessages={setMessages} setShowCameraPanel={setShowCameraPanel}/>
                )}

                
                <ChatArea messages={messages} />

          
                <InputArea handleSubmit={handleSubmit} inputText={inputText} setInputText={setInputText} setShowCameraPanel={setShowCameraPanel}/>
            </div>
        </div>
    );
}

export default Home;