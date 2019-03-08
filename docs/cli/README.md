---
sidebarDepth: 4
---

# 脚手架工具

它是一个基于 Vue.js 进行快速开发的完整系统，提供：

- 通过 `@vue/cli` 搭建交互式的项目脚手架。
- 通过 `@vue/cli` + `@vue/cli-service-global` 快速开始零配置原型开发。
- 一个运行时依赖 (`@vue/cli-service`)，该依赖：
 - 可升级；
 - 基于 webpack 构建，并带有合理的默认配置；
 - 可以通过项目内的配置文件进行配置；
 - 可以通过插件进行扩展。
- 一个丰富的官方插件集合，集成了前端生态中最好的工具。
- 一套完全图形化的创建和管理 Vue.js 项目的用户界面。

Vue CLI 致力于将 Vue 生态中的工具基础标准化。它确保了各种构建工具能够基于智能的默认配置即可平稳衔接，这样你可以专注在撰写应用上，而不必花好几天去纠结配置的问题。与此同时，它也为每个工具提供了调整配置的灵活性，无需 eject。

我们需要安装2个工具

- `@evio/cli` 插件工厂
- `@wox/cli` wox的专属脚手架
- [`@vue/cli`](https://cli.vuejs.org/zh) vue官方脚手架

```bash
$ npm i @evio/cli -g
$ cli install @wox/cli
$ npm install -g @vue/cli
```

## @evio/cli

它是一个插件工厂，只负责管理插件。它有如下的功能。

### install

格式：`cli install <module...> [-r <registry>]`

安装一个插件模块，并且使用源。

- **module** 插件模块，比如`@wox/cli`
- **registry** 安装源，比如`cpm|cnpm`，甚至可以使用地址`http://127.0.0.1:8080`

### uninstall

格式：`cli uninstall <module...>`

卸载一个插件

- **module** 插件模块，比如`@wox/cli`

### update

格式：`cli update [module...] [-r <registry>]`

当没有module的时候，表现为更新`@evio/cli`。当有module的时候，表现为更新这些插件。

- **module** 插件模块，比如`@wox/cli`
- **registry** 安装源，比如`cpm|cnpm`，甚至可以使用地址`http://127.0.0.1:8080`

### view

格式：`cli view [module...]`

查看插件详情。

当没有module的时候，显示已安装插件的详情；有module的时候，表示插件这些插件的详情。

- **module** 插件模块，比如`@wox/cli`

### 自定义插件

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

### Make Plugin

创建新的插件模板

```bash
cli make [plugin]
```

### Dev link

开发模式下通过模板创建后需要link到`@evio/cli`上，所以我们需要使用以下命令

```bash
cli link
```

> 注意：你必须进入到插件文件夹下

### Dev unlink

通过link软链的插件，需要解除软链，那么我们需要使用以下命令

```bash
cli unlink
```

> 注意：你必须进入到插件文件夹下

## @wox/cli

它是wox架构的支持工具。

### wox:new

格式：`cli wox:new [project] [-p]`

创建一个新的项目或插件。

- **project** 项目名称。不写的话，系统将提示你写入。
- **-p** 表示生成一个插件项目。

创建主项目

```bash
cli wox:new
```

创建插件

```bash
cli wox:new -p
```

### wox

创建开发辅助文件。我们来看下列表（通过`cli wox -h`查看）：

```bash
Usage: wox [options] <path>

create a new wox file by type

Options:
  -p, --component [type]   create a new `Vue.component` file (default: null)
  -d, --directive          create a new `Vue.directive` file
  -f, --filter             create a new `Vue.filter` file
  -x, --mixin              create a new `Vue.mixin` file
  -c, --controller [type]  create a new `Controller` file (default: null)
  -m, --middleware         create a new `Middleware` file
  -s, --service [type]     create a new `Service` file (default: null)
  -t, --decorate           create a new `Decorate` file
  -w, --webview            create a new `Webview` file
  -h, --help               output usage information
```

通过`-`符号来区分创建的类型文件。

> 注意：
> `component`比较特殊，它有4种格式`-p` `-p vue` `-p js` `-p jsx`，每个不同类型将创建不同的文件结尾。
> `controller`比较特殊，它有3种格式`-c` `-c js` `-c jsx`，每个不同类型将创建不同的文件结尾。
> `service`比较特殊，它有3种格式`-s` `-s js` `-s jsx`，每个不同类型将创建不同的文件结尾。

### 对wox进行插件的工具扩展

我们需要在插件的根目录下存放一个`commander.js`来编写。

```javascript
module.exports = (program, client) => {
  program
    .command('wox:store <file>')
    .description('add a new store file for vuex')
    .action(client.require('./addfile.js'));
}
module.exports.__IS_CLI_PLUGIN__ = true;
```

比如上面的代码，我们创建来一个新的`wox:store`命令。当这个命令被调用的时候，我们会进入`addfile.js`。

```javascript
// ./addfile.js
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const fse = require('fs-extra');
module.exports = async (ctx, file) => {
  const template = path.resolve(__dirname, '.template.ejs');
  const output = path.resolve(process.cwd(), 'app/vue/storage', file + '.js');
  const result = await render(ctx, template, output, {
    name: prefix(...file.split('/'))
  });
  if (result) {
    console.log('create file success:', output);
  } else {
    console.error('create file failed.');
  }
}

async function render(ctx, template, output, data = {}) {
  if (!fs.existsSync(template)) throw new Error('can not find template:' + template);
  const code = await new Promise((resolve, reject) => {
    ejs.renderFile(template, data, function(err, str){
      if (err) return reject(err);
      resolve(str);
    });
  });
  if (!fs.existsSync(output)) {
    fse.outputFileSync(output, code, 'utf8');
    ctx.catch(() => fs.unlinkSync(output));
    return true;
  }
}

function prefix(...names) {
  const name = names.join('_').replace(/\//g, '_').replace(/[_-][a-z0-9]/ig, s => s.substring(1).toUpperCase());
  let first = name.charAt(0);
  const next = name.substring(1);
  return first.toUpperCase() + next;
}
```

这样，执行命令的时候，我们会创建一个`app/vue/storage`下的文件，提高开发速度。

> 注意：我们约定，所有插件的开发，都必须在主项目下，最好新建`plugins`文件夹，然后安装在下面。