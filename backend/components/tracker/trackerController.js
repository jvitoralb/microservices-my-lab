import frontend from '../../config.js';
import services from './trackerService.js';


const exerciseTrackerHome = (req, res) => {
    res.status(200).sendFile(`${frontend}/public/exercisetracker.html`);
}

const createUser = async (req, res, next) => {
    const { username } = req.body;
    const savedUser = await services.createNewUser(username);
    res.status(201).json(savedUser);
};

const getAllUsers = async (req, res, next) => {
    const users = await services.allUsers();
    res.status(200).send(users);
};

const userExists = async (req, res, next) => {
    const { id } = req.params;
    const result = await services.validUser(id);
    return res.status(200).json(result);
};

const createExercise = async (req, res, next) => {
    const { params, body } = req;
    const exerciseInfo = {
        user: params.id,
        description: body.description,
        duration: body.duration,
        date: body.date
    }

    const answer = await services.addExercise(exerciseInfo);
    res.status(201).json(answer);
};

const getUserLogs = async (req, res, next) => {
    const { params, query } = req;
    const filters = {
        from: query.from,
        to: query.to,
        limit: query.limit
    }

    const answer = await services.userLogs(params.id, filters);
    res.status(200).json(answer);
};

const tracker = {
    createUser,
    getAllUsers,
    userExists,
    createExercise,
    getUserLogs,
    exerciseTrackerHome
}

export default tracker;