'use strict';
const url = require('url');
const http = require('http');
const net = require('net');

let proxy = new http.Server();
let port = 9876;

proxy.listen(port, () => {
    console.log(`https tunnel proxy listening port:${port}`);
});

proxy.on('connect', (req, cltSocket, head) => {
    let srvUrl = url.parse(`https://${req.url}`);
    let port = srvUrl.port;
    let hostname = srvUrl.hostname;

    console.log(`tunneling http://${srvUrl.hostname}${srvUrl.port}`);

    var proxyReqSocket = net.connect(port, hostname, () => {
        cltSocket.write('HTTP/1.1 200 Connection Established\r\n' +
        'Proxy-agent: https-mitm-proxy-handbook\r\n' +
        '\r\n');
        proxyReqSocket.write(head);
        proxyReqSocket.pipe(cltSocket);
        cltSocket.pipe(proxyReqSocket);
    });
    proxyReqSocket.on('error', (e) => {
        console.error(e);
    })
    return proxyReqSocket;
})
