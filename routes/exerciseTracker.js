import { Router } from 'express';
import __dirname from '../config.js';
import { createUser, getAllUsers, createExercise, getUserLogs } from '../exercise.js';
import User from '../models/user.js';
import Exercise from '../models/userExercise.js';


const exercise = Router();

exercise.get('/', (req, res) => {
    res.sendFile(`${__dirname}/frontend/public/exercisetracker.html`);
});

exercise.get('/api/users', async (req, res) => {
    const usersData = await getAllUsers();
    res.send(usersData).status(200);
});
/**
 *  Set middleware in case username is not defined go 404 perhaps
**/
exercise.post('/api/users', async (req, res) => {
    const { username } = req.body;
    const savedData = await createUser(username);
    res.json({
        username: savedData.username,
        _id: savedData._id
    }).status(201);
});

exercise.post('/api/users/:id/exercises', (req, res, next) => {
    const { id } = req.params;
    const { description, duration, date } = req.body;
    const reqDate = new Date(date);

    if (!id || !description || !duration) {
        // Make this a middleware to return Data missing or something
        return res.status(404).send('Something is missing!');
    }

    if (reqDate == 'Invalid Date') {
        req.body.date = new Date().toISOString().slice(0, 10);
    } else {
        req.body.date = reqDate.toISOString().slice(0, 10);
    }
    console.log(req.body.date)

    next();
}, async (req, res) => {
    const { id } = req.params
    const { description, duration, date } = req.body;
    const userExerciseData = await createExercise(id, description, duration, date);

    res.json(userExerciseData).status(201);
});

exercise.delete('/api/del/all', async (req, res) => {
    // Uso só quando necessário, pro desenvolvimento~
    const deletedUsers = await User.deleteMany({});
    const deletedExercise = await Exercise.deleteMany({});
    console.log(deletedUsers, deletedExercise);
    res.send([deletedUsers, deletedExercise]);
});

exercise.get('/api/users/:id/logs', async (req, res) => {
    const { params, query } = req;
    const logsData = await getUserLogs(params.id, query.limit, query.from, query.to);
    res.json(logsData).status(200);
});

export default exercise;