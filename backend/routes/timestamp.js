import { Router } from 'express';
import frontend from '../config.js';


const timestamp = Router();

timestamp.get('/', (req, res) => {
    res.sendFile(`${frontend}/public/timestamp.html`);
});

timestamp.get('/api/', (req, res) => {
    const now = new Date();
    res.json({
        unix: now.getTime(),
        utc: now.toUTCString()
    });
});

timestamp.get('/api/:date?', (req, res) => {
    const dateReq = new Date(req.params.date);
    const dateReqUnix = dateReq.getTime();
    const unixReq = Number(req.params.date);

    if (dateReq.getDate()) {
        return res.json({
            unix: dateReqUnix,
            utc: dateReq.toUTCString()
        });
    }
    dateReq.setTime(unixReq);

    if (dateReq == 'Invalid Date') {
        return res.json({error: 'Invalid Date'});
    }
    res.json({
        unix: unixReq,
        utc: dateReq.toUTCString()
    });
});

export default timestamp;