import frontend from '../../config.js';


export const getParserHome = (req, res, next) => {
    res.status(200).sendFile(`${frontend}/public/headerparser.html`);
}

export const getUserHeader = (req, res, next) => {
    res.status(200).json({
        ipaddress: req.ip,
        language: req.acceptsLanguages().join(','),
        software: req.headers['user-agent']
    });
}