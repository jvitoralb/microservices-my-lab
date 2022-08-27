import Shortener from '../models/Shortener.js';
import shortCode from '../utils/shortenerUtils.js';


export const createSave = async (req, res, next) => {
    
    const newShortURL = new Shortener({
        mainUrl: req.body.url,
        shortUrlCode: shortCode()
    });

    try {
        const savedShort = await newShortURL.save();
        res.status(201).json({
            original_url: savedShort.mainUrl,
            short_url: savedShort.shortUrlCode
        });
    } catch(err) {
        res.status(500).json({msg:err});
    }
}

export const findMainURL = async (req, res, next) => {
    try {
        const dataFound = await Shortener.find({mainUrl: req.body.url});
        if (!dataFound.length) {
            console.log(`URL ${req.body.url} not found`);
            return next();
        }
        res.status(200).json({
            original_url: dataFound[0].mainUrl,
            short_url: dataFound[0].shortUrlCode
        });
    } catch(err) {
        res.status(500).json({msg:err});
    }
}

export const toMainURL = async (req, res, next) => {
    const { shortID } = req.params;

    try {
        const shortURL = await Shortener.find({shortUrlCode: shortID});
        res.status(301).redirect(shortURL[0].mainUrl);
    } catch(err) {
        console.log(err);
        res.status(500).json({msg:err});
    }
}

const short = {
    createSave,
    findMainURL,
    toMainURL
}

export default short;