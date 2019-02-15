const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');
module.exports = class Helper {
  constructor(app) {
    this.app = app;
    this.output = {};
  }

  init() {
    this.COMPONENT();
    this.DIRECTIVE();
    this.FILTER();
    this.MIXIN();
    this.BOOTSTRAP();
    this.APPLICATIONVIEW();
    this.GET_PLUGIN_CONFIGURE();
    this.GET_ROOT_CONFIGURE();
  }

  requireContext(path, reg) {
    const regString = reg ? ', ' + reg.toString() : '';
    return `require.context('${path}', true${regString})`
  }

  write() {
    let content = 'export default {\n';
    for (const channel in this.output) {
      const target = this.output[channel];
      if (Array.isArray(target)) {
        content += channel + ':' + this.withArray(target) + ',\n';
      } else {
        content += channel + ':' + target + ',\n';
      }
    }
    return content += '}';
  }

  withArray(target) {
    return '[\n\t' + target.join(',\n') + '\n]'
  }

  customRender(name, prefix, reg, callback) {
    if (this.output[name]) throw new Error('name has been defined in output.');
    this.output[name] = [];
    this.app.addCompiler((dir, isRoot, isDev) => {
      const fileDir = path.resolve(dir, prefix);
      if (fs.existsSync(fileDir)) return this.staticRender(name, prefix, reg, callback);
      if (this.app.watch && (isRoot || isDev)) this.addRenderWatcher(name, prefix, reg, callback);
    });
  }

  staticRender(name, fileDir, reg, callback) {
    const contentString = callback 
      ? callback(this.requireContext(fileDir, reg)) 
      : this.requireContext(fileDir, reg);
    this.output[name].push(contentString);
  }

  addRenderWatcher(name, fileDir, reg, callback) {
    const watcher = chokidar.watch(fileDir);
    console.log('watch: ', fileDir)
    this.app.watchers.push(watcher);
    watcher.on('add', () => {
      const index = this.app.watchers.indexOf(watcher);
      if (index > -1) this.app.watchers.splice(index, 1);
      watcher.close();
      this.staticRender(name, fileDir, reg, callback);
      this.app.write();
    });
    // watcher.on('unlink', () => {
    //   if (!fs.existsSync(fileDir) || !fs.readdirSync(fileDir).length) {
    //     this.addRenderWatcher(name, fileDir, reg, callback);
    //     this.app.write();
    //   }
    // });
  }

  COMPONENT() {
    this.customRender('component', './app/vue/component', /\.(vue|js|jsx|tsx|ts)$/);
  }

  DIRECTIVE() {
    this.customRender('directive', './app/vue/directive', /\.(js|ts)$/);
  }

  FILTER() {
    this.customRender('filter', './app/vue/filter', /\.(js|ts)$/);
  }

  MIXIN() {
    this.customRender('mixin', './app/vue/mixin', /\.(js|ts)$/);
  }

  BOOTSTRAP() {
    this.output.bootstrap = [];
    this.app.addCompiler(dir => {
      const bootstrapFile = path.resolve(dir, 'app.ts');
      if (fs.existsSync(bootstrapFile)) {
        this.output.bootstrap.push(`require('${bootstrapFile}')`);
      }
    });
  }

  APPLICATIONVIEW() {
    this.output.view = null;
    this.app.addCompiler(dir => {
      const vueFile = path.resolve(dir, 'app.vue');
      if (fs.existsSync(vueFile)) {
        this.output.view = `require('${vueFile}')`;
      }
    });
  }

  GET_PLUGIN_CONFIGURE() {
    const file = path.resolve(this.app.cwd, `config/plugin.${this.app.env}.json`);
    if (fs.existsSync(file)) {
      this.output.plugin_configs = `require('${file}')`;
    }
  }

  GET_ROOT_CONFIGURE() {
    const result = [];
    ['.json', '.js', '.ts', '.tsx'].forEach(suffix => {
      const file = path.resolve(this.app.cwd, `config/config.${this.app.env}${suffix}`);
      if (fs.existsSync(file)) {
        result.push(`require('${file}')`);
      }
    });
    this.output.custom_configs = result;
  }
}