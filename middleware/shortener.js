import dns from 'node:dns';
import { findMainURL } from '../controllers/shortener.js';
import CustomError from '../errors/custom.js';


export const validHostname = (req, res, next) => {
    const hostRegExp = /[www.]*(\w+|[-\w-]*[.\w]*)[.]\w+/g;
    const regExp = /(h|f)[tps]+/g;
    let hostToCheck = req.body.url;

    if (!req.body.url) {
        throw new CustomError('Something is missing!', 404);
    }

    if (!req.body.url.match(regExp)) {
        req.body.url = `https://${req.body.url}`;
    }

    if (hostToCheck.match(hostRegExp)) {
        hostToCheck = hostToCheck.match(hostRegExp).join('');
    }

    dns.lookup(hostToCheck, (err) => {
        if (err) {
            return res.json({ error: 'invalid url' });
        }
        return findMainURL(req, res, next);
    });
}

export default validHostname;