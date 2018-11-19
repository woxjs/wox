---
sidebarDepth: 4
prev: /guide/
next: /guide/service
---

# 深入理解MVC模型

[MVC](https://baike.baidu.com/item/MVC%E6%A1%86%E6%9E%B6/9241230?fr=aladdin&fromid=85990&fromtitle=MVC) 开始是存在于桌面程序中的，M是指业务模型，V是指用户界面，C则是控制器，使用MVC的目的是将M和V的实现代码分离，从而使同一个程序可以使用不同的表现形式。比如一批统计数据可以分别用柱状图、饼图来表示。C存在的目的则是确保M和V的同步，一旦M改变，V应该同步更新。

Wox.js 采用mvc模型来管理整个请求模型，同时结合Vue.js的 [MVVM](https://baike.baidu.com/item/MVVM) 模型，使得数据驱动变得非常简便。我们采用 [KOA](https://github.com/koajs/koa) 模型来构建前端的web服务体系，解决传统前端路由的通病。

## Vue-router

[Vue-router](https://router.vuejs.org/)是vue的标准路由，但它是一种静态路由，而非动态路由。

所谓静态路由，就是一个路由对应一个component组件，只要路由确定页面一定是确定的。它的优势在于能够快速确定渲染页面，性能很高。但是它的优势也成为了它的劣势。往往我们在后台系统界面中，可能会出现一个路由并非对应一个component组件页面，而是需要一些变量来决定使用哪个页面。Vue-router 无法做到。

在这里我们强补下路由概念：

- 静态路由：`Router = Component` 路由与页面一一对应，无论任意时间来观察页面，显示的内容都是一致的，表现为感官上的一致；实际运行时表现为路由与组件的一一对应。
- 动态路由：`Router = ComponentRender()` 路由根据时间或者环境的变化，会产生不一致的渲染效果，感官上表现为不同的页面；实际上路由应该对应的并非组件，而是一个选取组件的回调函数，比如`react-routerV4`中的render用法。

为了能够在PC端后台系统上可以完美解决各种路由规则以及拦截（中间件）的问题，我们摒弃了`vue-router`，因为在`Vue-router`上，我们需要写各种`hooks`才能完成我们需要的工作，大大增加了我们的开发成本。

## Wox.js的动态路由化

基于restful设计理念，我们将前端路由动态化，我们通过一个路由对应一个回调函数的模式让路由的选择趋于动态化。在路由改变的时候，我们都会自动选择需要渲染的页面。这就是wox.js的优势。我们选择koa做为原型是因为它是业界（nodejs）比较成熟的企业应用级MVC架构。它的成熟的理念已经被市场检验认证过。

同时，基于自身带有`Virtual Service`的理念存在，也可以自获取数据，而脱离服务端的数据返回。类似 `this.$wox.post('/api', {})` 的调用模式，以及我们在controller层对此路由的定义`@Post('/api')`。

## 数据路径

所谓数据路径，就是指数据链路，而在此，我们指文件路径的特殊格式化。比如

```bash
/abc/efg # Abc.Efg
/a/b/c/d/e/f/g # A.B.C.D.E.F.G
/ab_cd/xx-dd # AbCd.XxDd
```

它的规则就是文件夹或者文件名的驼峰化，通过`.`号相连等到的数据表达式。wox.js中都是通过这样的表达式来获取数据的。

## 编写你的MVC代码
 
下面，将讲解如何一步一步创建MVC中的各层。

::: warning
我们建议使用工具创建我们的文件，在创建的文件基础上可自行修改。
:::

### Controller

controller层文件都是基于class的写法，同时使用注解形式标记路由规则。请看：

```javascript {7,8,13}
import { 
  Get,
  Controller,
  ApplicationComponent,
} from '@wox/basic';

@Controller('/')
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

#### 注解

所谓[注解](http://web.jobbole.com/88572/)，一般可以理解为注释，在ES中的叫法为`装饰器`，在js的世界中，它具有执行意义。wox.js中注解有这么几个:

- `@Controller(prefix)` 标记该函数是一个controller函数，并且设置prefix前缀
- `@Use(name, ...args)` 标记这个前端所使用的中间件，中间件名为name，参数为args。
- `@Get(path)` 标记这个controller下有一个Get方式的请求，同时设置path规则。
- `@Post(path)` 标记这个controller下有一个Post方式的请求，同时设置path规则。
- `@Put(path)` 标记这个controller下有一个Put方式的请求，同时设置path规则。
- `@Delete(path)` 标记这个controller下有一个Delete方式的请求，同时设置path规则。
- `@Middleware(name, ...args)` 标记这个path规则，所使用的中间件。中间件名为name，参数为args。

#### Restful api

内部可以通过fetch方法来调用自己的逻辑。它被绑定在`app.controller`上，主要有以下几个方法：

- `get(url)`
- `post(url, data)`
- `put(url, data)`
- `delete(url)`

```javascript {2,8,16,25,26}
import { 
  Get, Post,
  Controller,
  ApplicationComponent,
} from '@wox/basic';

@Controller('/')
@Use('Test')
export default class DemoController extends ApplicationComponent {
  constructor(ctx) {
    super(ctx);
  }

  @Get('/')
  async welcome() {
    const res = await this.ctx.post('/test', {
      action: 'jump'
    });
    await this.ctx.render(this.ctx.Webview.Index, {
      text: res // abc jump
    });
  }

  @Post('/test')
  @Middleware('Auth.Cert', 'v2', 'test')
  @Middleware('User.Login')
  async test() {
    const body = this.ctx.req.body;
    this.ctx.body = 'abc ' + body.action;
  }
}
```

### Middleware

中间件，用来拦截请求并且自定义处理。它被绑定在`app.Middleware`上

```javascript
export default async (ctx, next) => {
  ctx.abc = 123;
  await next();
}
```
这跟我们的koa中间件写法一致。但是我们还提供了一种写法：

```javascript
export default app => {
  return async (ctx, next) => {
    ctx.abc = 123;
    await next();
  }
}
```

::: tip
由于Wox.js是基于Koa模型建立，那么部分非涉及到环境变量的Koa中间件都可以直接在前端使用。如果善用中间件模型，那么将使代码非常逻辑化和简单化。本中间件模型也支持`.param(value, ctx, next)`模式，具体参考Koa的`param`使用方式。
:::

### Service

用来处理具体业务逻辑。它被绑定在`ctx.Service`上

```javascript
// demo.js
import { ContextComponent } from '@wox/basic';
export default class DemoService extends ContextComponent {
  constructor(ctx) {
    super(ctx);
    this.abc = 'abc';
  }

  async hello() {
    return this.abc + 'def';
  }
}
```
在controller上可以这样使用

```javascript
async controller() {
  this.ctx.body = await this.Service.Demo.hello();
}
```

### Webview

即一个页面组件，写法就是vue的写法。但是通过`ctx.render`进行调用。

```javascript
async controller() {
  await this.ctx.render(this.ctx.Webview.Index);
}
```

### AsyncWebview

异步页面组件，同Webview。

## MVC结构总结

我们通过`Controller` `Middleware` `Service` 以及 `Webview` 将项目整体串联在一起，达到可高度复用的目的。之后介绍的插件模式，将详细讲解如何高度复用，以及高度继承。