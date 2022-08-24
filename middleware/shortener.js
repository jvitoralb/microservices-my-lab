import dns from 'node:dns';


export const validHostname = (req, res, next) => {
    const hostRegExp = /[www.]*(\w+|[-\w-]*[.\w]*)[.]\w+/g;
    const regExp = /(h|f)[tps]+/g;
    let hostToCheck = req.body.url;

    if (!req.body.url) {
        console.log('!req.body.url')
        if (req.path === '/') {
            console.log('req.path')
            return res.status(404).send('Not found');
        }
        console.log('!req.body.url to undefined')
        req.body.url = 'undefined';
    }
    if (!req.body.url.match(regExp)) {
        console.log('!req.body.url.match(regExp)')
        req.body.url = `https://${req.body.url}`;
    }

    if (!hostToCheck) {
        console.log('!hostToCheck')
        return res.status(404).send('Not found');
    }

    if (hostToCheck.match(hostRegExp)) {
        console.log('hostToCheck.match(hostRegExp)')
        hostToCheck = hostToCheck.match(hostRegExp).join('');
        // req.body.url = hostToCheck.match(hostRegExp).join('');
    }

    dns.lookup(hostToCheck, (err) => {
        console.log('avant err dns', req.body, hostToCheck)
        if (err) {
            return res.json({ error: 'invalid url' });
        };
        console.log('après error dns to res.json')
        // return res.json({
        //     final: true,
        //     tocheck: hostToCheck,
        //     reqbodyurl: req.body.url
        // });
        return next();
    });
}
//     const hostRegExp = /[www.]*(\w+|[-\w-]*[.\w]*)[.]\w+/g;
//     let hostToCheck = req.body.url;

//     if (!hostToCheck) {
//         console.log('!host', req.body, hostToCheck)
//         return res.status(404).send('Not found');
//     }

//     if (hostToCheck.match(hostRegExp)) {
//         req.body.url = hostToCheck.match(hostRegExp).join('');
//     }

//     dns.lookup(req.body.url, (err) => {
//         if (err) {
//             return res.json({ error: 'invalid url' });
//         };
//         return next();
//     });
// }