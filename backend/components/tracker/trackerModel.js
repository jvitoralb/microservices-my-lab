import mongoose from 'mongoose';


const { Schema } = mongoose;

export const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: false
    },
    description: String,
    duration: Number,
    log: [{
        type: Schema.Types.ObjectId,
        ref: 'Exercise'
    }]
});

const User = mongoose.model('User', userSchema);

const exerciseSchema = new Schema({
    _id: Schema.Types.ObjectId,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    description: String,
    duration: Number,
    date: String
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

export { Exercise, User };