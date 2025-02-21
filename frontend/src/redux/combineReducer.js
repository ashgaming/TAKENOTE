import { combineReducers } from 'redux';
import { userDataReducer, userLoginReducer, userRegisterReducer } from './reducers/user.reducer';
import { deleteMsgReducer, deleteReminderReducer, getMsgReducer, getReminderReducer, registerReminderReducer, sendMsgReducer } from './reducers/msg.reducer';
import { SocketReducer } from './reducers/socket.reducer';


const rootReducer = combineReducers({
    UserLogin: userLoginReducer,
    UserRegister: userRegisterReducer,
    UserData: userDataReducer,

    RegisterReminder: registerReminderReducer,
    GetReminder: getReminderReducer,
    DeleteReminder: deleteReminderReducer,

    SendMsg: sendMsgReducer,
    GetMsg: getMsgReducer,
    DOMExceptioneleteMsg: deleteMsgReducer,
    SocketReducer:SocketReducer
    ,


});

export default rootReducer;