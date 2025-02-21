const mongoose = require('mongoose');

function connectToDB() {
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('Connected to DB');
    }).catch(err => console.log(`DB failed to connect` , err));
    return
}

module.exports = connectToDB;