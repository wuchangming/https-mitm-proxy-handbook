# 第〇节：前言

## 概要
在实际生产中面对越来越多的流量劫持和运营商劫持，HTTPS在信息安全方面的保障得到了更多重视。本文章的目的是想从一个更直观的角度认识HTTPS，了解HTTPS是如何保证信息安全，而在何种情况下HTTPS也是不安全的。本文会通过实现一个简单的中间人代理来认识其中的原理。MITM（中间人）代理的技术手段在实际开发和测试中我们经常用到。调试接口、查看HTTP请求与响应时我们用的抓包调试工具如：[Fiddler](http://www.telerik.com/fiddler)、 [Charles](https://www.charlesproxy.com/)，就是基于该原理实现的。  

本文会更侧重于代码的实现，原理会做说明，但不一定足够详尽。

## 如何运行项目源码
所有用到的源码都保存在路径：[example](../example)下。

**初始化本项目代码：**  
1、[下载项目zip](https://github.com/wuchangming/https-mitm-proxy-handbook/archive/master.zip)  
2、解压zip后进入到文件夹下执行命令 `npm install` 安装依赖包。

**运行：**  
为了更加方便的运行示例代码。所有的代码都以章节的形式分类的命名放在npm script中。细节可查看[package.json](../package.json)文件

如：运行第一节中的生成CA根证书的代码。
```
npm run step1
```

**⚠️后一章节的代码可能会依赖前一章节代码生成的证书文件**

## Node.js版本

手册中使用到的js代码未对不同版本的Node.js做兼容测试。在编写代码时，我使用的Node.js版本为v4.6.0。 由于代码中使用了大量ES6的语法，在运行实例代码时，需要确保Node.js版本大于V4.4.0或者更新。

## 问题反馈
如本文有原理上或者是代码层面的错误，再或者是任何方面的问题，都欢迎提[issue](https://github.com/wuchangming/https-mitm-proxy-handbook/issues/new)和Pull Request!

### [下一节：生成CA根证书](./Chapter1.md)
