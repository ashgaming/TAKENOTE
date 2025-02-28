const express = require('express')
const router = express.Router();
const { body , query } = require("express-validator")
const msgController = require('../controllers/msg.controller')
const authMiddleware = require('../middlewares/auth.middleware')
const multerMiddleware = require('../middlewares/file.middleware')


router.post('/set-reminder',[
   body('msg').isString().withMessage('Invalid MSG'),
   body('remindTime').isLength({min:3}).optional().withMessage('Reminder time must be 3 character long'),
   body('image').isString({min:3}).optional().withMessage('Image not find must be 3 character long'),
   body('ChatId').isString({min:3}).optional().withMessage('Chat ID must be 3 character long'),
], multerMiddleware.upload.single('image') ,authMiddleware.authUser , msgController.registerMsg)

router.post('/send',[
    body('msg').isString().withMessage('Invalid MSG'),
], authMiddleware.authUser ,msgController.sendMsg)

router.get('/get',[
    query('chatId').isMongoId().withMessage('Invalid ChatId'),
],authMiddleware.authUser ,msgController.getMsg)


router.delete('/chat/delete',[
    query('chatId').isMongoId().withMessage('Invalid Email'),
],authMiddleware.authUser ,msgController.deleteChat)


router.get('/get-chat-ids',authMiddleware.authUser ,msgController.getChatIds)




module.exports = router;