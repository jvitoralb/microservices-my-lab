import frontend from '../../config.js';
import { createShortURL, findMainURL, redirectMainURL } from './shortenerService.js';


export const getShortenerHome = (req, res) => {
    res.status(200).sendFile(`${frontend}/public/urlshortener.html`);
}

export const createSave = async (req, res, next) => {
    try {
        const savedShort = await createShortURL(req.body.url);
        res.status(201).json({
            original_url: savedShort.mainUrl,
            short_url: savedShort.shortUrlCode
        });
    } catch (err) {
        next(err)
    }
};

export const findMain = async (req, res, next) => {
    try {
        const dataFound = await findMainURL(req.body.url);
        res.status(200).json({
            original_url: dataFound.mainUrl,
            short_url: dataFound.shortUrlCode
        });
    } catch (err) {
        next(err)
    }
};

export const toMainURL = async (req, res, next) => {
    try {
        const mainURL = await redirectMainURL(req.params.shortID);
        res.status(301).redirect(mainURL);
    } catch (err) {
        next(err)
    }
};

const short = {
    getShortenerHome,
    createSave,
    findMain,
    toMainURL
}

export default short;