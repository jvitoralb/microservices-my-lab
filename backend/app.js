import express from 'express';
import cors from 'cors';
import frontend from './config.js';
import timestamp from './routes/timestamp.js';
import headerParser from './routes/headerParser.js';
import shorterner from './routes/urlShorterner.js';
import exercise from './routes/exerciseTracker.js';
// import fileMetadata from './routes/fileMetadata.js';
import fileMetadataV2 from './components/metadata/metadataAPI.js';
import notFound from './middleware/notFound.js';
import handleError from './middleware/error.js';


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(`${frontend}`));

/**
 *  Home page
**/
app.get('/', (req, res) => {
    res.sendFile(`${frontend}/public/index.html`);
});

/**
 *  Routes
**/
app.use('/timestamp', timestamp);
app.use('/header-parser', headerParser);
app.use('/url-shortener', shorterner);
app.use('/exercise-tracker', exercise);
app.use('/file-metadata', fileMetadataV2);
// app.use('/file-metadata', fileMetadata);

/**
 *  Middlewares
**/
app.use(notFound);
app.use(handleError);

export default app;