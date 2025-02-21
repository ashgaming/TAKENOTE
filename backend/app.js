require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const port = 4000;
const connectToDB = require('./db/index');
const cloudinary = require('cloudinary').v2;
const morgan = require('morgan');
const userRoutes = require('./routes/user.routes')
const msgRoutes = require('./routes/msg.routes')


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API,
    api_secret: process.env.CLOUDINARY_SECREATE
});

connectToDB();


app.use(morgan('dev'));
app.use(express.static('public'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.get('/', (req, res) => {
    res.send('server is running fine!');
});


app.use('/users', userRoutes);
app.use('/msgs', msgRoutes);



module.exports = app;
