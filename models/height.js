const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { Types: { ObjectId } } = Schema;



const HeightSchema = new Schema({
    register: {
        type: ObjectId,
        ref: 'register',
        unique: true
    },
    date: {
        type: Date,
        default: Date.now()
    },

    value: {
        type: Number
    },
    baby: {
        type: ObjectId,
        ref: 'baby'

    },
    comment: {
        type: ObjectId,
        ref: 'comment',
        unique: true
    }
})

const Height = mongoose.model('height', HeightSchema);
module.exports = Height