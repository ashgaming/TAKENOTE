const mongoose = require('mongoose')


const messagesSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    msg:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:false
    },
    remindTime:{
        type:String,
        required:false
    }

},
{ timestamps:true})

const messagesModel = mongoose.model('user', userSchema);

module.exports = messagesModel;