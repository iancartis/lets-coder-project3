const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { Types: { ObjectId } } = Schema;

const WeightSchema = new Schema({
    register: {
        type: ObjectId,
        ref: 'register',
        unique: true
    },
    date: {
        type: Date,
        default: Date.now()
    },

    value: {
        type: Number
    }
})

const Weight = mongoose.model('weight', WeightSchema);
module.exports = Weight