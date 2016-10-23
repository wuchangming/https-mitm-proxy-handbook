# 基于Node.js的HTTPS [MITM](https://zh.wikipedia.org/wiki/%E4%B8%AD%E9%97%B4%E4%BA%BA%E6%94%BB%E5%87%BB)(中间人)代理的原理和实现

本项目详细讲解如何用[Node.js](http://nodejs.org/)一步步实现一个**HTTPS**的[MITM](https://zh.wikipedia.org/wiki/%E4%B8%AD%E9%97%B4%E4%BA%BA%E6%94%BB%E5%87%BB)(中间人)代理服务器。从CA证书的生成和安装到最后功能的完整实现。每一步都提供详细的[js代码实现](./example)。


#### 第〇节：[前言](./doc/Chapter0.md)

#### 第一节：[生成CA根证书](./doc/Chapter1.md)

#### 第二节：[安装CA根证书](./doc/Chapter2.md)

#### 第三节：[基于CA根证书生成网站域名对应的证书](./doc/Chapter3.md)

#### 第四节：[一个简单的HTTPS服务](./doc/Chapter4.md)

#### 第五节：[HTTP隧道](./doc/Chapter5.md)

#### 第六节：[Hello World版的HTTPS MITM代理](./doc/Chapter6.md)

#### 第七节：[真正的HTTPS MITM代理](./doc/Chapter7.md)
