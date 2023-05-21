import { Router } from 'express';
import frontend from '../config.js';


const headerParser = Router();

headerParser.get('/', (req, res) => {
    res.sendFile(`${frontend}/public/headerparser.html`);
});

headerParser.get('/api/whoami', (req, res) => {
    res.json({
        ipaddress: req.ip,
        language: req.acceptsLanguages().join(','),
        software: req.headers['user-agent']
    });
});

// export default headerParser;