const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { Types: { ObjectId } } = Schema;
const SleepSchema = new Schema({

    register: {
        type: ObjectId,
        ref: 'register',
        unique: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    registerType: {
        type: String,
        default: "typeSleep"
    },

    value: {
        type: Number
    },
    baby: {
        type: ObjectId,
        ref: 'baby'
    },
    comments: [{
        type: ObjectId,
        ref: 'comment',
        unique: true
    }]
})

const Sleep = mongoose.model('sleep', SleepSchema);
module.exports = Sleep