# https-mitm-proxy-handbook

本项目详细讲解如何用[node.js](http://nodejs.org/)一步步实现一个**HTTPS**的[MITM](https://zh.wikipedia.org/wiki/%E4%B8%AD%E9%97%B4%E4%BA%BA%E6%94%BB%E5%87%BB)(中间人)代理服务器。从CA证书的生成和安装到最后功能的完整实现。每一步都提供详细的[js代码实现](./example)。

# 第零节：前言

# 第一节: 生成CA根证书
code: `example/createRootCA.js`
```
npm run step1
```

# 第二节：安装CA根证书
windows
```
npm run step2Win
```

Mac
```
npm run step2Mac
```

# 第三节: 基于CA根证书生成网站域名对应的证书
code: `example/createCertByRootCA.js`
```
npm run step3
```

# 第四节: 一个简单的HTTPS服务
`example/createHttpsServer.js`
```
npm run step4
```


# 第五节：HTTP隧道
```
npm run step5
```

# 第六节：Hello World版的HTTPS MITM代理

# 第七节：真正的HTTPS MITM代理
