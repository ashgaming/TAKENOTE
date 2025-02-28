const mongoose = require('mongoose')


const messagesSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    chatId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'chat',
        validate: {
            validator: (v) => mongoose.Types.ObjectId.isValid(v),
            message: 'Invalid chatId format'
        }
    },
    msg: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    remindTime: {
        type: String,
        required: false
    }

},
    { timestamps: true })

const messagesModel = mongoose.model('msg', messagesSchema);

module.exports = messagesModel;