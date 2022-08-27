const checkUpload = (req, res, next) => {
    if(!req.file) {
        return res.status(404).send('Something is missing!');
    }
    next();
}

export default checkUpload;