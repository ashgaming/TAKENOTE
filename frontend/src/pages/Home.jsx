import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getChatIds, sendMsg } from '../redux/actions/msg.action';
import SideBar from '../components/layouts/SideBar';
import Navbar from '../components/layouts/Navbar';
import ChatArea from '../components/sections/chatSection/ChatArea';
import InputArea from '../components/sections/chatSection/InputArea';
import CameraPanel from '../components/sections/chatSection/CameraPanel';
import ImageInputPanel from '../components/sections/chatSection/ImageInputPanel';
import { globalVariable } from '../context/variables.context';
import CapuredImagePreviewPanel from '../components/sections/chatSection/CapuredImagePreviewPanel';

// Memoized versions of components
const MemoizedSideBar = React.memo(SideBar);
const MemoizedNavbar = React.memo(Navbar);
const MemoizedChatArea = React.memo(ChatArea);
const MemoizedInputArea = React.memo(InputArea);
const MemoizedCameraPanel = React.memo(CameraPanel);
const MemoizedCameraInputPanel = React.memo(ImageInputPanel);

const Home = () => {
    const dispatch = useDispatch();
     
    // State
   
    const inputTextRef = useRef(null);
    // const [isSidebarOpen, setSidebarOpen] = useState(false);
   

    const {
         isSidebarOpen  , toggleSidebar ,
         showCameraPanel, setShowCameraPanel ,
         showCameraInputPanel, setShowCameraInputPanel,
         chat_ids, chatId, setChatId ,
         messages , setMessages
        } = globalVariable();



    // Fetch chat IDs once on mount
    useEffect(() => {
        dispatch(getChatIds());
    }, [dispatch]);

    // Prevent function recreation using useCallback
   

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        const inputText = inputTextRef.current.value;
        if (inputText.trim()) {
            const newMessage = {
                type: 'user',
                text: inputText,
                timestamp: new Date().toISOString()
            };

            setMessages(prevMessages => [...prevMessages, newMessage]);

            const fdata = {
                text: inputText,
                chatId: chatId || undefined
            };

            dispatch(sendMsg(fdata, setMessages, setChatId));
            inputTextRef.current.value = '';
        }
    }, [dispatch, chatId]);

    return (
        <div className="flex h-screen bg-gray-900">
            <MemoizedSideBar
                isSidebarOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
                setChatId={setChatId}
                chat_ids={chat_ids}
                chatId={chatId}
            />

            <div className="flex-1 flex flex-col relative">
                <MemoizedNavbar />

                {showCameraPanel && (
                    <MemoizedCameraPanel setMessages={setMessages}/>
                )}

                {showCameraInputPanel && (
                    <MemoizedCameraInputPanel setShowCameraInputPanel={setShowCameraInputPanel} />
                )}

                {/* <CapuredImagePreviewPanel /> */}

                <MemoizedChatArea messages={messages} />

                <MemoizedInputArea
                    handleSubmit={handleSubmit}
                    inputTextRef={inputTextRef}
                    setShowCameraPanel={setShowCameraPanel}
                />
            </div>
        </div>
    );
};

export default Home;
