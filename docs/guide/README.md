---
sidebarDepth: 4
prev: false
next: ./install
---

# 简介

本教程阅读，需要统一约定以下内容，请务必参看。

- `WVS` 虚拟服务
- `WVR` 虚拟请求

在阅读前请抛弃掉`Vue`的全家桶概念，只保留对`Vue`的理解，它将彻底颠覆您平常开发`Vue`的概念和模式以及思路。如果您对服务端路由概念比较清楚，而且对`express`或者`koa`的使用有丰富的经验，那么这将对您理解`Wox`的开发理念起到非常大的帮助。

开篇之前，我声明此架构如果使用，会对公司内部技术体系产生冲撞，请慎重使用。一般大公司内部都具有自己独立的技术体系，难以迭代使用此架构，而小型公司，未形成自己的技术体系，可以尝试使用，它能够帮助您快速突破眼前的窘境，构建便于维护和开发的技术体系。

## 开源

此架构设计初衷是为了解决互金公司多App多马甲的痛点，但随着对架构的思考，我们觉得可以对外开源，能够通用的解决业务组件化的问题。开源及下载地址如下：

### Github

[https://github.com/woxjs/wox](https://github.com/woxjs/wox)

### Npm

[https://www.npmjs.com/package/@wox/wox](https://www.npmjs.com/package/@wox/wox)

## 生态

为了让架构得到更多的业务组件支持，设计了一整套插件模式。官方提供了少量的生态支持，更多生态内容需要开发者共同来贡献。

- **[@wox/cli](https://github.com/woxjs/cli)** 创建项目、创建插件以及解决自动生成文件类型模板的问题。
- **[@wox/loader](https://github.com/woxjs/loader)** webpack插件，用来支持wox项目自动搜索文件索引的开发模式。
- **[@wox/vuex](https://github.com/woxjs/vuex)** wox插件，用来支持使用`Vuex`来管理数据。

## 反馈

如果觉得这个架构比较适合您开发，或者您的公司已经使用了此架构作为核心开发架构，欢迎通过电子邮件告诉我，我将这些案例展示到项目首页。

Email: [evio@vip.qq.com](mailto:evio@vip.qq.com)

```
.
├─ README.md
├─ package.json
├─ vue.config.js
├─ babel.config.js
├─ app.vue
├─ app.js
├─ app
│  ├─ controller
│  │  └─ index.js
│  ├─ middleware
│  ├─ vue
│  │  ├─ component
│  │  ├─ directive
│  │  ├─ filter
│  │  └─ mixin
│  ├─ webview
│  │  └─ index.vue
│  └─ service
└─ config
   ├─ plugin.json
   ├─ config.development.json
   ├─ config.production.json
   ├─ plugin.development.json
   └─ plugin.production.json
```

### 主项目目录

文件夹`/app/`下为主要的项目文件目录。主要有以下目录结构：

- `controller/` controller的作用类似与vue-router，用于存放可异步获取的数据的路由规则。
- `middleware/` middleware文件夹存放用于改装虚拟请求的中间件。
- `service/` service文件夹用于存放
- `webview/` 同步页面文件存放
- `vue/component/` 组件文件存放
- `vue/directives/` 指令文件存放
- `vue/filter/` filter存放文件
- `vue/mixin/` mixin文件存放


### 插件配置目录

文件夹 `/config/`下为主要的插件配置文件存放目录。主要有以下文件：

- `plugin.json` 插件列表文件
- `plugin.development.json` 开发环境插件配置文件
- `plugin.production.json` 生产环境插件配置文件

### 本项目配置目录

本项目需要一些自定义的配置，那么我们可以通过配置此文件夹下的文件内容来改变：

- `config.development.js` 开发环境配置文件
- `config.production.js` 生产环境配置文件

[MIT](http://opensource.org/licenses/MIT)