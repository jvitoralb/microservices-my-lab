const asyncWrap = (func) => async (req, res, next) => {
    try {
        await func(req, res, next);
    } catch (err) {
        next(err);
    }
}

export default asyncWrap;