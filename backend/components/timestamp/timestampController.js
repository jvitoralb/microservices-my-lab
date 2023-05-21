import frontend from '../../config.js';
import { timestampNow, customTimestamp } from './timestampService.js';


export const getHome = (req, res, next) => {
    res.status(200).sendFile(`${frontend}/public/timestamp.html`);
}

export const getTimestampNow = (req, res, next) => {
    const answer = timestampNow();
    res.status(200).json(answer);
}

export const getCustomTimestamp = (req, res, next) => {
    const answer = customTimestamp(req.params.date);
    res.status(200).json(answer);
}