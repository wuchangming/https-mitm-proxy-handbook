# 第〇节：概要和思路分析

思路分析
--------
在着手写代码前，我们需要整理下思路。

<<<<<<< HEAD
<img src="img/Chapter0/MITM.png" width="650px" />
=======
本文会更侧重于代码的实现，原理会做说明，但不一定足够详尽。
>>>>>>> 088aba3fcbd6fb86da85bf9731c5b1bd1fc6e5f3




如何运行本项目代码
--------
所有用到的源码都保存在路径：[example](../example)下。

**初始化本项目代码：**  
1、[下载项目zip](https://github.com/wuchangming/https-mitm-proxy-handbook/archive/master.zip)  
2、解压zip后进入到文件夹下执行命令 `npm install` 安装依赖包。

**运行：**  
为了更加方便的运行示例代码。所有的代码都以章节的形式分类的命名放在npm script中。细节可查看[package.json](../package.json)文件

如：运行第一节中的生成CA根证书的代码。(**⚠️后一章节的代码可能会依赖前一章节代码生成的证书文件**
)
```
npm run step1
```

Node.js版本
--------

手册中使用到的js代码未对不同版本的Node.js做兼容测试。在编写代码时，我使用的Node.js版本为v4.6.0。 由于代码中使用了大量ES6的语法，在运行实例代码时，需要确保Node.js版本大于V4.4.0或者更新。


#### [第一节：生成CA根证书](./Chapter1.md)
