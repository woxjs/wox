---
sidebarDepth: 4
prev: ./
next: ./usage
---

# 安装及启动

由于此架构不是纯粹的模块架构，所以需要辅助的工具来支持。

## 安装

请根据步骤通过脚手架创建新项目

### 第一步

您需要安装一套通用的脚手架，此脚手架用来管理`wox`的所有插件的功能。可以理解为它是一个插件容器，只负责安装插件、升级插件以及卸载插件等功能。

```bash
$ npm i -g @evio/cli
```

至于如何开发插件脚手架功能，请前往[这里](../cli/#evio-cli)查看

### 第二步

您需要安装`wox`专属脚手架，它用来具有以下功能：

1. 创建新的`wox`项目
2. 创建新的`wox`插件
3. 自动安装`wox`插件
4. 自动生成文件类型模板文件

```bash
$ cli install @wox/cli
```
详细命令文档请参看[这里](../cli/#wox-cli)。

### 第三步

创建一个新的项目

```bash
$ cli wox:new
```

根据提示生成项目后请使用`cd <project>`进入项目。

## 启动

我们采用[@vue/cli](https://cli.vuejs.org)的官方工具来启动我们的应用，命令已内置。

### 开发

通过webpack启动开发模式。

```bash
$ npm run dev
```

### 编译

打包生成文件，默认生成在`dist`目录下。

```bash
$ npm run build
```

## Webpack

我们对此项目仅仅做了如下的修改：

1. [改变了打包入口](https://github.com/woxjs/template/blob/master/vue.config.js#L7)
2. [添加了**node_modules**下的依赖模块编译](https://github.com/woxjs/template/blob/master/vue.config.js#L14)
3. [添加了wox的webpack插件支持](https://github.com/woxjs/template/blob/master/vue.config.js#L17)
4. [添加了主项目的\`#\`的别名地址](https://github.com/woxjs/template/blob/master/vue.config.js#L18)

如果你对`Vue`官方提供的工具比较熟悉的话可以自行修改`vue.config.js`下的配置。