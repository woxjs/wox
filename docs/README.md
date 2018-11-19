---
home: true
heroImage: https://cn.vuejs.org/images/logo.png
actionText: 快速上手 →
actionLink: /guide/
features:
- title: Virtual Service
  details: 以 KOA 为基础模型的路由体系打造最全面而且最灵活的路由架构。支持 Restful Api 模型设计，体现 Virtual Service 的强大之处。
- title: Based on Vue.js
  details: 将Vue.js作为底层数据驱动引擎，数据MVVM化，享受Vue.js生态带来的一切特性以及支持，快速构建你想要的页面。
- title: Powerful Plugins
  details: 插件不仅仅以 UI Components 为目的，更重要的是提供继承主项目功能的能力。它可以表现为数据、UI、或者路由以及业务逻辑。
footer: MIT Licensed | Copyright © 2018-present Evio Shen
---

## Create project easily

```bash {5}
# 安装脚手架工具
$ npm i @wox/cli -g

# 创建项目
$ wox new

# 启动开发
$ npm run dev
```

## Example

File: ~/demo/app/controller/index.js

```javascript
import { Get, Controller, ApplicationComponent } from '@wox/basic';

@Controller
export default class DemoController extends ApplicationComponent {
  constructor(ctx) {
    super(ctx);
  }

  @Get('/')
  async welcome() {
    await this.ctx.render(this.ctx.Webview.Index);
  }
}
```

File: File: ~/demo/app/webview/index.vue

```vue
<template>
  <div>Hello World!</div>
</template>
<script>
  export default {
    name: "IndexPage"
  }
</script>
```