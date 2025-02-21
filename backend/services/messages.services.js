const messagesModel = require('../models/messages.model');

module.exports.createMsg = async ({ user, msg, image, remindTime }) => {
    try {
        if (!msg) {
            throw new Error('Message text is required!'); // More descriptive error message
        }

        const newMessage = await messagesModel.create({ 
            user,
            msg,
            image: image || null, 
            remindTime: remindTime || null 
        });

        return newMessage;

    } catch (err) {
        console.error("Error creating message:", err); // Log the error for debugging
        throw new Error(`Failed to create message: ${err.message}`); // More informative error message
    }
};