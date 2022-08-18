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
    const newDate = new Date(req.body.date).toDateString();

    if (newDate === 'Invalid Date') {
        req.body.date = new Date().toDateString();
    } else {
        req.body.date = newDate;
    }

    next();
}, async (err, req, res, next) => {
    const { id, description, duration, date } = req.body;
    const userExerciseData = await createExercise(id, description, duration, date);

    if (err) {
        res.status(404);
        next(err);
    }

    res.status(201).json({
        _id: userExerciseData._id,
        username: userExerciseData.username,
        date: userExerciseData.date,
        description: userExerciseData.description,
        duration: userExerciseData.duration,
    });
});

exercise.get('/api/users/:_id/logs', async (req, res) => {
    const logsData = await getUserLogs(req.params._id);
    res.json(logsData);
});

export default exercise;