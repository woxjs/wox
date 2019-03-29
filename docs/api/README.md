---
sidebarDepth: 4
---
# 接口

为了便于交流，请让我们在使用wox的开发过程中遵照一些命名约定：

- **wox** 表示`require('@wox/wox)`返回的对象。
- **app** 表示 Wox 的实例。
- **ctx** 表示虚拟请求的上下文对象。

## 全局API

### wox.Wox

wox.Wox(configs: object)

它是应用对象的母体

*参数：*

- **configs** `.wox.js`文件 [配置](/guide/runtime.html#webpack%E8%81%9A%E5%90%88%E6%96%87%E4%BB%B6-wox-js)

```javascript
const app = new wox.Wox(configs);
```

> 注意：一般我们不会直接使用这个对象，供后期`TypeScript`化时候引用。

### wox.DecorateInterface

它是注解的基本类，主要提供`set`与`get`方法。 参考：[这里](/guide/runtime.html#decorate-array)

### wox.Methods

虚拟请求的方法名，默认`['Get', 'Post', 'Put', 'Delete']`四种。

### wox.Http

虚拟请求注解方法集合：

- **wox.Http.Get(url)** get请求
- **wox.Http.Post(url)** post请求
- **wox.Http.Put(url)** put请求
- **wox.Http.delete(url)** delete请求

```javascript
@Http.Get('/api')
```

### wox.Interface

自定义注解集合体，参考：[这里](/guide/runtime.html#decorate-array) 自定义注解

### wox.Controller

wox.Controller(prefix: string)

注解Controller。

*参数：*

- **prefix** prefix前缀路由

```javascript
@Controller('/api')
```

### wox.Index

wox.Index(i: number)

注解索引，用来调整每个Controller加载的顺序，按顺序排列。

*参数：*

- **i** 索引数值默认99。

```javascript
@Index(1)
@Index(2)
```

### wox.Middleware

wox.Middleware(...midwares: Middleware)

中间件集合，表示这个路由所需要进过的中间件。

*参数：*

- **midwares** [中间件](https://hijiangtao.github.io/2017/11/10/Mastering-Koa-Middleware/)

```javascript
@Http.Get
@Middleware(Mid1)
@Middleware(Mid2)
@Middleware(Mid3, Mid4)
```

中间件可以无限堆叠，按上下文写入顺序执行。

### wox.Param

wox.Param(name: string, midw: Middleware)

param是中间件的特殊用法。具体看[这里](http://17koa.com/koa-generator-examples/http/get/params.html)

```javascript
@Controller
@Param('id', MID1)
...
// 获取
this.ctx.params.id
```

> 注意：只能使用在Controller上

## Vue扩展对象

### vm.$app

`this.$app` 返回app对象

### vm.$get

`this.$get` 调用虚拟请求

### vm.$post

`this.$post` 调用虚拟请求

### vm.$put

`this.$put` 调用虚拟请求

### vm.$del

`this.$del` 调用虚拟请求

### vm.$redirect

`vm.$redirect(url: string, sync: boolean)`

*参数：*

- **url** 跳转地址
- **sync** 是否同步跳转

### vm.$repalce

`vm.$repalce(url: string, sync: boolean)`

*参数：*

- **url** 替换地址
- **sync** 是否同步跳转

### vm.$reload

`vm.$reload()`

重载路由。


## Vue 扩展指令

### v-redirect

`v-redirect:sync="url"` 或者 `v-redirect="url"`

跳转地址

### v-replace

`v-replace:sync="url"` 或者 `v-replace="url"`

替换地址

### v-reload

`v-replace`

重载路由。

## Vue 扩展生命周期

### enter

在webview中注入了`enter`生命周期

```vue {10,11,12}
<template>
  <div>
    <h1>Welcome</h1>
    <p>{{abc}} - {{test}}</p>
  </div>
</template>
<script>
  export default {
    name: 'IndexPage',
    enter(ctx) {
      console.log('enter', ctx)
    },
    props: {
      abc: Number,
      test: String
    }
  }
</script>
```

### leave

在webview中注入了`leave`生命周期

```vue {10,11,12}
<template>
  <div>
    <h1>Welcome</h1>
    <p>{{abc}} - {{test}}</p>
  </div>
</template>
<script>
  export default {
    name: 'IndexPage',
    leave(ctx) {
      console.log('leave', ctx)
    },
    props: {
      abc: Number,
      test: String
    }
  }
</script>
```

## 虚拟服务对象

### app.$parser

我们只需要关注一个对象`configs`，用来提起`.wox.js`中的数据。

```javascript
app.$parser.configs;
```

### app.$plugin

插件树对象。管理插件。

#### app.$plugin.setDecorate(clazz)

添加一个注解

#### app.$plugin.set(name, target)

添加一个名为`name`的插件`target`对象到插件树中

#### app.$plugin.get(name)

获取一个名为`name`的插件

#### app.$plugin.getConfig(name)

获取一个名为`name`的插件的配置参数

### app.$router

app对象的顶层路由对象，具体参考[koa-router](https://github.com/ZijianHe/koa-router)

### app.$env

当前的环境变量

### app.$vue 建议更名为：app.$vm

Vue实例化后被挂载到app上到对象，也就是根`vm`

### app.$fetch

`app.$fetch(options)`

通用获取虚拟请求的方法

*参数：*

- **url** `string` 地址
- **method** `string` 请求方式
- **body** `any` 请求传递数据

```javascript
app.$fetch({
  url: '/api',
  method: 'POST',
  body: {
    a: 1
  }
}).then(console.log)
```

### app.$get

同 [vm.$get](#vm-get)

### app.$post

同 [vm.$post](#vm-post)

### app.$put

同 [vm.$put](#vm-put)

### app.$delete

同 [vm.$del](#vm-delete)

### app.$redirect

同 [vm.$redirect](#vm-redirect)

### app.$replace

同 [vm.$replace](#vm-replace)

### app.$reload

同 [vm.$reload](#vm-reload)

## 虚拟请求对象

### ctx.app
指向当前项目中的Wox实例。

### ctx.render
可以把这个方法看作是由 Vue 提供的 [createElement](https://cn.vuejs.org/v2/guide/render-function.html#createElement-%E5%8F%82%E6%95%B0) 函数的别名。

### ctx.req

request 对象

### ctx.res

response 对象

### ctx.status
状态码

### ctx.id

虚拟请求ID

### ctx.isapi

是否是虚拟请求

### ctx.bdoy

结果返回体

### ctx.url

当前请求url

### ctx.method

当前请求方式

### ctx.path

当前请求路径

### ctx.query

返回当前请求的查询参数

### ctx.search

当前请求search

### ctx.host

当前请求host

### ctx.hostname

当前请求hostname

### ctx.protocol

当前请求协议

### ctx.referer

当前请求来源

### ctx.redirect

同 [app.$redirect](#app-redirect)

### ctx.replace

同 [app.$replace](#app-replace)

### ctx.reload

同 [app.$reload](#app-reload)

### ctx.get

同 [app.$get](#app-get)

### ctx.post

同 [app.$post](#app-post)

### ctx.put

同 [app.$put](#app-put)

### ctx.delete

同 [app.$delete](#app-delete)