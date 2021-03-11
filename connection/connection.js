const mongoose = require("mongoose");
require("dotenv").config();


const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
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