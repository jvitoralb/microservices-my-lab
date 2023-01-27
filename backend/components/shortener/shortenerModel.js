import mongoose from 'mongoose';

const { Schema } = mongoose;

const shortenerSchema = new Schema({
    mainUrl: {
        type: String,
        required: true,
        unique: true
    },
    shortUrlCode: {
        type: String,
        required: true,
        unique: true
    }
});

const Shortener = mongoose.model('Shortener', shortenerSchema);

export default Shortener;