const mongoose = require("mongoose");
require("dotenv").config();
const app = require('../index')
const { MONGODB_URL, MONGODB_URL_TEST, NODE_ENV, PORT } = process.env
const connectionString = NODE_ENV === 'test' ?
    MONGODB_URL_TEST :
    MONGODB_URL

const connectDB = async() => {
    try {
        await mongoose.connect(connectionString, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify: false,
            useCreateIndex: true,
        });
        console.log("connection  made");
    } catch (error) {
        console.log(error);
    }
};


module.exports = connectDB;