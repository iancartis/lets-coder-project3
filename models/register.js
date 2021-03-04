const { Schema, model, isValidObjectId } = require('mongoose');
const { Types: { ObjectId } } = Schema

const register = new Schema({

    parent: {
        type: ObjectId,
        ref: 'user'
    },
    baby: {
        type: ObjectId,
        ref: 'baby'
    },
    date: {
        type: Date,
        default: Date.now
    },
    type: {
        type: String
    }

})

module.exports = Register = model('register', register);