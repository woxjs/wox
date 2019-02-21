---
sidebarDepth: 4
prev: false
next: ./mvc
---
# 渐进式开发指南

## 兼容性

Vue 不支持 IE8 及以下版本，因为 Vue 使用了 IE8 无法模拟的 ECMAScript 5 特性。但它支持所有兼容 [ECMAScript 5](https://caniuse.com/#feat=es5) 的浏览器。同理，Wox.js 的兼容性取决于 Vue 的兼容性。

## Vue Devtools

在使用 Vue 时，我们推荐在你的浏览器上安装 [Vue Devtools](https://github.com/vuejs/vue-devtools#vue-devtools)。它允许你在一个更友好的界面中审查和调试 Vue 应用。

## CLI

使用Wox.js架构的时候，推荐通过 [CLI](/cli/) 工具创建项目，不建议通过引入原始文件自行创建。

```bash
# 安装脚手架
npm i -g @node/cli 

# 安装脚手架插件
cli install @wox/cli 
```

::: warning
CLI 工具假定用户对 Node.js 和相关构建工具有一定程度的了解。如果你是新手，我们强烈建议先在不用构建工具的情况下通读 **[指南](/guide/)**，在熟悉 wox.js 本身之后再使用 CLI。
:::

## 创建项目

使用 CLI 工具创建一个新的项目：

```bash
# 创建新项目
cli wox:new [project]

# 进入项目目录
cd <project>

# 安装依赖
npm i

# 开始编码
npm run dev
```

## 目录结构

```
.
├─ README.md
├─ package.json
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

- `controller/` controller文件存放
- `middleware/` middleware中间件文件存放
- `service/` service model层文件存放
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

