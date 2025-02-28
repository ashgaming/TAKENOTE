const express = require('express')
const router = express.Router();
const { body , query } = require("express-validator")
const agentController = require('../controllers/agent.controller')
const authMiddleware = require('../middlewares/auth.middleware')
const multerMiddleware = require('../middlewares/file.middleware')

router.post('/query',[
    body('text').isString().withMessage('Invalid MSG'),
    body('chatId').isString().optional().withMessage('Invalid Chat ID'),
], authMiddleware.authUser ,agentController.querySomethingToGemini)


router.post('/sendMsg',[
    body('text').isString().withMessage('Invalid MSG'),
    body('chatId').isString().optional().withMessage('Invalid Chat ID'),
], authMiddleware.authUser ,agentController.querySomethingToGemini_AGENT)



module.exports = router;