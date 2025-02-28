import { createContext, useCallback, useContext, useState } from "react";
import { useSelector } from "react-redux";

// Create the context
const VariableContext = createContext();

// Create a provider component
export const VariableProvider = ({ children }) => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [showCameraPanel, setShowCameraPanel] = useState(false);
    const [showCameraInputPanel, setShowCameraInputPanel] = useState(false);
    const [TakenImage, setTakenImage] = useState(null);
    const [messages, setMessages] = useState([]);

    const toggleSidebar = useCallback(() => setSidebarOpen(prev => !prev), []);


    const { chat_ids = [] } = useSelector(state => state.GetChatIds);
    const [chatId, setChatId] = useState(chat_ids[0]?._id);



    const states = {
        isSidebarOpen,
        toggleSidebar,
        showCameraPanel,
        setShowCameraPanel,
        showCameraInputPanel,
        setShowCameraInputPanel,
        messages, setMessages,
        TakenImage,
        setTakenImage,
        chat_ids, chatId, setChatId

    }
    return (
        <VariableContext.Provider value={states}>
            {children}
        </VariableContext.Provider>
    );
};

export const globalVariable = () => {
    return useContext(VariableContext);
};
