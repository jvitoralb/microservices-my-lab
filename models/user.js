import mongoose from 'mongoose';

const { Schema } = mongoose;

export const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    }
});

const User = mongoose.model('User', userSchema);

export default User;