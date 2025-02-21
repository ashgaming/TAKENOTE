const cloudinary = require('cloudinary').v2;
const fs = require('fs')

module.exports.uploadImage = async ({
    image
}) => {
    console.log('service hit')

    try {
        if (!image) {
            throw new Error('image are required');
        }

        const result = await cloudinary.uploader.upload(image, {
            resource_type:'auto',
            folder: 'EmpProfile'
        });

        return result.secure_url;
    }

    catch (err) {
        fs.unlinkSync(image)
        console.log(err.message)
        throw new Error('Error uploading image: ' + err.message);
    }
}