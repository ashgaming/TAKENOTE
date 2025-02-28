const messagesModel = require('../models/messages.model');
const chatModel = require('../models/chat.model')

module.exports.registerMsg = async ({ user, msg, image, remindTime , chatId }) => {
    try {
        if (!msg) {
            throw new Error('Message text is required!'); // More descriptive error message
        }

        const newMessage = await messagesModel.create({ 
            user,
            msg,
            image: image || null, 
            remindTime: remindTime || null ,
            chatId : chatId || undefined 
        });

        return newMessage;

    } catch (err) {
        console.error("Error creating message:", err); // Log the error for debugging
        throw new Error(`Failed to create message: ${err.message}`); // More informative error message
    }
};

module.exports.sendMsg = async ({ user, msg, chatId }) => {
    try {
        if (!msg) {
            throw new Error('Message text is required!'); // More descriptive error message
        }

        const ChatID = chatId ? chatId : (await chatModel.create({ user }))._id;

        const newMessage = await messagesModel.create({ 
            user,
            msg,
            chatId : ChatID || undefined 
        });

        return newMessage;

    } catch (err) {
        console.error("Error creating message:", err); // Log the error for debugging
        throw new Error(`Failed to create message: ${err.message}`); // More informative error message
    }
};


module.exports.getMsg = async ({ user ,  chatId }) => {
    try {
        if (!chatId) {
            throw new Error('Message text is required!'); // More descriptive error message
        }

        const Message = await messagesModel.find({ 
            user,
            chatId : chatId 
        });

        return Message;

    } catch (err) {
        console.error("Error creating message:", err); // Log the error for debugging
        throw new Error(`Failed to create message: ${err.message}`); // More informative error message
    }
};


module.exports.deleteChat = async ({ user,  chatId }) => {
    try {
        if (!chatId) {
            throw new Error('Chat id is required!'); // More descriptive error message
        }

        const isMessageDeleted = await messagesModel.deleteMany({ 
            user,
            chatId : chatId 
        });

        isMessageDeleted.acknowledged && await chatModel.deleteOne({ _id: chatId });

        return isMessageDeleted;

    } catch (err) {
        console.error("Error creating message:", err); // Log the error for debugging
        throw new Error(`Failed to create message: ${err.message}`); // More informative error message
    }
};

module.exports.getChatIds = async ({ user ,  chatId }) => {
    try {

        const ids = await chatModel.find({ user }).select('_id');

        return ids;

    } catch (err) {
        console.error("Error creating message:", err); // Log the error for debugging
        throw new Error(`Failed to create message: ${err.message}`); // More informative error message
    }
};
