---
sidebarDepth: 4
prev: false
next: ./install
---

# 简介

本教程阅读，需要统一约定以下内容，请务必参看。

- `WVS` 虚拟服务
- `WVR` 虚拟请求

在阅读前请抛弃掉`Vue`的全家桶概念，只保留对`Vue`的理解，它将彻底颠覆您平常开发`Vue`的概念和模式以及思路。如果您对服务端路由概念比较清楚，而且对`express`或者`koa`的使用有丰富的经验，那么这将对您理解`Wox`的开发理念起到非常大的帮助。

开篇之前，我声明此架构如果使用，会对公司内部技术体系产生冲撞，请慎重使用。一般大公司内部都具有自己独立的技术体系，难免无法迭代使用此架构，而小型公司，未形成自己的技术体系，可以尝试使用，它能够帮助您快速突破眼前的窘境，构建便于维护和开发的技术体系。

## 开源

此架构设计初衷是为了解决互金公司多App多马甲的痛点，但随着对架构的思考，我们觉得可以对外开源，能够通用的解决业务组件化的问题。开源及下载地址如下：

### Github

[https://github.com/woxjs/wox](https://github.com/woxjs/wox)

### Npm

[https://www.npmjs.com/package/@wox/wox](https://www.npmjs.com/package/@wox/wox)

## 生态

为了让架构得到更多的业务组件支持，设计了一整套插件模式。官方提供了少量的生态支持，更多生态内容需要开发者共同来贡献。

- **[@wox/cli](https://github.com/woxjs/cli)** 创建项目、创建插件以及解决自动生成文件类型模板的问题。
- **[@wox/loader](https://github.com/woxjs/loader)** webpack插件，用来支持wox项目自动搜索文件索引的开发模式。
- **[@wox/vuex](https://github.com/woxjs/vuex)** wox插件，用来支持使用`Vuex`来管理数据。

## 反馈

如果觉得这个架构比较适合您开发，或者您的公司已经使用了此架构作为核心开发架构，那么请通过电子邮件告诉我，我将会收集这些信息并展示到首页。

Email: [evio@vip.qq.com](mailto:evio@vip.qq.com)

## [MIT](http://opensource.org/licenses/MIT) License

Copyright &lt;2019-present&gt; &lt;evio@vip.qq.com&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.