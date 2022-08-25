import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import __dirname from './config.js';
import timestamp from './routes/timestamp.js';
import headerParser from './routes/headerParser.js';
import shorterner from './routes/urlShorterner.js';
import exercise from './routes/exerciseTracker.js';
import fileMetadata from './routes/fileMetadata.js';

dotenv.config();

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
app.use('/timestamp', timestamp);

/**
 *  Request header parser API project
**/
app.use('/req-header-parser', headerParser);

/**
 *  URL Shortener
**/
app.use('/url-shortener', shorterner);

/**
 *  Exercise Router
**/
app.use('/exercise-tracker', exercise);

/**
 *  File Metadata
**/
app.use('/file-metadata', fileMetadata);

/**
 *  Need to separate app and server 
**/


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const listener = app.listen(PORT, () => {
    console.log(`Server has started on port ${listener.address().port}`);
});