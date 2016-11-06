# 第1节：HTTP中间人代理实现

想实现HTTPS的中间人代理，我们先定个**小目标**，先实现一个**HTTP**的中间人代理。

HTTP 和 HTTPS的区别
-------
HTTP协议是互联网应用最广泛的一种网络协议，传输的内容是以明文方式进行。由于传输的是明文，HTTP本身没有任何安全保障。HTTPS的主要思想就是在不安全的网络上创建一个安全信道，这里的**S**是指：SSL/TLS就是这一层安全通道。


HTTP中间人代理
-------
**HTTP中间人代理示意图：**  
<img src="img/Chapter1/http-mitm-proxy.png" width="650px">

由于HTTP的传输内容都是明文，想实现中间人代理就变得非常简单。  

代码核心部分：
```javascript
const http = require('http');
const url = require('url');

let httpMitmProxy = new http.Server();
// 启动端口
let port = 6789;

httpMitmProxy.listen(port, () => {
    console.log(`HTTP中间人代理启动成功，端口：${port}`);
});
// 代理接收客户端的转发请求
httpMitmProxy.on('request', (req, res) => {

    // 解析客户端请求
    var urlObject = url.parse(req.url);
    let options =  {
        protocol: 'http:',
        hostname: req.headers.host.split(':')[0],
        method: req.method,
        port: req.headers.host.split(':')[1] || 80,
        path: urlObject.path,
        headers: req.headers
    };

    console.log(`请求方式：${options.method}，请求地址：${options.protocol}//${options.hostname}:${options.port}${options.path}`);

    // 根据客户端请求，向真正的目标服务器发起请求。
    let realReq = http.request(options, (realRes) => {

        // 设置客户端响应的http头部
        Object.keys(realRes.headers).forEach(function(key) {
            res.setHeader(key, realRes.headers[key]);
        });

        // 设置客户端响应状态码
        res.writeHead(realRes.statusCode);

        // 通过pipe的方式把真正的服务器响应内容转发给客户端
        realRes.pipe(res);
    });

    // 通过pipe的方式把客户端请求内容转发给目标服务器
    req.pipe(realReq);

    realReq.on('error', (e) => {
        console.error(e);
    })
})
```
详细源码见：[../code/chapter1/httpMitmProxy.js](../code/chapter1/httpMitmProxy.js)

npm script运行方式
```
npm run httpMitmProxy
```
上面的代码实现了一个最简单的http代理。  

流程概括如下：
- 1、接收客户端的转发请求。
- 2、根据客户端请求，向真正的目标服务器发起请求。
- 3、把客户端请求内容转发给目标服务器。
- 4、把真正的服务器响应内容转发给客户端。

设置代理
-------
代理服务启动好后，我们需要把本机上的http请求都通过代理做转发。

#### Windows 下设置代理方式

**第一步**：  

<img src="img/Chapter1/WinSetProxyS1.png" width="550px">  

**第二步**：  

<img src="img/Chapter1/WinSetProxyS2.png" width="550px">  

**第三步**：  

<img src="img/Chapter1/WinSetProxyS3.png" width="550px">  

#### MAC 下设置代理方式

**第一步**：  

<img src="img/Chapter1/MacSetProxyS1.png" width="550px">  

**第二步**：  

<img src="img/Chapter1/MacSetProxyS2.png" width="550px">  

**第三步**：  

<img src="img/Chapter1/MacSetProxyS3.png" width="550px">  

作为中间人，能做什么？
-------
通过该代理服务我们已经成功的与通信的两端（服务器和客户端）同时建立了连接。作为"中间人"，轻而易举就能控制经过的请求和响应。
