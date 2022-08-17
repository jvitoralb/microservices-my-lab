import { Router } from 'express';
import __dirname from '../config.js';

const exercise = Router();

exercise.get('/', (req, res) => {
    res.sendFile(`${__dirname}/frontend/public/exercisetracker.html`);
});

exercise.get('/api/users', (req, res) => {
    res.send([
        {
            username: 'User1',
            _id: 'User1 id'
        },
        {
            username: 'User2',
            _id: 'User2 id'
        }
    ]);
});

exercise.post('/api/users', (req, res) => {
    const {username} = req.body;

    res.json({
        username: username,
        _id: 'its id'
    });
});

export default exercise;