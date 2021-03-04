const { Schema, model, isValidObjectId } = require('mongoose');
const { Types: { ObjectId } } = Schema;
const Sleep = new Schema({

    Register: {
        type: ObjectId,
        ref: 'register',
        unique: true
    },
    Date: {
        type: Number
    },

    Value: {
        type: Number
    }
})

module.exports = sleep = model('sleep', Sleep);