const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { Types: { ObjectId } } = Schema;
const commentSchema = new Schema({
    userId: {
        type: ObjectId,
        ref: 'user',

    },
    date: {
        type: Date,
        default: Date.now()
    },

    value: {
        type: String
    },
    babyId: {
        type: ObjectId,
        ref: 'baby',

    }


})


// },



const Comment = mongoose.model('comment', commentSchema);
module.exports = Comment