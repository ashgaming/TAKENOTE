import axios from "axios";
import { DELETE_CHAT_IDS_SUCCESS, DELETE_MSG_ERROR, DELETE_MSG_REQUEST, DELETE_MSG_RESET, DELETE_MSG_SUCCESS, DELETE_REMINDER_ERROR, DELETE_REMINDER_REQUEST, DELETE_REMINDER_RESET, DELETE_REMINDER_SUCCESS, GET_CHAT_IDS_ERROR, GET_CHAT_IDS_REQUEST, GET_CHAT_IDS_RESET, GET_CHAT_IDS_SUCCESS, GET_MSG_ERROR, GET_MSG_REQUEST, GET_MSG_RESET, GET_MSG_SUCCESS, GET_REMINDER_ERROR, GET_REMINDER_REQUEST, GET_REMINDER_RESET, GET_REMINDER_SUCCESS, INSERT_CHAT_IDS_SUCCESS, REGISTER_REMINDER_ERROR, REGISTER_REMINDER_REQUEST, REGISTER_REMINDER_RESET, REGISTER_REMINDER_SUCCESS, SEND_MSG_ERROR, SEND_MSG_REQUEST, SEND_MSG_RESET, SEND_MSG_SUCCESS } from "../constants/msg.constants";
import { getUserSession, setUserSession } from "../methods/user.session";
import { BACKEND_URL } from "./user.action";
import { setChatSession } from "../methods/chat.session";




export const createReminder = (fdata) => async (dispatch) => {
    const token = localStorage.getItem('token') ? getUserSession().token : null;
    try {


        dispatch({
            type: REGISTER_REMINDER_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json',
                "Authorization": `bearer ${token}`
            }
        }

        const { data } = await axios.post(`${BACKEND_URL}/msgs/set-reminder`,
            fdata,
            config)


        dispatch({
            type: REGISTER_REMINDER_SUCCESS,
            payload: data
        })

        setUserSession(data)

        dispatch(getUserData())


    }
    catch (error) {
        dispatch({
            type: REGISTER_REMINDER_ERROR,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })

        setTimeout(() => {
            dispatch({ type: REGISTER_REMINDER_RESET });
        }, 5000);
    }
}

export const sendMsg = (fdata, setMessages,setChatId) => async (dispatch) => {
    const token = localStorage.getItem('token') ? getUserSession().token : null;
    try {

      //  setChatSession(fdata.chatId, fdata)
      console.log(fdata)

        dispatch({
            type: SEND_MSG_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json',
                "Authorization": `bearer ${token}`
            },
        }

        const { data } = await axios.post(`${BACKEND_URL}/agents/sendMsg`,
            fdata,
            config)

        console.log(fdata)

        const chatId = fdata?.chatId ?? (() => {
            setChatId(data.newMsg.chatId);
            return [data.newMsg.chatId];
          })();

        // setChatSession(chatId, {
        //     newMsg: {
        //         msg: data.newMsg.msg,
        //         timestamp: new Date().toISOString(),
        //         type: 'ai',
        //         chatId: chatId,
        //         _id: data.newMsg._id
        //     }
        // })
        
        setChatSession(chatId, data)
        
        if(!fdata?.chatId){
            dispatch({type:INSERT_CHAT_IDS_SUCCESS,
                payload: chatId
            })
        }

        setMessages(prev => [...prev, {
            type: 'ai',
            text: data.newMsg?.msg,
            timestamp: new Date().toISOString()
        }]);

        dispatch({
            type: SEND_MSG_SUCCESS,
            payload: data
        })

    }
    catch (error) {
        dispatch({
            type: SEND_MSG_ERROR,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })

        console.log(error)

        setTimeout(() => {
            dispatch({ type: SEND_MSG_RESET });
        }, 5000);
    }
}

export const getMsg = (chatId) => async (dispatch) => {
    const token = localStorage.getItem('token') ? getUserSession().token : null;
    try {


        dispatch({
            type: GET_MSG_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `bearer ${token}`
            },
            params: {
                chatId: chatId
            }
        }

        const { data } = await axios.get(`${BACKEND_URL}/msgs/get`, config)

        dispatch({
            type: GET_MSG_SUCCESS,
            payload: data
        })

    }
    catch (error) {
        dispatch({
            type: GET_MSG_ERROR,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })

        setTimeout(() => {
            dispatch({ type: GET_MSG_RESET });
        }, 5000);
    }
}

export const deleteMsg = (chatId , setChatId) => async (dispatch) => {

    const token = localStorage.getItem('token') ? getUserSession().token : null;
    try {


        dispatch({
            type: DELETE_MSG_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `bearer ${token}`
            },
            params: {
                chatId: chatId
            }
        }

        const { data } = await axios.delete(`${BACKEND_URL}/msgs/chat/delete`, config)


        dispatch({
            type: DELETE_CHAT_IDS_SUCCESS,
            payload: chatId
        })

        setChatId(null)

        localStorage.removeItem(`chat_${chatId}`)
        if(
            localStorage.getItem(`last_active_chat`) === chatId
        ){
            localStorage.removeItem(`last_active_chat`)
        }

        dispatch({
            type: DELETE_MSG_SUCCESS,
            payload: data
        })

        

    }
    catch (error) {
        dispatch({
            type: DELETE_MSG_ERROR,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })

        setTimeout(() => {
            dispatch({ type: DELETE_MSG_RESET });
        }, 5000);
    }
}

export const getChatIds = () => async (dispatch) => {

    const token = localStorage.getItem('token') ? getUserSession().token : null;
    try {


        dispatch({
            type: GET_CHAT_IDS_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `bearer ${token}`
            },
        }

        const { data } = await axios.get(`${BACKEND_URL}/msgs/get-chat-ids`, config)

        dispatch({
            type: GET_CHAT_IDS_SUCCESS,
            payload: data.ids
        })

    }
    catch (error) {
        dispatch({
            type: GET_CHAT_IDS_ERROR,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })

        setTimeout(() => {
            dispatch({ type: GET_CHAT_IDS_RESET });
        }, 5000);
    }
}


