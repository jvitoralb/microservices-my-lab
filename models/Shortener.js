import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const shortenerSchema = new Schema({
    mainUrl: {
        type: String,
        required: true,
        unique: true
    },
    shortUrlCode: {
        type: Number,
        required: true,
        unique: true
    }
});

const Shortener = mongoose.model('Shortener', shortenerSchema);

export default Shortener;