---
home: true
heroImage: https://raw.githubusercontent.com/woxjs/wox/master/logo.svg?sanitize=true
actionText: 快速上手 →
actionLink: /guide/
features:
- title: Virtual Service
  details: 以中间件模型打造的虚拟服务体系，通过虚拟服务请求方式进行子服务间的业务解偶，使得代码组织与业务模块架构更加标准化。
- title: Based on Vue.js
  details: 将`Vue.js`作为底层数据驱动引擎，让数据MVVM动态响应化，享受Vue.js生态带来的一切特性以及支持，快速构建你想要的页面。
- title: Super Plugins
  details: 插件不仅仅以`UI Components`为目的，更重要的是提供主从继承的能力，使得整个项目可以仅仅通过配置插件完成，达到业务模块组件化效果。
footer: MIT Licensed | Copyright © 2018-present Evio Shen
---

## Create project easily

```bash {3}
# 安装脚手架工具
$ npm i @evio/cli -g
$ cli install @wox/cli

# 创建项目
$ cli wox:new

# 启动开发
$ npm run dev
```

## Example

> 定义一个`controller`用来路由：*File: ~/demo/app/controller/index.js*

```javascript
import { Http, Controller } from '@wox/wox';
import IndexPage from '../webview/index.vue';

@Controller
export default class IndexController {
  @Http.Get
  async Home() {
    await this.ctx.render(IndexPage, {
      abc: 123,
      test: 'Hello world'
    });
  }
}
```

> 定一个一个页面渲染模板：*File: ~/demo/app/webview/index.vue*

```vue
<template>
  <div>
    <h1>Welcome</h1>
    <p>{{abc}} - {{test}}</p>
  </div>
</template>
<script>
  export default {
    name: 'IndexPage',
    props: {
      abc: Number,
      test: String
    }
  }
</script>
```