import { Router } from 'express';
import frontend from '../config.js';
import tracker from '../controllers/exercise.js';
import exerciseBody from '../middleware/exercise.js';


const exercise = Router();

exercise.get('/', (req, res) => {
    res.sendFile(`${frontend}/public/exercisetracker.html`);
});

exercise.route('/api/users').get((req, res, next) => {
    tracker.getAllUsers(req, res, next);
}).post((req, res, next) => {
    tracker.createUser(req, res, next);
});

exercise.post('/api/users/:id/exercises', exerciseBody, (req, res, next) => {
    tracker.createExercise(req, res, next);
});

exercise.get('/api/users/:id/logs', (req, res, next) => {
    tracker.userExists(req, res, next);
}, (req, res, next) => {
    tracker.getUserLogs(req, res, next);
});

// export default exercise;