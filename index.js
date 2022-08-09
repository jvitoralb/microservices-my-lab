import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`);
});

app.get('/api/', (req, res) => {
    let now = new Date();
    res.json({
        unix: now.getTime(),
        utc: now.toUTCString()
    });
});

app.use('/api/:date?', (req, res, next) => {
    let isValidReq = new Date(req.params.date);
    let unixReq = Number(req.params.date);
    let newDateTime = new Date();

    if (!isValidReq.getDate()) {
        newDateTime.setTime(unixReq);

        return newDateTime.toUTCString() !== 'Invalid Date' ? 
        res.json({unix: unixReq, utc: newDateTime.toUTCString()}) :
        res.json({error: 'Invalid Date'});
    }
    next();
});

app.get('/api/:date?', (req, res) => {
    let dateReq = new Date(req.params.date);
    let unixTimestamp = dateReq.getTime();

    res.json({
        unix: unixTimestamp,
        utc: dateReq.toUTCString()
    });
});

const listener = app.listen(process.env.PORT || PORT, () => {
    console.log(`Server has started on port ${listener.address().port}`);
});