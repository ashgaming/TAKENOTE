const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//const blacklistTokenModel = require('../models/blacklistToken.model');

module.exports.authUser = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        
   //     const isBlacklisted = await blacklistTokenModel.findOne({ token });
        
        // if (isBlacklisted) {
        //     return res.status(401).json({ message: "Unauthorized" });
        // }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);

        req.user = user;
        next();
    }
    catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
}
/*
module.exports.authEmployes = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const isBlacklisted = await blacklistTokenModel.findOne({ token: token });

    if (isBlacklisted) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const emp = await employesModel.findById(decoded._id);

        req.employee = emp;

        return next();
    }
    catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
}

module.exports.authAdmin = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const isBlacklisted = await blacklistTokenModel.findOne({ token: token });

    if (isBlacklisted) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const emp = await employesModel.findById(decoded._id);


        if(emp.role === 'admin'){

            req.admin = emp;
            
            return next();
        }else{       
            res.status(401).json({ message: "Unauthorized" })
        }
    }
    catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
}

*/