const fs = require('fs');
const path = require('path');
const Plugin = require('./plugin');
const Helper = require('./helper');
module.exports = class WoxCompiler {
  constructor(watch, cwd) {
    this.watch = watch;
    this.directories = [];
    this.watchers = [];
    this.compilers = [];
    this.cwd = cwd || process.cwd();
    this.env = process.env.NODE_ENV || 'development';
    this.plugin = new Plugin(this.cwd, this.env);
    this.helper = new Helper(this);
    this.init();
  }

  addCompiler(compiler) {
    this.compilers.push(compiler);
    return this;
  }

  addDictionary(dir, isRoot, isDev) {
    if (this.directories.indexOf(dir) === -1) {
      this.directories.push({
        dir, isRoot, isDev
      });
    }
    return this;
  }

  init() {
    this.plugin.init(list => {
      list.forEach(plugin => {
        this.addDictionary(plugin.dir, false, plugin.isDev);
        if (plugin.webpack) {
          plugin.webpack(this);
        }
      });
      this.addDictionary(this.cwd, true, false);
      this.helper.init();
      this.compilers.forEach(compiler => {
        this.directories.forEach(({dir, isRoot, isDev}) => compiler(dir, isRoot, isDev))
      });
      this.write();
    });
  }

  write() {
    fs.writeFileSync(path.resolve(this.cwd, '.wox.js'), this.helper.write(), 'utf8');
  }

  apply(compiler) {
    if (this.watch) {
      // compiler.plugin('afterPlugins', () => this.extract());
      compiler.plugin('watchClose', () => {
        this.watchers.forEach(watcher => watcher.close());
      });
    } else {
      // compiler.plugin('afterPlugins', () => {
      //   this.extract();
      //   this.buildFile();
      // });
    }
  }
}