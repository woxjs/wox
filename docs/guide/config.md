---
sidebarDepth: 4
prev: /guide/service
next: /guide/runtime
---

# 配置

wox的配置主要配置在主项目上，通过以下文件格式来指定：

- `config.${env}.(json|js)` 项目配置
- `plugin.json` 插件列表
- `plugin.${env}.json` 插件配置

它们都存放在`/config/`文件夹下。`env`则是自定义环境的变量。

## 项目配置

它有两种格式结尾`.json``.js`，如果两种格式都存在，那么将使用`Object.assign`来自动合并配置。

### 系统配置

用于设定项目整体（宏观）的功能。它主要有一下的配置参数：

- **mode** `string` history监听模式。
- **el** `HTMLElement|string` 渲染节点。
- **url** `string` 默认跳转链接。

监听模式主要分`hash`与`html5`，分别对应`hashchange`与`popstate`，这两种模式在前端最为常用，而`hashchange`几乎全部支持。

> 注意：当我们定义为 `mode: 'html5'` 的时候，但是浏览器不支持`popstate`模式，那么将会自动降级为`mode:'hash'`。

#### Hash

hash即URL中"#"字符后面的部分。

1. 使用浏览器访问网页时，如果网页URL中带有hash，页面就会定位到id（或name）与hash值一样的元素的位置；
2. hash还有另一个特点，它的改变不会导致页面重新加载；
3. hash值浏览器是不会随请求发送到服务器端的；
4. 通过window.location.hash属性获取和设置hash值。

`window.location.hash`值的变化会直接反应到浏览器地址栏（#后面的部分会发生变化），同时，浏览器地址栏hash值的变化也会触发`window.location.hash`值的变化，从而触发`onhashchange`事件。

hashchange事件（IE8已支持该事件）

1. 当URL的片段标识符更改时，将触发hashchange事件（跟在#符号后面的URL部分，包括#符号）
2. hashchange事件触发时，事件对象会有hash改变前的URL（oldURL）和hash改变后的URL（newURL）两个属性

```javascript
window.addEventListener('hashchange',function(e) { 
  console.log(e.oldURL);  
  console.log(e.newURL);
},false);
```

我们将这种类型定义为`hash`类型。

#### Popstate

Popstate相关的内容包含三个东西：2个api和一个事件。2个api分别是`history.pushState`和`history.replaceState`，1个事件是指`window.onpopstate`事件。`pushState`提供给我们的是一种在不改变网页内容的前提下，操作浏览器历史记录的能力。`history.pushState`和`history.replaceState`都不会触发`popstate`事件。

```javascript
history.pushState(stateObj,title,url);
```

我们将这种类型定义为`html5`类型。

### 自定义配置

除了系统配置之外，你可以自定义一些配置（无格式要求），你可以通过一下的方式拿到这些配置，这样有利于整体上的配置：

```javascript
app.$config
```

## 插件列表

插件列表主要记录着插件的加载状态与加载顺序。它主要分一下几个参数配置：

- **enable** `boolean|undefined` 是否启用插件。当为`undefined`的时候，默认为`true`。
- **env** `string|Array<string>|undefined` 限定插件加载的环境变量或者变量列表。当为`undedined`的时候，默认加载。
- **dependencies** `string|Array<string>|undefined` 设定插件加载的依赖，可以理解为前置插件必须存在。它可以是一个插件名，也可以是一个插件名所组成的列表。当为`undefined`的时候，不依赖任何插件，加载优先级最高。
- **path** `string|undefined` 这个选项只在开发模式下有效，表示插件的开发目录，建议开发插件的时候，将插件目录位于主项目下开发，`path`指向插件文件夹。

> 注意：插件的加载与参数改变必须重启项目的webpack。

## 插件配置

插件相当于一个个的微服务，插件的配置相当于不同服务的配置。我们可以理解为一个插件为一个类似的`UI Component`，那么它具有输入与输出的`I/O`模型。我们提倡完成考虑插件的通用型，所以需要将可变的部分通过参数的模式暴露出来，可供用户修改。

比如我们插件需要使用到请求，那么请求的通用配置可以提炼出来让用户配置：

```json
{
  "ajax": {
    "url": "http://example.com",
    "headers": {
      "Authorization": "basic eulcxna89=="
    }
  }
}
```

用户在制作插件的时候可以通过如下的方法拿到参数配置：

文件位于：*/app.js*

```javascript
export default async (app, plugin) => {
  console.log(plugin.$config);
}
```

> 注意：在制作插件的时候，通常我们会提供一个配置参数的列表文件(`/.wox.config.json`)，供安装时候系统自动将此文件内容注入到主项目中。