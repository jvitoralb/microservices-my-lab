import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`);
});

app.get('/api/', (req, res) => {
    const now = new Date();
    res.json({
        unix: now.getTime(),
        utc: now.toUTCString()
    });
});

app.use('/api/:date?', (req, res, next) => {
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

app.get('/api/:date?', (req, res) => {
    const dateReq = new Date(req.params.date);
    const unixTimestamp = dateReq.getTime();
    res.json({
        unix: unixTimestamp,
        utc: dateReq.toUTCString()
    });
});

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

const listener = app.listen(PORT, () => {
    console.log(`Server has started on port ${listener.address().port}`);
});