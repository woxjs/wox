---
sidebarDepth: 4
prev: ./install
next: ./virtual
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

通过命令行工具来创建文件：

```bash
cli wox index -c jsx
```

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

## 创建页面

通过命令行工具来创建

```bash
cli wox index -w
```

渲染页面其实就是一个vue的sfc文件，所以我们可以使用vue的一切特性去编辑：

```vue
<template>
  <div class="page">
    <img src="https://raw.githubusercontent.com/woxjs/wox/master/logo.svg?sanitize=true" alt="vue logo" />
    <h1>Wox.js Example</h1>
    <p class="desc">A dynamic loader MVC architecture based on <a href="https://vuejs.org/" target="_blank">Vue.js</a> development which use web virtual service and web virtual request mode.</p>
    <div class="links">
      <a href="https://github.com/woxjs/wox" target="_blank">GITHUB</a>
      <a href="https://github.com/woxjs/wox/issues" target="_blank">ISSUE</a>
      <a href="https://woxjs.github.io/" target="_blank">DOCS</a>
      <a href="https://www.npmjs.com/package/@wox/wox" target="_blank">NPM</a>
      <a href="https://www.npmjs.com/package/@wox/cli" target="_blank">COMMAND</a>
    </div>
    <h5>Web Virtual Request</h5>
    <p style="text-align:center;">{{value}} <br /><button @click="add" :disabled="doing">Add timestamp, delay 800ms.</button></p>
    <p class="copyright">Copyright@woxjs.github.io 2018-present</p>
  </div>
</template>
<script>
  export default {
    name: "IndexPage",
    data() {
      return {
        doing: false,
        value: null
      }
    },
    props: {
      timestamp: Number,
    },
    enter() {
      this.value = this.timestamp;
    },
    methods: {
      add() {
        if (this.doing) return;
        this.doing = true;
        this.$post('/timestamp', { delay: 800 }).then(timestamp => {
          this.value = timestamp;
          this.doing = false;
        }).catch(e => {
          this.doing = false;
          alert(e.message);
        });
      }
    }
  }
</script>
<style lang="less">
.page{
  padding: 100px 0;
  width:100%;
  box-sizing: border-box;
  .desc{
    padding: 0px 15px;
  }
  h5{
    border-top: 1px solid #f8f8f8;
    padding-top: 20px;
  }
  a{
    color:#46bd87;
    transition:all .3s ease-in;
    &:link,&:visited{
      text-decoration:underline;
    }
    &:hover{
      text-decoration: none;
    }
  }
  img{
    width: 100px;
  }
  &,h1, p, .links{
    text-align: center;
  }
  .links{
    margin-top: 30px;
    margin-bottom: 30px;
    a{
      padding: 0 8px;
      font-size:12px;
    }
  }
  .copyright{
    padding: 30px 0;
    font-size:10px;
    color:rgba(0,0,0,.2);
    transform: scale(.9);
    a:link,a:visited{
      color:rgba(0,0,0,.1);
    }
    a:hover{
      color:#46bd87;
    }
  }
  button{
    background-color: #46bd87;
    color:#fff;
    border: 1px solid transparent;
    padding: 8px 15px;
    border-radius: 4px;
    margin-top: 20px;
    transition: all .3s ease;
    &:disabled{
      background-color: #eee;
      color:#ccc;
    }
  }
}  
</style>
<style>
html,body{
  margin: 0;
  padding: 0;
}
</style>
```



