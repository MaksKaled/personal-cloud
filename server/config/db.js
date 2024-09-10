const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/personal-cloud')
        console.log('MongoDB is connected')
    } catch (error) {
        console.error(err.message);
        process.exit(1)
    }
}

module.exports = connectDB;