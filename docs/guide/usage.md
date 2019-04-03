---
sidebarDepth: 4
prev: ./install
next: false
---

# 第一个Wox程序

不论是主项目还是插件项目，它的核心文件主要都在`app`文件夹下。

- `app` 核心文件目录
- `app.js` 启动文件
- `app.vue` 启动模板
- `config` wox项目配置文件夹

整体目录结构如下：

``` {5,6,7,19}
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

## 启动文件

当`Wox`启动的时候，会加载`app.js`来做前置任务。

```javascript
export default (app, plugin) => {
  console.log('project is starting');
}
```

你也可以通过生命周期来初始化一些功能。

- `app` 程序执行时唯一的主对象。
- `plugin` 只有在插件中，这个参数才存在。主项目下这个参数不存在。它包含来插件的所有信息及方法。

## 启动模板

我们可以自定义模板，但是`<WoxViewPage></WoxViewPage>`是必须的，否则无法显示页面。

```vue
<template>
  <WoxViewPage></WoxViewPage>
</template>
<script>
  export default {
    name: 'Application'
  }
</script>
<style lang="less" scoped></style>
```

## 定义路由

我们可以通过`app/controller`下的文件来定义路由。每个`Controller`的写法都是AOP模式，比如：

```javascript
import {
  Http,
  Controller,
  Interface
} from '@wox/wox';
import IndexPage from '../webview/index.vue';
import IndexService from '../service/index';

@Controller
export default class IndexController {
  @Http.Get
  async Home() {
    const timestamp = await this.ctx.post('/timestamp');
    return <IndexPage timestamp={timestamp} />
  }

  @Http.Post('/timestamp')
  @Interface.Service('index', IndexService)
  async TimeStamp({ Service }) {
    const body = this.ctx.req.body || {};
    return await Service.index.getTime(body.delay);
  }
}
```



