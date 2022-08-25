import { Router } from 'express';
import _dirname from '../config.js';
import multer from 'multer';


const fileMetadata = Router();
const upload = multer({dest: 'uploads/'});

fileMetadata.get('/', (req, res) => {
    res.sendFile(`${_dirname}/frontend/public/filemetadata.html`);
});

fileMetadata.post('/api/upload-file', upload.single('upfile'), (req, res) => {
    const { originalname, mimetype, size } = req.file;
    res.json({
        name: originalname,
        type: mimetype,
        size: size
    });
});

export default fileMetadata;