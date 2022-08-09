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
    res.json({
        unix: new Date().getTime(),
        utc: new Date().toUTCString()
    });
});

app.use('/api/:date?', (req, res, next) => {
    let isValidReq = new Date(req.params.date);
    let newDateTime = new Date();
    newDateTime.setTime(req.params.date);

    if (!isValidReq.getDate()) {
        if (newDateTime.toUTCString() === 'Invalid Date') {
            return res.json({error: 'Invalid Date'});
        }
        return res.json({
            unix: req.params.date,
            utc: newDateTime.toUTCString()
        });
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

app.listen(PORT, () => console.log(`Server has started on port ${PORT}`));