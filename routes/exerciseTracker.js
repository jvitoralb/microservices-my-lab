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

exercise.post('/api/users', async (req, res) => {
    const { username } = req.body;
    const savedData = await createUser(username);
    res.json({
        username: savedData.username,
        _id: savedData._id
    }).status(201);
});

exercise.post('/api/users/:_id/exercises', (req, res, next) => {
    const { id, description, duration, date } = req.body;
    const newDate = new Date(date).toDateString();

    if (!id || !description || !duration) {
        return res.status(404).send('Something is missing!');
    }

    if (newDate === 'Invalid Date') {
        req.body.date = new Date().toDateString();
    } else {
        req.body.date = newDate;
    }

    next();
}, async (req, res) => {
    const { id, description, duration, date } = req.body;
    const userExerciseData = await createExercise(id, description, duration, date);

    res.status(201).json(userExerciseData);
});

exercise.delete('/api/del/all', async (req, res) => {
    const deletedUsers = await User.deleteMany({});
    const deletedExercise = await Exercise.deleteMany({});
    console.log(deletedUsers, deletedExercise);
    res.send([deletedUsers, deletedExercise]);
});

exercise.get('/api/users/:_id/logs', async (req, res) => {
    const logsData = await getUserLogs(req.params._id);
    res.json(logsData);
});

export default exercise;