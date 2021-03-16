const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { Types: { ObjectId } } = Schema;



const FeedSchema = new Schema({
    register: {
        type: ObjectId,
        ref: 'register',

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

const Feed = mongoose.model('feed', FeedSchema);
module.exports = Feed