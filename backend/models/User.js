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

export default User;