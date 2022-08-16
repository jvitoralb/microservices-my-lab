import express from 'express';
import cors from 'cors';
import __dirname from './config.js';
import timestampRouter from './routes/timestamp.js';
import headerRouter from './routes/headerParser.js';
import shorternerRouter from './routes/urlShorterner.js';
import exerciseRouter from './routes/exerciseTracker.js';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(`${__dirname}/frontend`));

/**
 *  Home page
**/
app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/frontend/public/index.html`);
});

/**
 *  Timestamp API project
**/
app.use('/timestamp', timestampRouter);

/**
 *  Request header parser API project
**/
app.use('/req-header-parser', headerRouter);

/**
 *  URL Shortener
**/
app.use('/url-shortener', shorternerRouter);

/**
 *  Exercise Router
**/
app.use('/exercise-tracker', exerciseRouter);

const listener = app.listen(PORT, () => {
    console.log(`Server has started on port ${listener.address().port}`);
});