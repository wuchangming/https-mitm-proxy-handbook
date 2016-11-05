# 基于Node.js的HTTPS [MITM](https://zh.wikipedia.org/wiki/%E4%B8%AD%E9%97%B4%E4%BA%BA%E6%94%BB%E5%87%BB)(中间人)代理的原理和实现

<img src="doc/img/hacker.png" width="500px">

部署在公网的服务面临着越来越多的流量劫持、运营商劫持事件，为了能更好的保障信息的安全性和完整性，HTTPS得到了越来越多的重视。基于此原因，本文章尝试从另一个视角，通过使用[Node.js](http://nodejs.org/)实现一个简单的HTTPS中间人代理的方式，阐述HTTPS是如何保证网络信息的安全，并且分析用户的何种行将会导致HTTPS的安全性失效。  

**[MITM](https://zh.wikipedia.org/wiki/%E4%B8%AD%E9%97%B4%E4%BA%BA%E6%94%BB%E5%87%BB)（中间人）代理**的技术手段对于软件开发者并不陌生，在实际开发和测试中经常会使用。调试接口、查看HTTP请求与响应时使用的http抓包调试工具如：[Fiddler](http://www.telerik.com/fiddler)、 [Charles](https://www.charlesproxy.com/)，就是基于该原理实现的。  

本文会更侧重于代码的实现，每一步都提供`详细的`、`可运行的`[js代码实现](./example)。

#### 问题反馈

如本文有原理上或者是代码层面的错误，再或者是任何方面的问题，都欢迎[提问](https://github.com/wuchangming/https-mitm-proxy-handbook/issues/new)或 Pull Request!


#### 第〇节：[概要和思路分析](./doc/Chapter0.md)

#### 第一节：[HTTP中间人代理](./doc/Chapter1.md)

#### 第二节：[生成CA根证书](./doc/Chapter2.md)

#### 第三节：[安装CA根证书](./doc/Chapter3.md)

#### 第四节：[基于CA根证书生成网站域名对应的证书](./doc/Chapter4.md)

#### 第五节：[一个简单的HTTPS服务](./doc/Chapter5.md)

#### 第六节：[HTTP隧道](./doc/Chapter6.md)

#### 第七节：[Hello World版的HTTPS MITM代理](./doc/Chapter7.md)

#### 第八节：[真正的HTTPS MITM代理](./doc/Chapter8.md)
