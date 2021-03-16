const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { Types: { ObjectId } } = Schema;

const babySchema = new Schema({

    name: {
        type: String
    },

    age: {
        type: Number
    },
    parent: {
        type: ObjectId,
        ref: 'user',
        unique: true,
        default: ""
    },
    weight: {
        type: Number
    },
    height: {
        type: Number
    },
    registers: {
        type: ObjectId,
        ref: 'register',
        unique: true
    }

})

const Baby = mongoose.model('baby', babySchema);
module.exports = Baby