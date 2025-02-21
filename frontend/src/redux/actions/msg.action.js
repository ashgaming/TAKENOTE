import { DELETE_MSG_ERROR, DELETE_MSG_REQUEST, DELETE_MSG_RESET, DELETE_MSG_SUCCESS, DELETE_REMINDER_ERROR, DELETE_REMINDER_REQUEST, DELETE_REMINDER_RESET, DELETE_REMINDER_SUCCESS, GET_MSG_ERROR, GET_MSG_REQUEST, GET_MSG_RESET, GET_MSG_SUCCESS, GET_REMINDER_ERROR, GET_REMINDER_REQUEST, GET_REMINDER_RESET, GET_REMINDER_SUCCESS, REGISTER_REMINDER_ERROR, REGISTER_REMINDER_REQUEST, REGISTER_REMINDER_RESET, REGISTER_REMINDER_SUCCESS, SEND_MSG_ERROR, SEND_MSG_REQUEST, SEND_MSG_RESET, SEND_MSG_SUCCESS } from "../constants/msg.constants";
import { getUserSession } from "../methods/user.session";



export const createReminder = (fdata) => async (dispatch) => {

    try {


        dispatch({
            type: REGISTER_REMINDER_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.post(`${BACKEND_URL}/msg/login`,
            fdata,
            config)
            
       
        dispatch({
            type: LOGIN_USER_SUCCESS,
            payload: data
        })

        setUserSession(data)

        dispatch(getUserData())

       
    }
    catch (error) {
        dispatch({
            type: LOGIN_USER_ERROR,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })

        setTimeout(() => {
            dispatch({ type: LOGIN_USER_RESET });
          }, 5000);
    }
}

export const sendMsg = (fdata) => async (dispatch) => {

    try {


        dispatch({
            type: LOGIN_USER_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.post(`${BACKEND_URL}/users/login`,
            fdata,
            config)
            
       
        dispatch({
            type: LOGIN_USER_SUCCESS,
            payload: data
        })

        setUserSession(data)

        dispatch(getUserData())

       
    }
    catch (error) {
        dispatch({
            type: LOGIN_USER_ERROR,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })

        setTimeout(() => {
            dispatch({ type: LOGIN_USER_RESET });
          }, 5000);
    }
}

export const getMsg = () => async (dispatch) => {

    const token = localStorage.getItem('token') ? getUserSession().token : null;
    try {

        
        dispatch({
            type: DATA_USER_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `bearer ${token}`
            },
        }

        const { data } = await axios.get(`${BACKEND_URL}/users/profile`,config)


        const date = new Date()
        dispatch({
            type: DATA_USER_SUCCESS,
            payload: data
        })

    }
    catch (error) {
        dispatch({
            type: DATA_USER_ERROR,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })

        setTimeout(() => {
            dispatch({ type: DATA_USER_ERROR }); 
          }, 5000);
    }
}

export const deleteMsg = () => async (dispatch) => {

    const token = localStorage.getItem('token') ? getUserSession().token : null;
    try {

        
        dispatch({
            type: DATA_USER_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `bearer ${token}`
            },
        }

        const { data } = await axios.get(`${BACKEND_URL}/users/profile`,config)


        const date = new Date()
        dispatch({
            type: DATA_USER_SUCCESS,
            payload: data
        })

    }
    catch (error) {
        dispatch({
            type: DATA_USER_ERROR,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })

        setTimeout(() => {
            dispatch({ type: DATA_USER_ERROR }); 
          }, 5000);
    }
}
