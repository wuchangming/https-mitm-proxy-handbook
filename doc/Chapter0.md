# 第〇节：思路分析

思路分析
--------

在着手写代码前，我们需要整理下思路。

中间人代理，其实逻辑上非常好理解。先看一段[维基百科的描述](https://zh.wikipedia.org/wiki/%E4%B8%AD%E9%97%B4%E4%BA%BA%E6%94%BB%E5%87%BB)：`中间人攻击（Man-in-the-middle attack，缩写：MITM）是指攻击者与通讯的两端分别创建独立的联系，并交换其所收到的数据，使通讯的两端认为他们正在通过一个私密的连接与对方直接对话，但事实上整个会话都被攻击者完全控制。`  

**中间人攻击示意图：**  
<img src="img/Chapter0/MITM.png" width="650px" />

现在可以明确本项目的目标：**建立一个可以同时与客户端和服务端进行通信的网络服务。**

如何运行本项目代码
--------
所有用到的源码都保存在路径：[code](../code)下。

**初始化本项目代码：**  
1、[下载项目zip](https://github.com/wuchangming/https-mitm-proxy-handbook/archive/master.zip)  
2、解压zip后进入到文件夹下执行命令 `npm install` 安装依赖包。

**运行：**  
为了更加方便的运行示例代码。所有的代码都放在npm script中。细节可查看[package.json](../package.json)文件

如：运行启动一个http代理服务的命令。
```
npm run httpProxy
```
**⚠️后一章节的代码可能会依赖前一章节代码生成的证书文件**

Node.js版本
--------

本文中使用到的js代码未对不同版本的Node.js做兼容测试。在编写代码时，我使用的Node.js版本为v4.6.0。 由于代码中使用了大量ES6的语法，在运行实例代码时，需要确保Node.js版本大于V4.4.0或者更新。


#### [第一节：HTTP中间人代理实现](./Chapter1.md)
