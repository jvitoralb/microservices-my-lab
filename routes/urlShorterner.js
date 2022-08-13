import { Router } from 'express';
import dns from 'node:dns';
import __dirname from '../config.js'
import Shortener, { createSave, findMainURL, findShortURL } from '../shortenerApp.js';

const shorternerRouter = Router();

shorternerRouter.get('/', (req, res) => {
    res.sendFile(`${__dirname}/frontend/public/urlshortener.html`);
});

shorternerRouter.use('/api/shorturl', (req, res, next) => {
    const regExp = /(h|f)[tps]+/g;

    if (!req.body.url) {
        if (req.path === '/') {
            return res.status(404).send('Not found');
        }
        req.body.url = 'undefined';
    }
    if (!req.body.url.match(regExp)) {
        req.body.url = `https://${req.body.url}`;
    }
    next();
});

shorternerRouter.post('/api/shorturl', (req, res, next) => {
    const regExp = /[www.]*(\w+|[-\w-]*[.\w]*)[.]\w+/g;
    let urlToCheck = req.body.url;

    if (urlToCheck.match(regExp)) {
        urlToCheck = urlToCheck.match(regExp).join('');
    }
    dns.lookup(urlToCheck, (err) => {
        if (err) {
            return res.json({ error: 'invalid url' });
        }
        next();
    });
}, (req, res, next) => {
    const getShortedurl = (strErr) => {
        console.log(strErr);
        findMainURL(req.body.url, (err, short) => {
            if (err) return next(err);
            res.json({
                original_url: short[0].mainUrl,
                short_url: short[0].shortUrlCode
            });
        });
    }
    createSave(req.body.url, (err, savedData) => {
        if (err) {
            return err.code === 11000 ? getShortedurl('E11000 duplicate key') : next(err);
        }
        Shortener.findById(savedData._id, (err, short) => {
            if (err) return next(err);
            res.json({
                original_url: short.mainUrl,
                short_url: short.shortUrlCode
            });
        });
    });
});

shorternerRouter.get('/api/shorturl/:shortID', (req, res, next) => {
    if (!Number(req.params.shortID)) {
        return res.json({ error: 'must be a number' });
    }
    findShortURL(req.params.shortID, (err, response) => {
        if (err) return next(err);
        res.redirect(response[0].mainUrl);
    });
});

export default shorternerRouter;