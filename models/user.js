const { isEmail } = require('validator');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    firstName: {
        type: String,
        //recorta el valor del usuario en el caso que éste añada espacions
        trim: true
    },
    surName: {
        type: String,
        trim: true
    },
    age: {
        type: Number
    },
    email: {
        type: String,
        require: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: isEmail,
            message: 'invalid email'

        }

    },
    password: {
        type: String,
        require: true,
        minlength: 8,
    }
})


// },
// baby: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Baby'
// }



const User = mongoose.model('user', userSchema);
module.exports = User