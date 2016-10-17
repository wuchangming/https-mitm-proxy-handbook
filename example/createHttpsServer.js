'use strict'
const https = require('https');
const fs = require('fs');
const path = require('path');
const tls = require('tls');

let cert = fs.readFileSync(path.join(__dirname, 'cert/my.crt'));
let key = fs.readFileSync(path.join(__dirname, 'cert/my.key.pem'));

let server = new https.Server({
    cert,
    key
})

let port = 6789;
server.listen(port, () => {
    console.log(`https server start at ${port}`);
})

server.on('request', (req, res) => {
    console.log('https server on request!');
    res.write('hello mitm proxy!');
    res.end();
})

server.on('error', (e) => {
    console.error(e);
})
