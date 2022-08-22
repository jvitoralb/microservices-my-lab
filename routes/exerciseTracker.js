import { Router } from 'express';   
import __dirname from '../config.js';
import tracker from '../controllers/exercise.js';
import exerciseBody from '../middleware/exercise.js';
import Exercise from '../models/userExercise.js';
// import User from '../models/User.js';


const exercise = Router();

exercise.get('/', (req, res) => {
    res.sendFile(`${__dirname}/frontend/public/exercisetracker.html`);
});

exercise.get('/api/users', async (req, res) => {
    const usersData = await tracker.getAllUsers();
    res.status(200).send(usersData);
});

exercise.post('/api/users', async (req, res) => {
    const { username } = req.body;
    const savedData = await tracker.createUser(username, res);
    res.status(201).json({
        username: savedData.username,
        _id: savedData._id
    });
});

exercise.post('/api/users/:id/exercises', exerciseBody, async (req, res) => {
    const { id } = req.params;
    const { description, duration, date } = req.body;
    const userExerciseData = await tracker.createExercise(id, description, duration, date);
    res.status(201).json(userExerciseData);
});

exercise.delete('/api/del/all', async (req, res) => {
    // Uso só quando necessário, pro desenvolvimento~
    const deletedUsers = await User.deleteMany({});
    const deletedExercise = await Exercise.deleteMany({});
    console.log(deletedUsers, deletedExercise);
    res.send([deletedUsers, deletedExercise]);
});

exercise.get('/api/users/:id/logs', async (req, res) => {
    /**
     *  Need to check if user exists
    **/
    const { params, query } = req;
    const logsData = await tracker.getUserLogs(params.id, query.limit, query.from, query.to);
    res.status(200).json(logsData);
});

export default exercise;