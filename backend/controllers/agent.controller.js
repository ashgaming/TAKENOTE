const agentService = require('../services/agent.services')
const imageService = require('../services/functions.services')
const { validationResult } = require('express-validator')

module.exports.querySomethingToGemini = async (req, res, next) => {
    try {
        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(400).json({ errors: error.array() })
        }

        const { text, chatId } = req.body;

        const user = req.user._id;

        const newMsg = await agentService.querySomethingToGemini({ text, user, chatId })

        res.status(201).json({ newMsg })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ errors: "Internal server error", messages: error.message });
    }
}


module.exports.querySomethingToGemini_AGENT = async (req, res, next) => {
    try {
        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(400).json({ errors: error.array() })
        }

        const { text } = req.body;

        const user = req.user._id;

        const file = req.file;

        const imageUrl = file ? await imageService.uploadImage({ image: req.file.path }) : null;

        const newMsg = await agentService.querySomethingToGemini_AGENT({ text, chatId: null, user, image : imageUrl })

        res.status(201).json({ newMsg })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ errors: "Internal server error", messages: error.message });
    }
}

