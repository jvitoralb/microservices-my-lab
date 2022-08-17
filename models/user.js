import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    }
});

const User = mongoose.model('User', userSchema);

export default User;