export const timestampNow = () => {
    const now = new Date();
    return {
        unix: now.getTime(),
        utc: now.toUTCString()
    }
}

export const customTimestamp = (inputDate) => {
    const dateReq = new Date(inputDate);
    const dateReqUnix = dateReq.getTime();
    const unixReq = Number(inputDate);

    if (dateReq.getDate()) {
        return {
            unix: dateReqUnix,
            utc: dateReq.toUTCString()
        };
    }

    dateReq.setTime(unixReq);

    if (dateReq == 'Invalid Date') {
        return { error: 'Invalid Date' };
    }

    return {
        unix: unixReq,
        utc: dateReq.toUTCString()
    };
}