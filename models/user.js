import mongoose from 'mongoose';

const { Schema } = mongoose;

export const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    description: String,
    duration: Number,
    date: String,
    logs: [{
        type: Schema.Types.ObjectId,
        ref: 'Exercise'
    }]
});

const User = mongoose.model('User', userSchema);

export default User;