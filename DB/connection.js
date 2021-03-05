const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async() => {
    await mongoose.connect(process.env.MONGODB_URL, { useUnifiedTopology: true, useNewUrlParser: true })
        .then(() => {
            console.log('connection  made');
        })
        .catch(error => console.log(error));


}
module.exports = connectDB;