const msgService = require('../services/messages.services')
const imageService = require('../services/functions.services')
const { validationResult } = require('express-validator')

module.exports.registerMsg = async (req, res, next) => {
    try {
        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(400).json({ errors: error.array() })
        }

        const { msg , remindTime , chatId } = req.body;

        const file = req.file;

        const user = req.user._id;

        if (!file) {
         //   return res.status(400).json({ error: 'No file uploaded' });
        }

        const imageUrl = file ? await imageService.uploadImage({ image: req.file.path }) : null;

        const newMsg = await msgService.registerMsg({ user , msg , remindTime , image : imageUrl , chatId })

        res.status(201).json({ newMsg })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ errors: "Internal server error",messages:error.message });
    }
}

module.exports.sendMsg = async (req, res, next) => {
    try {
        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(400).json({ errors: error.array() })
        }

        const { msg , chatId } = req.body;

        const user = req.user._id;

        const newMsg = await msgService.sendMsg({ user , msg , chatId })

        res.status(201).json({ newMsg })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ errors: "Internal server error",messages:error.message });
    }
}

module.exports.getMsg = async (req, res, next) => {
    try {
        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(400).json({ errors: error.array() })
        }

        const { chatId } = req.query;

        const user = req.user._id;

        const getMsg = await msgService.getMsg({ user , chatId })

        res.status(201).json({ getMsg })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ errors: "Internal server error",messages:error.message });
    }
}

module.exports.deleteChat = async (req, res, next) => {
    try {
        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(400).json({ errors: error.array() })
        }

        const { chatId } = req.query;

        const user = req.user._id;

        const isMessageDeleted = await msgService.deleteChat({ user , chatId })

        res.status(201).json({ isMessageDeleted })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ errors: "Internal server error",messages:error.message });
    }
}

module.exports.getChatIds = async (req, res, next) => {
    try {
        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(400).json({ errors: error.array() })
        }

        const user = req.user._id;

        const ids = await msgService.getChatIds({ user })

        res.status(201).json({ ids })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ errors: "Internal server error",messages:error.message });
    }
}