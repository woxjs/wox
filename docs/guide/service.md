---
sidebarDepth: 4
prev: /guide/mvc
next: false
---

# Web Virtual Service

虚拟web服务，是指在前端通过监听路由的改变，进行请求化线程模拟的逻辑服务。我们称为`Web Virtual Service`。设计Wox.js初衷就是可以将服务端的思想移植到前端，从特殊角度看前端也可以完全认为是服务化的。所以我们可以通过后端思想将其路由体系直接接管。不论是在前端渲染还是在后端SSR渲染，逻辑几乎可以直接打通。这就是优势所在。

## 由来

这层服务主要由模块 [@wox/server](https://github.com/woxjs/server) 提供。它是由4个文件组成，分别是：

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