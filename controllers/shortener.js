import Shortener from '../models/Shortener.js';


export const createSave = (req, res, next) => {
    const num = parseInt(performance.now() * Math.random());

    const newShortURL = new Shortener({
        mainUrl: `https://${req.body.url}`,
        shortUrlCode: num
    });

    newShortURL.save((err, savedURLData) => {
        if (err) {
            if (err.code === 11000) {
                return Shortener.find({mainUrl: req.body.url}, (err, result) => {
                    if (err) {
                        return console.log('err', err);
                    }
                    res.json({
                        original_url: result[0].mainUrl,
                        // original_url: `https://${result[0].mainUrl}`,
                        short_url: result[0].shortUrlCode
                    });
                });
            }
            return next(err);
        }
        console.log("res", {
            original_url: savedURLData.mainUrl,
            short_url: savedURLData.shortUrlCode
        })
        res.json({
            original_url: savedURLData.mainUrl,
            // original_url: `https://${savedURLData.mainUrl}`,
            short_url: savedURLData.shortUrlCode
        });
    });
}

export const findMainURL = (url, done) => {
    Shortener.find({mainUrl: url}, (err, result) => {
        return (!err && !result.length) ? done(true) : done(null, result);
    });
}

export const findShortURL = (req, res, next) => {
    const { shortID } = req.params;

    Shortener.find({shortUrlCode: shortID}, (err, result) => {
        if (err) {
            res.json({ error: 'invalid shortID' })
            return next();
        }
        res.redirect(`https://${result[0].mainUrl}`);
    });
}

const short = {
    createSave,
    findMainURL,
    findShortURL
}

export default short;