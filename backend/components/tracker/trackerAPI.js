import { Router } from 'express';
import tracker from './trackerController.js';
import exerciseBody from './trackerMiddleware.js';


const exerciseV2 = Router();

exerciseV2.get('/', tracker.exerciseTrackerHome);

exerciseV2.route('/api/users')
.get(tracker.getAllUsers)
.post(tracker.createUser);

exerciseV2.route('/api/users/:id/exercises')
.all(exerciseBody)
.post(tracker.createExercise);

exerciseV2.get('/api/users/:id/logs')
.all(tracker.userExists)
.get(tracker.getUserLogs);

export default exerciseV2;