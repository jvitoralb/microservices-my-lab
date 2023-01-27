import { Router } from 'express';
import short from './shortenerController.js';
import validHostname from './shortenerMiddleware.js';


const shortenerV2 = Router();

shortenerV2.get('/', short.getShortenerHome);
shortenerV2.post('/api/shorturl', validHostname, short.createSave);
shortenerV2.get('/api/shorturl/:shortID', short.toMainURL);

export default shortenerV2;