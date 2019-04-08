---
sidebarDepth: 4
prev: ./
next: ./wox
---
# 插件工厂

它是一个插件工厂，只负责管理插件。它有如下的功能。


```bash
$ npm i @evio/cli -g
```

## 安装一个插件

格式：`cli install <module...> [-r <registry>]`

安装一个插件模块，并且使用源。

- **module** 插件模块，比如`@wox/cli`
- **registry** 安装源，比如`cpm|cnpm`，甚至可以使用地址`http://127.0.0.1:8080`

```bash
$ cli install @wox/cli
$ cli install @wox/cli -r cpm
$ cli install @wox/cli -r http://127.0.0.1:8080
```

## 卸载一个插件

格式：`cli uninstall <module...>`

卸载一个插件

- **module** 插件模块，比如`@wox/cli`

```bash
$ cli uninstall @wox/cli
```

## 更新插件

格式：`cli update [module...] [-r <registry>]`

当没有module的时候，表现为更新`@evio/cli`。当有module的时候，表现为更新这些插件。

- **module** 插件模块，比如`@wox/cli`
- **registry** 安装源，比如`cpm|cnpm`，甚至可以使用地址`http://127.0.0.1:8080`

```bash
$ cli update
$ cli update -r cpm
$ cli update -r http://127.0.0.1:8080
$ cli update @wox/cli
$ cli update @wox/cli -r cpm
$ cli update @wox/cli -r http://127.0.0.1:8080
```

## 查看插件

格式：`cli view [module...]`

查看插件详情。

当没有module的时候，显示已安装插件的详情；有module的时候，表示插件这些插件的详情。

- **module** 插件模块，比如`@wox/cli`

```bash
$ cli view
$ cli view @wox/cli
```

## 自定义插件

如何自定义插件，其实很简单，它不需要在`package.json`中写入`bin`属性。只要插件的调用出口到处一个函数即可。它是基于[commander](https://www.npmjs.com/package/commander)实现的。

```javascript
module.exports = (program, client) => {
  program.command(...).option(...).action(client.require('./lib/xxx'));
}
module.exports.__IS_CLI_PLUGIN__ = true;
```

> 注意：`module.exports.__IS_CLI_PLUGIN__ = true;`为必须，表明是一个cli插件。

具体内部逻辑如何定义看插件需求了。

`client`对象一般只有一个方法需要使用`client.require(path)`，动态调用一个文件模块。初始化它需要这样写。

```javascript
new client.constructor(pather, client.util, client.pkg);
```

- **pather** `string` 表示插件所在的根目录。

## 创建插件模板

创建新的插件模板

```bash
cli make [plugin]
```

```bash
cli make project/path/repo
```

## 链接调试

开发模式下通过模板创建后需要link到`@evio/cli`上，所以我们需要使用以下命令

```bash
cli link
```

> 注意：你必须进入到插件文件夹下

## 取消链接调试

通过link软链的插件，需要解除软链，那么我们需要使用以下命令

```bash
cli unlink
```

> 注意：你必须进入到插件文件夹下