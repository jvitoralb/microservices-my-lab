import Shortener from '../models/Shortener.js';


const shortCode = () => {
    let str = (Math.random() * performance.now()).toString(36).substring(4, 7);
    let ing = (Math.random() * performance.now()).toString(36).substring(4, 7);
    return `${str}${ing}`;
}

export const createSave = async (req, res, next) => {
    
    const newShortURL = new Shortener({
        mainUrl: req.body.url,
        shortUrlCode: shortCode()
    });

    try {
        const savedShort = await newShortURL.save();
        res.json({
            original_url: savedShort.mainUrl,
            short_url: savedShort.shortUrlCode
        });
    } catch(err) {
        next(err);
    }
}

export const findMainURL = async (req, res, next) => {
    try {
        const dataFound = await Shortener.find({mainUrl: req.body.url});
        if (!dataFound.length) {
            console.log(`URL ${req.body.url} not found`)
            return next();
        }
        res.json({
            original_url: dataFound[0].mainUrl,
            short_url: dataFound[0].shortUrlCode
        });
    } catch(err) {
        next(err);
    }
}

export const toMainURL = async (req, res, next) => {
    const { shortID } = req.params;

    try {
        const shortURL = await Shortener.find({shortUrlCode: shortID});
        res.redirect(shortURL[0].mainUrl);
    } catch(err) {
        console.log(err);
        next(err);
    }
}

const short = {
    createSave,
    findMainURL,
    toMainURL
}

export default short;