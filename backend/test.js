

const mongoose = require('mongoose');
const ora = require("ora");

const uri = 'mongodb+srv://detroitash:Wtya7645@reminderagentcluster.pqqsa.mongodb.net/ReminderDB?retryWrites=true&w=majority'; // From Compass
//const uri = 'mongodb://detroitash:Wtya7645@reminderagentcluster-shard-00-00.pqqsa.mongodb.net:27017,reminderagentcluster-shard-00-01.pqqsa.mongodb.net:27017,reminderagentcluster-shard-00-02.pqqsa.mongodb.net:27017/ReminderDB?ssl=true&replicaSet=atlas-wy0qex-shard-0&retryWrites=true&w=majority'; // From Compass
console.log('Using URI:', uri);

mongoose.set('debug', true);

const spinner = ora('Connecting to MongoDB...').start(); // Start loader
mongoose.connect(uri, {
    serverSelectionTimeoutMS: 30000, // 30 seconds
  connectTimeoutMS: 30000, // 30 seconds
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB Atlas')
        spinner.succeed('Connected to MongoDB ✅');
    }
    )
    .catch(err => {
        spinner.fail('Failed to connect to MongoDB ❌')
        console.error('Connection error:', err)
    });


