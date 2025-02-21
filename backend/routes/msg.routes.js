const express = require('express')
const router = express.Router();
const { body , query } = require("express-validator")
const userController = require('../controllers/user.controller')
const authMiddleware = require('../middlewares/auth.middleware')


router.post('/set-reminder',[
   body('email').isEmail().withMessage('Invalid Email'),
   body('firstname').isLength({min:3}).withMessage('First name must be 3 character long'),
   body('lastname').isLength({min:3}).withMessage('Last name must be 3 character long'),
   body('password').isLength({min:8}).withMessage('Password must be 8 letter long')
],userController.registerUser)

router.post('/send',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:8}).withMessage('Password must be 8 letter long')
],userController.loginUser)

router.get('/get',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:8}).withMessage('Password must be 8 letter long')
],userController.loginUser)


router.delete('/delete',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:8}).withMessage('Password must be 8 letter long')
],userController.loginUser)












module.exports = router;