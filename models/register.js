const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { Types: { ObjectId } } = Schema;

const registerSchema = new Schema({

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
    typeSleep: {
        type: [ObjectId],
        ref: 'sleep'
    },
    typeHeight: {
        type: [ObjectId],
        ref: 'height'
    },
    typeWeight: {
        type: [ObjectId],
        ref: 'weight'
    },
    typeFeed: {
        type: [ObjectId],
        ref: 'feed'
    }

})

const Register = mongoose.model('register', registerSchema);
module.exports = Register