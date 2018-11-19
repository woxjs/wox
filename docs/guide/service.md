---
sidebarDepth: 4
prev: /guide/mvc
next: false
---

# Web Virtual Service

虚拟web服务，是指在前端通过监听路由的改变，进行请求化线程模拟的逻辑服务。我们称为`Web Virtual Service`。设计Wox.js初衷就是可以将服务端的思想移植到前端，从特殊角度看前端也可以完全认为是服务化的。所以我们可以通过后端思想将其路由体系直接接管。不论是在前端渲染还是在后端SSR渲染，逻辑几乎可以直接打通。这就是优势所在。

但是在业界前端很少有这样的思想来驱动前端架构，之前我开源过 [Miox](https://github.com/51nb/miox) ，它也是一种服务端思想移植到前端的做法。而现在，我们明确地给它命名为 `Virtual Service`。


## 由来

通过利用 async 函数，Wox.js 帮你丢弃回调函数，并有力地增强错误处理。 Wox.js 并没有捆绑任何中间件， 而是提供了一套优雅的方法，帮助您快速而愉快地编写服务端应用程序。它主要由模块 [@wox/server](https://github.com/woxjs/server) 提供。它是由4个文件组成，分别是：

- `application.js`
- `context.js`
- `request.js`
- `response.js`

4个文件都是可以被扩展的。

```javascript {2}
import Application from './application';
class Service extends Application {
  constructor() {
    super();
  }
}
```

## 应用程序

Wox.js 应用程序是一个包含一组中间件函数的对象，它是按照类似堆栈的方式组织和执行的。 Wox.js 类似于你可能遇到过的许多其他中间件系统，例如 Ruby 的 Rack ，Connect 等，然而，一个关键的设计点是在其低级中间件层中提供高级“语法糖”。 这提高了互操作性，稳健性，并使书写中间件更加愉快。

这包括诸如内容协商，重定向等常见任务的方法。 尽管提供了相当多的有用的方法 Wox.js 仍保持了一个很小的体积，因为没有捆绑中间件。

必修的 hello world 应用:

```javascript
import Wox from '@wox/server';
import { hashChange } from '@wox/history';
const app = new Wox();
const server = new hashChange();

app.use(async ctx => {
  ctx.body = 'Hello World';
});

server.createServer(app.callback());
server.listen();
```

## app.callback()

返回适用于 `server.createServer()` 方法的回调函数来处理请求。你也可以使用此回调函数将 Wox.js 应用程序挂载到任意支持这种server方式的应用程序中。

## app.use(function)

将给定的中间件方法添加到此应用程序。

## app.render(webview, props)

用来渲染指定模板。我们可以通过数据路径写法指定。 

```javascript
ctx.render(ctx.Webview.Index, {
  aProp: 1,
  bProp: 2
})
```

webview即原生编写的Vue文件。

## app.context

app.context 是从其创建 ctx 的原型。您可以通过编辑 app.context 为 ctx 添加其他属性。这对于将 ctx 添加到整个应用程序中使用的属性或方法非常有用，这可能会更加有效（不需要中间件）和/或 更简单（更少的 require()），而更多地依赖于ctx，这可以被认为是一种反模式。

例如，要从 ctx 添加对websql的引用：

```javascript
app.context.db = db();
app.use(async ctx => {
  console.log(ctx.db);
});
```

::: tip
- ctx 上的许多属性都是使用 getter ，setter 和 Object.defineProperty() 定义的。你只能通过在 app.context 上使用 Object.defineProperty() 来编辑这些属性（不推荐）。查阅 https://github.com/koajs/koa/issues/652.
- 安装的应用程序目前使用其父级的 ctx 和设置。 因此，安装的应用程序只是一组中间件。
:::

app.context上有个特殊的属性叫`$e`，它是用来支持事件前定后置的，主要是可以在最终请求结束后知道什么时候完成，并且执行什么方法。

```javascript
this.ctx.$e.on('stop', () => {
  // do ...
})
```

## 监听请求事件

请求有开始和结束之分，所以一定会存在2个事件：

- start
- stop

```javascript
app.on('start', ctx => {});
app.on('end', ctx => {});
```

时常我们需要用到请求的拦截监听，那么我们可以在我们的`app.bootstrap.js`或者插件的`app.js`中写上需要监听的过程。

```javascript
export default app => {
  app.on('start', ctx => ctx.startTime = Date.now());
  app.on('stop', ctx => {
    console.log(`it cost ${Date.now() - ctx.startTime} ms`);
  })
}
```
