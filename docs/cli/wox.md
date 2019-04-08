---
sidebarDepth: 4
prev: ./factory
next: false
---

# Wox辅助工具

它是wox架构的支持工具。

## cli wox:new

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

创建完毕项目后需要做以下事情：

- `cd <project>`
- `npm i`

## cli wox [...options]

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

## 对wox进行插件的工具扩展

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