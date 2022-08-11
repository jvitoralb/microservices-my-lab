import * as dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

dotenv.config();
/**
 * Remember to add MONGO_URI to Heroku server!!!
**/
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const shortenerSchema = new mongoose.Schema({
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

export const createSave = (url, done) => {
    const num = parseInt(performance.now() * Math.random());

    const newShortURL = new Shortener({
        mainUrl: url,
        shortUrlCode: num
    });

    newShortURL.save((err, savedURLData) => {
        return err ? done(err) : done(null, savedURLData);
    });
}

export const findMainURL = (url, done) => {
    Shortener.find({mainUrl: url}, (err, result) => {
        return (!err && !result.length) ? done(true) : done(null, result);
    });
}

export const findShortURL = (shortURL) => {
    Shortener.find({shortUrlCode: shortURL}, (err, result) => {
        return err ? console.log(err) : console.log(result);
    });
}

export default Shortener;
