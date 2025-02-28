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
const agentRoutes = require('./routes/agent.routes') 
const rateLimit = require('express-rate-limit');


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API,
    api_secret: process.env.CLOUDINARY_SECREATE
});

connectToDB();

const limiter = rateLimit({
    windowMs: 1000, // 1 second
    max: 10, // Limit each IP to 10 requests per windowMs
    message: "Too many requests, please try again later.", // Optional message
    // You can customize the key used to identify clients (e.g., ip, user id)
    keyGenerator: (req) => {
      return req.ip; // Default, rate limit based on IP address
      // return req.user?.id || req.ip; // Example: Rate limit based on user ID or IP if not logged in
    },
    // Store to use for persisting rate limit counts, defaults to in-memory store.
    // For production, use a persistent store like Redis or Memcached.
    store: undefined, // In-memory store (not recommended for production)
    // store: new RedisStore({ // Example using Redis
    //   client: redisClient,
    //   prefix: 'rl:'
    // }),
  });
  
  //  Apply the rate limiting middleware to all routes
  app.use(limiter);


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
app.use('/agents', agentRoutes)



module.exports = app;
