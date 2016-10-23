# 第〇节：前言

## 概要
在实际生产中面对越来越多的流量劫持和运营商劫持，HTTPS在信息安全方面的保障得到了更多重视。本文章的目的是想从一个更直观的角度认识HTTPS，了解HTTPS是如何保证信息安全，而在何种情况下HTTPS也是不安全的。本文会通过实现一个简单的中间人代理来认识其中的原理。MITM（中间人）代理的技术手段在实际开发和测试中我们经常用到。调试接口、查看HTTP请求与响应时我们用的抓包调试工具如：[Fiddler](http://www.telerik.com/fiddler)、 [Charles](https://www.charlesproxy.com/)，就是基于该原理实现的。  

本文会更侧重于代码的实现，原理上有会做说明，但不一定足够详尽。

## Node.js版本

手册中使用到的js代码未对不同版本的Node.js做兼容测试。在编写代码时，我使用的Node.js版本为v4.6.0。 由于代码中使用了大量ES6的语法，在运行实例代码时，需要确认Node.js版本大于V4.4.0或者更新。

## 问题反馈
如本文有原理上或者是代码层面的错误，再或者是任何方面的问题，都欢迎提[issue](https://github.com/wuchangming/https-mitm-proxy-handbook/issues/new)和Pull Request!

### [下一章：生成CA根证书](./Chapter1.md)
