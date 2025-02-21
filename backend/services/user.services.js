const userModel = require('../models/user.model');

module.exports.createUser = async ({firstname, email, password, lastname}) => {

    try{

        const hashedPassword = await userModel.hashedPassword(password);
        
        const user = await userModel.create({
            fullname:{
                firstname,
                lastname
            },
            email,
            password : hashedPassword
        });
        
        const token = user.generateAuthToken();
        
        return token
    }catch(error){
        throw new Error(error)
    }
}




