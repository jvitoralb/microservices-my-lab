import CustomError from '../errors/custom.js';


const handleError = (err, req, res, next) => {
    if (err instanceof CustomError) {
        return res.status(err.status).json({ msg: err.message });
    }

    return res.status(500).json({
        msg: 'Something went wrong, try again later!'
    });
}

export default handleError;