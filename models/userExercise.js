import mongoose from 'mongoose';

const { Schema } = mongoose;

const exerciseSchema = new Schema({
    _id: Schema.Types.ObjectId,
    username: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    description: String,
    duration: Number,
    date: String
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

export default Exercise;