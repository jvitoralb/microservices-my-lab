import { Router } from 'express';
import __dirname from '../config.js';

const headerParser = Router();

headerParser.get('/', (req, res) => {
    res.sendFile(`${__dirname}/frontend/public/headerparser.html`);
});

headerParser.get('/api/whoami', (req, res) => {
    res.json({
        ipaddress: req.ip,
        language: req.acceptsLanguages().join(','),
        software: req.headers['user-agent']
    });
});

export default headerParser;