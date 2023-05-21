import frontend from '../../config.js';


export const getMetadataHome = (req, res) => {
    res.status(200).sendFile(`${frontend}/public/filemetadata.html`);
}

export const uploadStatus = (req, res) => {
    const { originalname, mimetype, size } = req.file;

    res.status(201).json({
        name: originalname,
        type: mimetype,
        size: size
    });
}