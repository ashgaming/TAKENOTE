const mongoose = require("mongoose");
const ora = require("ora");

async function connectToDB() {
    mongoose.set('debug', true);
   // console.log('Database URL:', process.env.DATABASE_URL);

    const spinner = ora('Connecting to MongoDB...\t').start(); // Start loader

    try {
        await mongoose.connect(process.env.DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        spinner.succeed('Connected to MongoDB ✅'); // Success message
    } catch (err) {
        spinner.fail('Failed to connect to MongoDB ❌'); // Error message
        console.error(err);
    }
}

module.exports = connectToDB;
