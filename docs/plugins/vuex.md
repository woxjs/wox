---
sidebarDepth: 4
---

# @wox/vuex

wox插件之[vuex](https://github.com/vuejs/vuex)状态管理支持。但是我们使用来比较方便使用的[super-vuex](https://github.com/cevio/super-vuex)来支持，保障开发效率。

## super-vuex

一套用于简化`Vuex`的数据架构，使开发者能够摈弃繁琐的书写，减少代码量，便于维护。此框架主要解决的问题是我们在日常开发中`Vuex`被诟病的书写和理念，基本使开发者只需关心数据的定义即可，对于对象和数组的操作能够通过`this.$store[${namespace}][$action]`的模式快速调用。

它的核心主要是两部分：

1. SuperVuex 核心，用于创建实例。
2. ChildVuex 模块，用于对单独的业务逻辑进行模块化。

`SuperVuex`也是继承自`ChildVuex`，所以它也具备`ChildVuex`的所有方法与属性。

## 安装插件

在我们进入到我们的项目后，使用`cli wox:setup <module> [-r <registry>]`命令来安装。

```bash
cli wox:setup @wox/vuex
```

## 创建文件

```bash
cli wox:store <path/file>
```

## 使用storage持久存储

```bash {3}
import { ChildVuex } from 'super-vuex';
export default app => {
  const child = new ChildVuex('Vix', app.Storage);
  child.setState({
    value: 'Hello world!'
  });
  return child;
}
```

`app.Storage`是一个存储对象，它必须具备以下特性：

- 必须具备`async set(key, value)`方法
- 必须具备`async get(key, value)`方法

具体如何定义，随开发者习惯。


