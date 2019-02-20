---
sidebarDepth: 4
prev: /guide/mvc
next: /guide/config
---

# Web Virtual Service

虚拟web服务，是指在前端通过监听路由的改变，进行请求化线程模拟的逻辑服务。我们称为`Web Virtual Service`(`WVS`), 而每个请求被称为`Web Virtual Request`(`WVR`)。设计Wox.js初衷就是可以将服务端的思想移植到前端，从特殊角度看前端也可以完全认为是服务化的。所以我们可以通过后端思想将其路由体系直接接管。不论是在前端渲染还是在后端SSR渲染，逻辑几乎可以直接打通。这就是优势所在。

但是在业界前端很少有这样的思想来驱动前端架构，之前我开源过 [Miox](https://github.com/51nb/miox) ，它也是一种服务端思想移植到前端的做法。而现在，我们明确地给它命名为 `Virtual Service`。


## 由来

通过利用 async 函数，Wox.js 帮你丢弃回调函数，并有力地增强错误处理。 Wox.js 并没有捆绑任何中间件， 而是提供了一套优雅的方法，帮助您快速而愉快地编写服务端应用程序。它主要由模块 [@wox/wox/src/service/](https://github.com/woxjs/wox/tree/dev/src/service) 提供。它是由4个文件组成，分别是：

- `index.js`
- `context.js`
- `request.js`
- `response.js`

4个文件都是可以被扩展的。

```javascript {2}
import Application from '@wox/wox/src/service/index';
class Service extends Application {
  constructor(...args) {
    super(...args);
  }
}
```

## 应用程序

Wox.js 应用程序是一个包含一组中间件函数的对象，它是按照类似堆栈的方式组织和执行的。 Wox.js 类似于你可能遇到过的许多其他中间件系统，例如 Ruby 的 Rack ，Connect 等，然而，一个关键的设计点是在其低级中间件层中提供高级“语法糖”。 这提高了互操作性，稳健性，并使书写中间件更加愉快。

这包括诸如内容协商，重定向等常见任务的方法。 尽管提供了相当多的有用的方法 Wox.js 仍保持了一个很小的体积，因为没有捆绑中间件。

必修的 hello world 应用:

```javascript
import Wox from '@wox/wox/src/service/index';
const app = new Wox();

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.createServer().catch(e => app.destroyServer());
```

## 中间件

将给定的中间件方法添加到此应用程序。

```javascript
app.use(async (ctx, next) => {
  await next();
})
```

## 渲染模板

用来渲染指定模板。我们可以通过数据路径写法指定。 

```javascript
ctx.render(webview, {
  aProp: 1,
  bProp: 2
})
```

webview即原生编写的Vue文件。

## 虚拟线程对象

`app.context` 是从其创建 `ctx` 的原型。您可以通过编辑 `app.context` 为 `ctx` 添加其他属性。这对于将 `ctx` 添加到整个应用程序中使用的属性或方法非常有用，这可能会更加有效（不需要中间件）和/或 更简单（更少的 `require()`），而更多地依赖于`ctx`，这可以被认为是一种反模式。

例如，要从 ctx 添加对websql的引用：

```javascript
app.context.db = db();
app.use(async ctx => {
  console.log(ctx.db);
});
```

::: tip
- ctx 上的许多属性都是使用 `getter` ，`setter` 和 `Object.defineProperty()` 定义的。你只能通过在 `app.context` 上使用 `Object.defineProperty()` 来编辑这些属性（不推荐）。查阅 [https://github.com/koajs/koa/issues/652](https://github.com/koajs/koa/issues/652).
- 安装的应用程序目前使用其父级的 `ctx` 和设置。 因此，安装的应用程序只是一组中间件。
:::

## 监听请求事件

请求有开始和结束之分，所以一定会存在2个事件：

- `start` 虚拟线程开始触发的事件 
- `stop` 虚拟线程结束触发的事件

```javascript
app.on('start', async ctx => {});
app.on('end', async ctx => {});
```

时常我们需要用到请求的拦截监听，那么我们可以在我们项目的`app.js`或者插件的`app.js`中写上需要监听的过程。

```javascript
export default app => {
  app.on('start', ctx => ctx.startTime = Date.now());
  app.on('stop', ctx => {
    console.log(`it cost ${Date.now() - ctx.startTime} ms`);
  })
}
```

## 虚拟请求

因为每个插件都是一个虚拟微服务，那么我们可以定义一些接口，供其他功能插件或者主服务使用。

```javascript
import { Http, Controller } from '@wox/wox';
@Controller('/test')
class Demo {
  @Http.Post('/value/:id(\\d+)')
  async GetValueById() {
    const id = this.ctx.params.id;
    const body = this.ctx.req.body;
    return {
      value: id + 'webafdsaf',
      body
    }
  }
}
```

我们可以在其他其他服务上通过一下方式调用

```javascript
ctx.$post('/test/value/123').then(({ value, body }) => {
  console.log(value, body);
})
```

## 插件作用域

所谓插件作用域，即插件所有代码调用不能超越自身所在的文件夹范围，如需要调用其他插件的功能得到需要，需要在其他插件上定义接口供本插件调用。

比如如下的调用是错误的

```javascript
// 如果我们现在在 abc 插件下
import CDE from 'cde/app/service/index';
@Controller('/test')
class Demo {
  @Http.Post('/value/:id(\\d+)')
  async GetValueById() {
    const id = this.ctx.params.id;
    const body = this.ctx.req.body;
    const abc = new CDE();
    return {
      value: id + 'webafdsaf',
      body,
      test: await abc.get()
    }
  }
}
```
当然，这样调用一定没有问题，但是不符合我们WVR规范，也会导致插件代码的难以维护性，所以，需要做插件内部scope域的限制约定。
