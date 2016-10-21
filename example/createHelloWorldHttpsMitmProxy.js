'use strict';
const url = require('url');
const http = require('http');
const net = require('net');
const forge = require('node-forge');
const pki = forge.pki;
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const https = require('https');

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

    createFakeHttpsServer(hostname, (fakePort) => {
        var proxyReqSocket = net.connect(fakePort, '127.0.0.1', () => {
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
    })
})

// create the fake https server
function createFakeHttpsServer(hostname, callback) {

    let caCertPath = path.join(__dirname, 'rootCA/rootCA.crt');
    let caKeyPath = path.join(__dirname, 'rootCA/rootCA.key.pem');
    let caCert, caKey;
    try {
        fs.accessSync(caCertPath, fs.F_OK);
        fs.accessSync(caKeyPath, fs.F_OK);
        let caCertPem = fs.readFileSync(caCertPath);
        let caKeyPem = fs.readFileSync(caKeyPath);
        caCert = forge.pki.certificateFromPem(caCertPem);
        caKey = forge.pki.privateKeyFromPem(caKeyPem);
    } catch (e) {
        console.log(colors.red(`Can not find \`CA certificate\` or \`CA key\`.`), e);
        process.exit(1);
    }

    let certObj = createFakeCertificateByDomain(caKey, caCert, hostname);
    let fakeCertPem = pki.certificateToPem(certObj.cert);
    let fakeKeyPem = pki.privateKeyToPem(certObj.key);

    console.log(fakeCertPem);
    console.log(fakeKeyPem);


    var fakeServer = new https.Server({
        key: fakeKeyPem,
        cert: fakeCertPem
    });
    fakeServer.on('request', (req, res) => {
        console.log('https server on request!');
        res.write('hello mitm proxy!');
        res.end();
    });
    fakeServer.listen(0, () => {
        var address = fakeServer.address();
        callback(address.port);
    });
}

// create fake Certificate by domain.
function createFakeCertificateByDomain(caKey, caCert, domain) {
    var keys = pki.rsa.generateKeyPair(1024);
    var cert = pki.createCertificate();
    cert.publicKey = keys.publicKey;

    cert.serialNumber = (new Date()).getTime()+'';
    cert.validity.notBefore = new Date();
    cert.validity.notBefore.setFullYear(cert.validity.notBefore.getFullYear() - 1);
    cert.validity.notAfter = new Date();
    cert.validity.notAfter.setFullYear(cert.validity.notAfter.getFullYear() + 1);
    var attrs = [{
      name: 'commonName',
      value: domain
    }, {
      name: 'countryName',
      value: 'CN'
    }, {
      shortName: 'ST',
      value: 'GuangDong'
    }, {
      name: 'localityName',
      value: 'ShengZhen'
    }, {
      name: 'organizationName',
      value: 'node-mitmproxy'
    }, {
      shortName: 'OU',
      value: 'https://github.com/wuchangming/https-mitm-proxy-handbook'
    }];

    cert.setIssuer(caCert.subject.attributes);
    cert.setSubject(attrs);

    cert.setExtensions([{
        name: 'basicConstraints',
        critical: true,
        cA: false
    },
    {
        name: 'keyUsage',
        critical: true,
        digitalSignature: true,
        contentCommitment: true,
        keyEncipherment: true,
        dataEncipherment: true,
        keyAgreement: true,
        keyCertSign: true,
        cRLSign: true,
        encipherOnly: true,
        decipherOnly: true
    },
    {
        name: 'subjectAltName',
        altNames: [{
          type: 2,
          value: domain
        }]
    },
    {
        name: 'subjectKeyIdentifier'
    },
    {
        name: 'extKeyUsage',
        serverAuth: true,
        clientAuth: true,
        codeSigning: true,
        emailProtection: true,
        timeStamping: true
    },
    {
        name:'authorityKeyIdentifier'
    }]);
    cert.sign(caKey, forge.md.sha256.create());

    return {
        key: keys.privateKey,
        cert: cert
    };
}
