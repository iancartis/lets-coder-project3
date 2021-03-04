const { Schema, model, isValidObjectId } = require('mongoose');
const { Types: { ObjectId } } = Schema;
const Height = new Schema({
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

module.exports = height = model('height', Height);