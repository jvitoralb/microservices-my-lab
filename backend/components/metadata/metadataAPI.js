import { Router } from 'express';
import multer from 'multer';
import checkUpload from './metadataMiddleware.js';
import { getMetadataHome, uploadStatus } from './metadataController.js';


const fileMetadataV2 = Router();

const upload = multer({ dest: 'uploads/' });

fileMetadataV2.get('/', getMetadataHome);
fileMetadataV2.use('/api/fileanalyse', upload.single('upfile'));
fileMetadataV2.post('/api/fileanalyse', checkUpload, uploadStatus);

export default fileMetadataV2;