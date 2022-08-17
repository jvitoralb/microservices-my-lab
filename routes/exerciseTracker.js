import { Router } from 'express';
import __dirname from '../config.js';
import { createUser, getAllUsers, createExercise } from '../exercise.js';

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

exercise.post('/api/users/:id/exercises', (req, res, next) => {
    const newDate = new Date(req.body.date).toDateString();

    if (newDate === 'Invalid Date') {
        req.body.date = new Date().toDateString();
    } else {
        req.body.date = newDate;
    }
    next();
}, async (req, res) => {
    const { id, description, duration, date } = req.body;
    const savedExercise = await createExercise(id, description, duration, date);

    res.status(201).json({
        _id: savedExercise.username.id,
        username: savedExercise.username.username,
        description: savedExercise.description,
        duration: savedExercise.duration,
        date: savedExercise.date
    });
});

export default exercise;