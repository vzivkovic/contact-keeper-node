const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
    await mongoose.connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
        .then(() => console.log('MongoDB Connected...'))
        .catch(error => {
            console.error(error);
            process.exit(1);
        });
}

module.exports = connectDB;