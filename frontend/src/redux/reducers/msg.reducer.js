import { DELETE_CHAT_IDS_SUCCESS, DELETE_MSG_ERROR, DELETE_MSG_REQUEST, DELETE_MSG_RESET, DELETE_MSG_SUCCESS, DELETE_REMINDER_ERROR, DELETE_REMINDER_REQUEST, DELETE_REMINDER_RESET, DELETE_REMINDER_SUCCESS, GET_CHAT_IDS_ERROR, GET_CHAT_IDS_REQUEST, GET_CHAT_IDS_RESET, GET_CHAT_IDS_SUCCESS, GET_MSG_ERROR, GET_MSG_REQUEST, GET_MSG_RESET, GET_MSG_SUCCESS, GET_REMINDER_ERROR, GET_REMINDER_REQUEST, GET_REMINDER_RESET, GET_REMINDER_SUCCESS, INSERT_CHAT_IDS_SUCCESS, REGISTER_REMINDER_ERROR, REGISTER_REMINDER_REQUEST, REGISTER_REMINDER_RESET, REGISTER_REMINDER_SUCCESS, SEND_MSG_ERROR, SEND_MSG_REQUEST, SEND_MSG_RESET, SEND_MSG_SUCCESS } from "../constants/msg.constants";



export const registerReminderReducer = (state = {
    reminder: {}, loading: false, success: false, error: false
}, action) => {
    switch (action.type) {
        case REGISTER_REMINDER_REQUEST:
            return { loading: true, success: false, error: false };
        case REGISTER_REMINDER_SUCCESS:
            return { ...state, loading: false, reminder: action.payload, success: true, error: false };
        case REGISTER_REMINDER_ERROR:
            return { ...state, loading: false, success: false, error: action.payload };
        case REGISTER_REMINDER_RESET:
            return { ...userLoginInitial };
        default:
            return state;
    }
};


export const getReminderReducer = (state = {
    reminder: [], loading: false, success: false, error: false
}, action) => {
    switch (action.type) {
        case GET_REMINDER_REQUEST:
            return { loading: true, success: false, error: false };
        case GET_REMINDER_SUCCESS: // Handle successful registration
            return { ...state, loading: false, reminder: action.payload, success: true, error: false };
        case GET_REMINDER_ERROR: // Handle registration failure
            return { ...state, loading: false, success: false, error: action.payload };
        case GET_REMINDER_RESET: // Handle registration failure
            return {
                reminder: [], loading: false, success: false, error: false
            };
        default:
            return state;
    }
};


export const deleteReminderReducer = (state = { loading: false, success: false, error: false }, action) => {
    switch (action.type) {
        case DELETE_REMINDER_REQUEST:
            return { loading: true, success: false, error: false };
        case DELETE_REMINDER_SUCCESS:
            return { ...state, loading: false, success: true, error: false };
        case DELETE_REMINDER_ERROR:
            return { ...state, loading: false, success: false, error: action.payload };
        case DELETE_REMINDER_RESET:
            return { ...state, loading: false, success: false, error: false };
        default:
            return state;
    }
};

export const sendMsgReducer = (state = { msg: [], loading: false, success: false, error: false }, action) => {
    switch (action.type) {
        case SEND_MSG_REQUEST:
            return { loading: true, success: false, error: false };
        case SEND_MSG_SUCCESS:
            return { ...state, loading: false, msg: action.payload, success: true, error: false };
        case SEND_MSG_ERROR:
            return { ...state, loading: false, success: false, error: action.payload };
        case SEND_MSG_RESET:
            return { msg: [], loading: false, success: false, error: false };
        default:
            return state;
    }
};


export const getMsgReducer = (state = { msg: [], loading: false, success: false, error: false }, action) => {
    switch (action.type) {
        case GET_MSG_REQUEST:
            return { loading: true, success: false, error: false };
        case GET_MSG_SUCCESS: // Handle successful registration
            return { ...state, loading: false, msg: action.payload.token, success: true, error: false };
        case GET_MSG_ERROR: // Handle registration failure
            return { ...state, loading: false, success: false, error: action.payload };
        case GET_MSG_RESET: // Handle registration failure
            return { msg: {}, loading: false, success: false, error: false };
        default:
            return state;
    }
};


export const deleteMsgReducer = (state = { msg: [], loading: false, success: false, error: false }, action) => {
    switch (action.type) {
        case DELETE_MSG_REQUEST:
            return { loading: true, success: false, error: false };
        case DELETE_MSG_SUCCESS:
            return { ...state, loading: false, user: action.payload, success: true, error: false };
        case DELETE_MSG_ERROR:
            return { ...state, loading: false, success: false, error: action.payload };
        case DELETE_MSG_RESET:
            return { ...state, msg: [], loading: false, success: false, error: false };
        default:
            return state;
    }
};

export const getChatIdsReducer = (state = { chat_ids: [], loading: false, success: false, error: false }, action) => {
    switch (action.type) {
        case GET_CHAT_IDS_REQUEST:
            return { loading: true, success: false, error: false };

        case GET_CHAT_IDS_SUCCESS:
            return { ...state, loading: false, chat_ids: action.payload, success: true, error: false };

        case INSERT_CHAT_IDS_SUCCESS:
            const existingIds = state.chat_ids || []; // Ensure it's an array
            const newChatId = action.payload; // Get new chat ID

            const idExists = existingIds.some(chat => chat._id === newChatId);  // Check if the new ID already exists

            const updatedIds = idExists ? existingIds : [...existingIds, { _id: newChatId[0] }]; // Append only if it doesn't exist

            return { ...state, loading: false, chat_ids: updatedIds, success: true, error: false };
        case GET_CHAT_IDS_ERROR: // Handle registration failure
            return { ...state, loading: false, success: false, error: action.payload };

        case GET_CHAT_IDS_RESET: // Handle registration failure
            return { chat_ids: {}, loading: false, success: false, error: false };

        case DELETE_CHAT_IDS_SUCCESS:
            const ids = state.chat_ids || [];
            const chatId = action.payload;

            console.log('chatId from action.payload delete:', chatId);

            const updatedDelIds = ids.filter(chat => {
                if (typeof chat === 'object' && chat._id !== undefined) { // Check if it's an object with an 'id'
                    return chat._id !== chatId;
                } else if (typeof chat === 'number' || typeof chat === 'string') { // Direct ID
                    return chat !== chatId;
                }
                return true;
            });

            return { ...state, loading: false, chat_ids: updatedDelIds, success: true, error: false };

        default:
            return state;
    }
};



export const tellAgentReducer = (state = { msg: [], loading: false, success: false, error: false }, action) => { 
    switch (action.type) {
        case TELL_AGENT_REQUEST:
            return { loading: true, success: false, error: false };
        case TELL_AGENT_SUCCESS:
            dispatch({
                type: GET_MSG_SUCCESS,
                payload: action.payload
            })
            return { ...state, loading: false, msg: action.payload, success: true, error: false };
        case TELL_AGENT_ERROR:
            return { ...state, loading: false, success: false, error: action.payload };
        case TELL_AGENT_RESET:
            return { msg: [], loading: false, success: false, error: false };
        default:
            return state;
    }
}