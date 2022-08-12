import express from 'express';
import cors from 'cors';
import dns from 'node:dns';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import Shortener, { createSave, findMainURL, findShortURL } from './shortenerApp.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`);
});

/**
 *  Timestamp API project
**/

app.get('/timestamp', (req, res) => {
    res.sendFile(`${__dirname}/public/timestamp.html`);
});

app.get('/timestamp/api/', (req, res) => {
    const now = new Date();
    res.json({
        unix: now.getTime(),
        utc: now.toUTCString()
    });
});

app.use('/timestamp/api/:date?', (req, res, next) => {
    const isValidReq = new Date(req.params.date);
    const unixReq = Number(req.params.date);
    const newDateTime = new Date();

    if (!isValidReq.getDate()) {
        newDateTime.setTime(unixReq);

        return newDateTime.toUTCString() !== 'Invalid Date' ? 
        res.json({unix: unixReq, utc: newDateTime.toUTCString()}) :
        res.json({error: 'Invalid Date'});
    }
    next();
});

app.get('/timestamp/api/:date?', (req, res) => {
    const dateReq = new Date(req.params.date);
    const unixTimestamp = dateReq.getTime();
    res.json({
        unix: unixTimestamp,
        utc: dateReq.toUTCString()
    });
});

/**
 *  Request header parser API project
**/

app.get('/req-header-parser', (req, res) => {
    res.sendFile(`${__dirname}/public/reqheader.html`);
});

app.get('/req-header-parser/api/whoami', (req, res) => {
    res.json({
        ipaddress: req.ip,
        language: req.acceptsLanguages().join(','),
        software: req.headers['user-agent']
    });
});

/**
 *  URL Shortener 
**/
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/url-shortener', (req, res) => {
   res.sendFile(`${__dirname}/public/urlshortener.html`);
});

/**
 * fix get /api/shorturl, maybe add a malware func
**/

app.use('/url-shortener/api/shorturl', (req, res, next) => {
    // console.log('middleware', req.method, req.body, req.path)
    if (!req.body.url && req.method === 'POST') {
        return res.json({error: 'invalid url'});
    } else if (!req.body.url && req.path === '/') {
        return  res.status(404).send('Not found');
    }
    next();
});

app.post('/url-shortener/api/shorturl', (req, res, next) => {
    // let regExp = /(h|f)(t)+p(s)*:(\/)+/;
    let regExp = /(www)*[.]*\w+[.]\w+/g;
    let urlToCheck = req.body.url;
    console.log(req.body, urlToCheck)
    if (urlToCheck.match(regExp)) {
        urlToCheck = urlToCheck.match(regExp)[0]
    }
    console.log(req.body, urlToCheck)
    dns.lookup(urlToCheck, (err) => {
        console.log('checking dns')
        if (err) {
            return res.json({error: 'invalid url'});
        }
        next();
    });
}, (req, res, next) => {
    const getShortedurl = () => {
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
            return err.code === 11000 ? getShortedurl() : next(err);
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

app.get('/url-shortener/api/shorturl/:shortID', (req, res, next) => {
    if (!Number(req.params.shortID)) {
        return res.json({error: 'must be a number'});
    }
    findShortURL(req.params.shortID, (err, response) => {
        if (err) return next(err);
        res.redirect(response[0].mainUrl);
    });
});

const listener = app.listen(PORT, () => {
    console.log(`Server has started on port ${listener.address().port}`);
});