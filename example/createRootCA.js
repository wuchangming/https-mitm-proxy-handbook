const forge = require('node-forge');
const pki = forge.pki;
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

var keys = pki.rsa.generateKeyPair(1024);
var cert = pki.createCertificate();
cert.publicKey = keys.publicKey;
cert.serialNumber = (new Date()).getTime() + '';
cert.validity.notBefore = new Date();
cert.validity.notBefore.setFullYear(cert.validity.notBefore.getFullYear() - 5);
cert.validity.notAfter = new Date();
cert.validity.notAfter.setFullYear(cert.validity.notAfter.getFullYear() + 20);
var attrs = [{
    name: 'commonName',
    value: 'https-mitm-proxy-handbook'
}, {
    name: 'countryName',
    value: 'CN'
}, {
    shortName: 'ST',
    value: 'GuangDong'
}, {
    name: 'localityName',
    value: 'ShenZhen'
}, {
    name: 'organizationName',
    value: 'https-mitm-proxy-handbook'
}, {
    shortName: 'OU',
    value: 'https://github.com/wuchangming/https-mitm-proxy-handbook'
}];
cert.setSubject(attrs);
cert.setIssuer(attrs);
cert.setExtensions([{
    name: 'basicConstraints',
    critical: true,
    cA: true
}, {
    name: 'keyUsage',
    critical: true,
    keyCertSign: true
}, {
    name: 'subjectKeyIdentifier'
}]);

// self-sign certificate
cert.sign(keys.privateKey, forge.md.sha256.create());

var certPem = pki.certificateToPem(cert);
var keyPem = pki.privateKeyToPem(keys.privateKey);
console.log(certPem);
console.log(keyPem);

mkdirp.sync(path.join(__dirname, 'rootCA'));
fs.writeFileSync(path.join(__dirname, 'rootCA/rootCA.crt'), certPem);
fs.writeFileSync(path.join(__dirname, 'rootCA/rootCA.key.pem'), keyPem);
