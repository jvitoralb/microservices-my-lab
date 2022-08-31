import { Router } from 'express';
import multer from 'multer';
import frontend from '../config.js';
import checkUpload from '../middleware/fileMetadata.js';


const fileMetadata = Router();
const upload = multer({ dest: 'uploads/' });

fileMetadata.get('/', (req, res) => {
    res.sendFile(`${frontend}/public/filemetadata.html`);
});

fileMetadata.use('/api/fileanalyse', upload.single('upfile'));

fileMetadata.post('/api/fileanalyse', checkUpload, (req, res) => {
    const { originalname, mimetype, size } = req.file;
    res.status(201).json({
        name: originalname,
        type: mimetype,
        size: size
    });
});

export default fileMetadata;