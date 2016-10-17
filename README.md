# https-mitm-proxy-handbook

This document covers all aspects of how to build a https [MITM](https://en.wikipedia.org/wiki/Man-in-the-middle_attack) proxy base on [node.js](http://nodejs.org/).

# create root CA
`example/createRootCA.js`
```
npm run step1
```

# create cert base root CA
`example/createCertByRootCA.js`
```
npm run step2
```

# create https server
`example/createHttpsServer.js`
```
npm run step3
```

# install root CA

windows
```
npm run step4Win
```

Mac
```
npm run step4Mac
```

# create https tunnel proxy
```
npm run step5
```
