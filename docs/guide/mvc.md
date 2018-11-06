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

## Wox.js的动态路由化

基于restful设计理念，我们将前端路由动态化，我们通过一个路由对应一个回调函数的模式让路由的选择趋于动态化。在路由改变的时候，我们都会自动选择需要渲染的页面。这就是wox.js的优势。我们选择koa做为原型是因为它是业界（nodejs）比较成熟的企业应用级MVC架构。它的成熟的理念已经被市场检验认证过。

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
    const body = this.ctx.request.body;
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