# @wox / wox


wox架构

![wox](./logo.svg)

## Install

```shell
npm i @wox/wox
```

## Usage

```javascript
import Wox from '@wox/wox';
import Configs from '@wox/config';
new Wox(Configs).createServer();
```

`@wox/config`将会在loader插件中编译出文件。webpack的resolve.alias必须指向该文件。