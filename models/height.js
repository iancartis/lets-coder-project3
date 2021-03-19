const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { Types: { ObjectId } } = Schema;



const HeightSchema = new Schema({
    register: {
        type: ObjectId,
        ref: 'register',

    },
    date: {
        type: Date,
        default: Date.now()
    },
    registerType: {
        type: String,
        default: "typeHeight"
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

    }]
})

const Height = mongoose.model('height', HeightSchema);
module.exports = Height