import { Router } from 'express';
import __dirname from '../config.js';
import tracker from '../controllers/exercise.js';
import exerciseBody from '../middleware/exercise.js';
import Exercise from '../models/userExercise.js';
import User from '../models/User.js';


const exercise = Router();

exercise.get('/', (req, res) => {
    res.sendFile(`${__dirname}/frontend/public/exercisetracker.html`);
});

exercise.route('/api/users').get((req, res) => {
    tracker.getAllUsers(req, res);
}).post((req, res) => {
    tracker.createUser(req, res);
});

exercise.post('/api/users/:id/exercises', exerciseBody, (req, res) => {
    tracker.createExercise(req, res);
});

// exercise.delete('/api/del/all', async (req, res) => {
//     // Uso só quando necessário, pro desenvolvimento~
//     const deletedUsers = await User.deleteMany({});
//     const deletedExercise = await Exercise.deleteMany({});
//     console.log(deletedUsers, deletedExercise);
//     res.send([deletedUsers, deletedExercise]);
// });

exercise.get('/api/users/:id/logs', (req, res, next) => {
    tracker.userExists(req, res, next);
}, (req, res) => {
    tracker.getUserLogs(req, res);
});

export default exercise;