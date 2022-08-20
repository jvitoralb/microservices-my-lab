const checkBody = (req, res, next) => {
    const { params, body } = req;
    const reqDate = new Date(body.date);

    if (!params.id || !body.description || !body.duration) {
        return res.status(404).send('Something is missing!');
    }

    if (reqDate == 'Invalid Date') {
        req.body.date = new Date().toISOString().slice(0, 10);
    } else {
        req.body.date = reqDate.toISOString().slice(0, 10);
    }
    next();
}

export default checkBody;