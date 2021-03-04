const { Schema, model, isValidObjectId } = require('mongoose');
const { Types: { ObjectId } } = Schema;
const Feed = new Schema({
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

module.exports = feed = model('feed', Feed);