import { userExists } from '../controllers/exercise.js';
import CustomError from '../errors/custom.js';


const exerciseBody = (req, res, next) => {
    const { params, body } = req;
    const reqDate = new Date(body.date);

    if (!params.id || !body.description || !body.duration) {
        throw new CustomError('Something is missing!', 404);
    }

    if (reqDate == 'Invalid Date') {
        req.body.date = new Date().toLocaleDateString('en-CA');
    }
    return userExists(req, res, next);
}

export default exerciseBody;