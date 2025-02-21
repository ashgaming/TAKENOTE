const express = require('express')
const router = express.Router();
const imageController = require('../controllers/image.controller')
const authMiddleware = require('../middlewares/auth.middleware')
const multerMiddleware = require('../middlewares/file.middleware')


router.post('/upload',
  authMiddleware.authUser,
  multerMiddleware.upload.single('image'),
  imageController.uploadImage
);

module.exports = router;