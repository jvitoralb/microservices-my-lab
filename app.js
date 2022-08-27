import express from 'express';
import cors from 'cors';
// import mongoose from 'mongoose';
// import * as dotenv from 'dotenv';
import __dirname from './config.js';
import timestamp from './routes/timestamp.js';
import headerParser from './routes/headerParser.js';
import shorterner from './routes/urlShorterner.js';
import exercise from './routes/exerciseTracker.js';
import fileMetadata from './routes/fileMetadata.js';

// dotenv.config();

// const PORT = process.env.PORT || 3000;
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
 *  API project routes
**/
app.use('/timestamp', timestamp);
app.use('/req-header-parser', headerParser);
app.use('/url-shortener', shorterner);
app.use('/exercise-tracker', exercise);
app.use('/file-metadata', fileMetadata);

export default app;