import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const exerciseSchema = new Schema({
    username: 'have no idea',
    description: String,
    duration: Number,
    date: Date
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

export default Exercise;