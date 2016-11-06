'use strict'
/**
 *  通过HTTP MITM 代理修改HTML内容
 */
const http = require('http');
const url = require('url');
const through = require('through2');
const net = require('net');

let httpMitmProxy = new http.Server();
// 启动端口
let port = 6789;

httpMitmProxy.listen(port, () => {
    console.log(`HTTP中间人代理启动成功，端口：${port}`);
});
// 代理接收客户端的转发请求
httpMitmProxy.on('request', (req, res) => {

    // 第一步：解析客户端请求
    var urlObject = url.parse(req.url);
    let options =  {
        protocol: 'http:',
        hostname: req.headers.host.split(':')[0],
        method: req.method,
        port: req.headers.host.split(':')[1] || 80,
        path: urlObject.path,
        headers: req.headers
    };

    // 为了方便起见，直接去掉客户端请求所支持的压缩方式
    delete options.headers['accept-encoding'];

    console.log(`请求方式：${options.method}，请求地址：${options.protocol}//${options.hostname}:${options.port}${options.path}`);

    // 第二步：根据客户端请求，向真正的目标服务器发起请求。
    let realReq = http.request(options, (realRes) => {

        // 设置客户端响应的http头部
        Object.keys(realRes.headers).forEach(function(key) {
            res.setHeader(key, realRes.headers[key]);
        });

        // 设置客户端响应状态码
        res.writeHead(realRes.statusCode);

        // 通过响应的http头部判断响应内容是否为html
        if (/html/i.test(realRes.headers['content-type'])) {
            realRes.pipe(through(function(chunk, enc, callback) {
                let chunkString = chunk.toString();
                // 给html注入的alert的js代码
                let script = '<script>alert("Hello https-mitm-proxy-handbook!")</script>'
                chunkString = chunkString.replace(/(<\/head>)/ig, function (match) {
                    return  script + match;
                });
                this.push(chunkString);
                callback();
            })).pipe(res);
        } else {
            realRes.pipe(res);
        }

    });

    // 通过pipe的方式把客户端请求内容转发给目标服务器
    req.pipe(realReq);

    realReq.on('error', (e) => {
        console.error(e);
    })
})

httpMitmProxy.on('error', (e) => {
    if (e.code == 'EADDRINUSE') {
        console.error('HTTP中间人代理启动失败！！');
        console.error(`端口：${port}，已被占用。`);
    } else {
        console.error(e);
    }
});

// https的请求通过http隧道方式转发
httpMitmProxy.on('connect', (req, cltSocket, head) => {
  // connect to an origin server
  var srvUrl = url.parse(`http://${req.url}`);
  var srvSocket = net.connect(srvUrl.port, srvUrl.hostname, () => {
    cltSocket.write('HTTP/1.1 200 Connection Established\r\n' +
                    'Proxy-agent: MITM-proxy\r\n' +
                    '\r\n');
    srvSocket.write(head);
    srvSocket.pipe(cltSocket);
    cltSocket.pipe(srvSocket);
  });
  srvSocket.on('error', (e) => {
      console.error(e);
  });
});
