import { Router } from 'express';
import frontend from '../config.js';
import short from '../controllers/shortener.js';
import validHostname from '../middleware/shortener.js';


const shortener = Router();

shortener.get('/', (req, res) => {
    res.sendFile(`${frontend}/public/urlshortener.html`);
});

shortener.post('/api/shorturl', validHostname, (req, res, next) => {
    short.createSave(req, res, next);
});

shortener.get('/api/shorturl/:shortID', (req, res, next) => {
    short.toMainURL(req, res, next);
});

export default shortener;