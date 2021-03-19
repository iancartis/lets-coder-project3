const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { Types: { ObjectId } } = Schema;

const WeightSchema = new Schema({
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
        default: "typeWeight"
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

const Weight = mongoose.model('weight', WeightSchema);
module.exports = Weight