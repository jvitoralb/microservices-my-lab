import http from 'http';
import app from './app.js';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { normalize } from 'path';


dotenv.config();

const PORT = normalize(process.env.PORT || '3000');

app.set('port', PORT);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const server = http.createServer(app).listen(PORT, () => {
    console.log(`Server has started on port ${server.address().port}`);
});
