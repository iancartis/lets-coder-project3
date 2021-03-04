const { Schema, model, isValidObjectId } = require('mongoose');
const { Types: { ObjectId } } = Schema;

const baby = new Schema({

    name: {
        type: String
    },

    age: {
        type: Number
    },
    parent: {
        type: ObjectId,
        ref: 'user',
        unique: true
    },
    weight: {
        type: Number
    },
    height: {
        type: Number
    },
    registers: [{
        type: ObjectId,
        ref: 'register',
        unique: true
    }]

})

module.exports = Baby = model('baby', baby);