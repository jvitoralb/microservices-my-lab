import { Router } from 'express';
import __dirname from '../config.js';

const exerciseRouter = Router();

exerciseRouter.get('/', (req, res) => {
    res.sendFile(`${__dirname}/frontend/public/exercisetracker.html`);
});

export default exerciseRouter;