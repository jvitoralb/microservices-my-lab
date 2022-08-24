import dns from 'node:dns';


export const validHostname = (req, res, next) => {
    const hostRegExp = /[www.]*(\w+|[-\w-]*[.\w]*)[.]\w+/g;
    let hostToCheck = req.body.url;
    console.log('body', req.body, hostToCheck, 'host')
    if (!hostToCheck) {
        console.log('!host', req.body, hostToCheck)
        return res.status(404).send('Not found');
    }

    console.log(hostToCheck.match(hostRegExp).join(''))
    if (hostToCheck.match(hostRegExp)) {
        req.body.url = hostToCheck.match(hostRegExp).join('');
    }

    dns.lookup(req.body.url, (err) => {
        console.log('avant dns err', err)
        if (err) {
            return res.json({ error: 'invalid url' });
        };
        console.log('aprÈs err dns')
        return next();
    });
}