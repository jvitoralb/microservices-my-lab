import CustomError from '../errors/custom.js';


const checkUpload = (req, res, next) => {
    if(!req.file) {
        throw new CustomError('Something is missing!', 404);
    }
    next();
}

export default checkUpload;