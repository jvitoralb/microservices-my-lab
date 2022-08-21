import Shortener from '../models/Shortener.js';

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

export const findShortURL = (shortURL, done) => {
    Shortener.find({shortUrlCode: shortURL}, (err, result) => {
        return err ? done(err) : done(null, result);
    });
}

const short = {
    createSave,
    findMainURL,
    findShortURL
}

export default short;