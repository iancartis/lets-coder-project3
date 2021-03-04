const mongoose = require('mongoose');
require('dotenv').config();
// const URI = "mongodb+srv://admin:TSbLnXczZYnsC0D6@cluster0.ytt0s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const connectDB = async() => {
    await mongoose.connect(process.env.MONGODB_URL, { useUnifiedTopology: true, useNewUrlParser: true })
        .then(() => {
            console.log('connection  made');
        })
        .catch(error => console.log(error));


}
module.exports = connectDB;