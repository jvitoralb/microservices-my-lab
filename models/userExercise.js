import mongoose from 'mongoose';

const { Schema } = mongoose;

const exerciseSchema = new Schema({
    username: 'have no idea',
    description: String,
    duration: Number,
    date: Date
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

export default Exercise;