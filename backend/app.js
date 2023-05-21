import express from 'express';
import cors from 'cors';
import frontend from './config.js';
import timestampV2 from './components/timestamp/timestampAPI.js';
// import timestamp from './routes/timestamp.js';
import headerParserV2 from './components/parser/parserAPI.js';
// import headerParser from './routes/headerParser.js';
import shortenerV2 from './components/shortener/shortenerAPI.js';
// import shorterner from './routes/urlShorterner.js';
import exerciseV2 from './components/tracker/trackerAPI.js';
// import exercise from './routes/exerciseTracker.js';
import fileMetadataV2 from './components/metadata/metadataAPI.js';
// import fileMetadata from './routes/fileMetadata.js';
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
app.use('/timestamp', timestampV2);
// app.use('/timestamp', timestamp);
app.use('/header-parser', headerParserV2);
// app.use('/header-parser', headerParser);
app.use('/url-shortener', shortenerV2);
// app.use('/url-shortener', shorterner);
app.use('/exercise-tracker', exerciseV2);
// app.use('/exercise-tracker', exercise);
app.use('/file-metadata', fileMetadataV2);
// app.use('/file-metadata', fileMetadata);

/**
 *  Middlewares
**/
app.use(notFound);
app.use(handleError);

export default app;