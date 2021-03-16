const { isEmail } = require('validator');
const Bcrypt = require("bcryptjs");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { Types: { ObjectId } } = Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        //recorta el valor del usuario en el caso que éste añada espacions
        trim: true,
        require: true,
    },
    surName: {
        type: String,
        trim: true,
        require: true,
    },
    age: {
        type: Number,
        require: true,
    },
    email: {
        type: String,
        require: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: isEmail,
            message: 'invalid email'

        },
        unique: true

    },
    password: {
        type: String,
        require: true,
        minlength: 8,
        require: true,
    }


})


userSchema.pre('save', function(next) {
    this.password = Bcrypt.hashSync(this.password, 10); // Replace with encrypted password
    next();
})




const User = mongoose.model('user', userSchema);
module.exports = User