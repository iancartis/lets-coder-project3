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
    registerType: {
        type: String,
        default: "typeFeed"
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

const Feed = mongoose.model('feed', FeedSchema);
module.exports = Feed