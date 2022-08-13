import { Router } from 'express';
import __dirname from '../config.js';

const headerRouter = Router();

headerRouter.get('/', (req, res) => {
    res.sendFile(`${__dirname}/frontend/public/reqheader.html`);
});

headerRouter.get('/api/whoami', (req, res) => {
    res.json({
        ipaddress: req.ip,
        language: req.acceptsLanguages().join(','),
        software: req.headers['user-agent']
    });
});

export default headerRouter;