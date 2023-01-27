import Shortener from './shortenerModel.js';
import CustomError from '../../errors/custom.js';
import shortCode from './shortenerUtils.js';


export const createShortURL = async (mainURL) => {
    const newShortURL = new Shortener({
        mainURL,
        shortUrlCode: shortCode()
    });
    return await newShortURL.save();
}

export const findMainURL = async (url) => {
    const dataFound = await Shortener.find({ mainUrl: url });

    if (!dataFound.length) {
        throw new CustomError(`Could not find ${url}`, 400);
    }

    return dataFound[0];
}

export const redirectMainURL = async (shortUrlCode) => {
    const shortURL = await Shortener.find({ shortUrlCode });

    if (!shortURL.length) {
        throw new CustomError(`${shortUrlCode} Short URL does not exist!`, 400);
    }

    return shortURL[0].mainUrl;
}