const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { Types: { ObjectId } } = Schema;
const commentSchema = new Schema({
    userId: {
        type: ObjectId,
        ref: 'user',
        unique: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    registerId: {
        type: ObjectId,
        ref: 'register',
        unique: true,

    },
    value: {
        type: String
    },
    babyId: {
        type: ObjectId,
        ref: 'baby',
        unique: true
    },
    registerType: {
        type: String,
        enum: ['sleep', 'feed', 'weight', 'height'],
        required: true

    }

})


// },



const Comment = mongoose.model('comment', commentSchema);
module.exports = Comment