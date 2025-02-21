const imageService = require('../services/functions.services')

module.exports.uploadImage = async (req, res, next) => {

    console.log('controller hit')

    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const imageUrl = await imageService.uploadImage({image:req.file.path});
    
    res.status(201).json({ image : imageUrl })
}