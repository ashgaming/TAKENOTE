import { DELETE_MSG_ERROR, DELETE_MSG_REQUEST, DELETE_MSG_RESET, DELETE_MSG_SUCCESS, DELETE_REMINDER_ERROR, DELETE_REMINDER_REQUEST, DELETE_REMINDER_RESET, DELETE_REMINDER_SUCCESS, GET_MSG_ERROR, GET_MSG_REQUEST, GET_MSG_RESET, GET_MSG_SUCCESS, GET_REMINDER_ERROR, GET_REMINDER_REQUEST, GET_REMINDER_RESET, GET_REMINDER_SUCCESS, REGISTER_REMINDER_ERROR, REGISTER_REMINDER_REQUEST, REGISTER_REMINDER_RESET, REGISTER_REMINDER_SUCCESS, SEND_MSG_ERROR, SEND_MSG_REQUEST, SEND_MSG_RESET, SEND_MSG_SUCCESS } from "../constants/msg.constants";



export const registerReminderReducer = (state = {
    reminder : {} , loading: false, success: false, error: false
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
    reminder : [] , loading: false, success: false, error: false
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
                reminder : [] , loading: false, success: false, error: false
            };
        default:
            return state;
    }
};


export const deleteReminderReducer = ( state =  { loading: false, success: false, error: false } , action ) => {
    switch (action.type) {
        case DELETE_REMINDER_REQUEST:
            return { loading: true, success: false, error: false };
        case DELETE_REMINDER_SUCCESS:
            return { ...state, loading: false , success: true, error: false };
        case DELETE_REMINDER_ERROR:
            return { ...state, loading: false, success: false, error: action.payload };
        case DELETE_REMINDER_RESET:
            return { ...state, loading: false, success: false, error: false };
        default:
            return state;
    }
};

export const sendMsgReducer = (state =  { msg : [] , loading: false, success: false, error: false }, action) => {
    switch (action.type) {
        case SEND_MSG_REQUEST:
            return { loading: true, success: false, error: false };
        case SEND_MSG_SUCCESS:
            return { ...state, loading: false, msg: action.payload, success: true, error: false };
        case SEND_MSG_ERROR:
            return { ...state, loading: false, success: false, error: action.payload };
        case SEND_MSG_RESET:
            return {  msg : [] , loading: false, success: false, error: false  };
        default:
            return state;
    }
};


export const getMsgReducer = (state =  { msg : [] , loading: false, success: false, error: false }, action) => {
    switch (action.type) {
        case GET_MSG_REQUEST:
            return { loading: true, success: false, error: false };
        case GET_MSG_SUCCESS: // Handle successful registration
            return { ...state, loading: false, msg: action.payload.token, success: true, error: false };
        case GET_MSG_ERROR: // Handle registration failure
            return { ...state, loading: false, success: false, error: action.payload };
        case GET_MSG_RESET: // Handle registration failure
            return {  msg : {} , loading: false, success: false, error: false  };
        default:
            return state;
    }
};


export const deleteMsgReducer = ( state =  { msg : [] , loading: false, success: false, error: false } , action ) => {
    switch (action.type) {
        case DELETE_MSG_REQUEST:
            return { loading: true, success: false, error: false };
        case DELETE_MSG_SUCCESS:
            return { ...state, loading: false, user: action.payload , success: true, error: false };
        case DELETE_MSG_ERROR:
            return { ...state, loading: false, success: false, error: action.payload };
        case DELETE_MSG_RESET:
            return { ...state, msg : [] , loading: false, success: false, error: false };
        default:
            return state;
    }
};