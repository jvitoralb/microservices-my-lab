import { userExists } from '../controllers/exercise.js';


const exerciseBody = (req, res, next) => {
    const { params, body } = req;
    const reqDate = new Date(body.date);

    if (!params.id || !body.description || !body.duration) {
        return res.status(404).send('Something is missing!');
    }

    if (reqDate == 'Invalid Date') {
        req.body.date = new Date().toLocaleDateString('en-CA');
    }
    return userExists(req, res, next);
}

export default exerciseBody;