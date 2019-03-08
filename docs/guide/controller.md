---
sidebarDepth: 4
prev: /guide/request
next: false
---

# Controller JSX

根据服务端渲染原理，比如基于[KOA](http://npmjs.com/koa)的[ejs](http://npmjs.com/ejs)模板引擎，有以下几种输出方式：

1. `ctx.body = ${html}` 直接输出HTML文本到浏览器。
2. `ctx.render(${template file path})` 通过`render`函数，并且经过模板引擎的数据转换输出到页面。
3. `ctx.body = ${json data}` 直接作为api接口输出。

那么对比这几种输出方式，我们存在一样到输出模式：

1. `return <Component></Component>` 通过jsx直接输出组件，对标1号方式。
2. `ctx.render(Component)` 通过模板引擎输出组件，对标2号方式。
3. `return {json data}` 通过`WVR`直接输出数据，虚拟请求模式，对标3号方式。

## 直接输出组件到浏览器

这是我们提倡的书写方式，可以让你更快速输出内容，而不用每次建立新的webview。通过官方安装的初始化项目，我们可以看到如下代码

```javascript {14}
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
    return <IndexPage timestamp={timestamp}></IndexPage>
  }

  @Http.Post('/timestamp')
  @Interface.Service('index', IndexService)
  async TimeStamp({ Service }) {
    const body = this.ctx.req.body || {};
    return await Service.index.getTime(body.delay);
  }
}
```

## 函数分离

这种模式将每个controller的函数转化为了VUE中的`render`方式，我们也可以将此方式进行函数分离调用。

```javascript {14,24,25,26}
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
    return this.getHTML(timestamp)
  }

  @Http.Post('/timestamp')
  @Interface.Service('index', IndexService)
  async TimeStamp({ Service }) {
    const body = this.ctx.req.body || {};
    return await Service.index.getTime(body.delay);
  }

  getHTML(time) {
    return <IndexPage timestamp={time}></IndexPage>
  }
}
```

## 通过虚拟请求获取组件

组件可以被请求分发出去，你可以通过这样的模式调用组件

```javascript {14,15,16,26,27,28,29,30,31}
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
    return await this.ctx.post('/component', {
      time: timestamp
    });
  }

  @Http.Post('/timestamp')
  @Interface.Service('index', IndexService)
  async TimeStamp({ Service }) {
    const body = this.ctx.req.body || {};
    return await Service.index.getTime(body.delay);
  }

  @Http.Post('/component')
  getHTML() {
    const body = this.ctx.req.body || {};
    if (!body.time) throw this.ctx.error('time required.');
    return <IndexPage timestamp={body.time}></IndexPage>
  }
}
```

通过这种方式，是否可以基本认定，我们存在单页面应用级的微服务呢？大家可以思考下！