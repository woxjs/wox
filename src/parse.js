import Vue from 'vue';
import { PluginModule } from './plugin';
import upperCamelCase from 'uppercamelcase';
import WoxViewPage from './helper/view-page';
import WoxVueDirectives from './helper/directive';
export default class Parser {

  constructor(data = {}) {
    this.configs = data;
    this.result = {};
  }

  render() {
    this.CustomConfigRender();
    this.PluginConfigRender();
    return this.result;
  }

  CustomConfigRender() {
    const result = this.configs.custom_configs || [];
    const res = result.map(ret => ret.default || ret);
    this.result.custom_configs = Object.assign({}, ...res);
  }

  PluginConfigRender() {
    const result = this.configs.plugin_configs || {};
    this.result.plugin_configs = result.default || result;
  }

  VueInjectRender(app) {
    const components = this.configs.component;
    const directives = this.configs.directive;
    const filters = this.configs.filter;
    const mixins = this.configs.mixin;
    components.forEach(context => {
      this.ContextEach(context, (key, component) => {
        if (!component.name) throw app.context.error(`component miss name option in ${key}.`);
        Vue.component(component.name, component);
      });
    });
    directives.forEach(context => {
      this.ContextEach(context, (key, directive) => {
        const names = key.split('/').slice(-1)[0].split('.').slice(0, -1);
        if (names.length !== 1) throw app.context.error(`can not named with '.' on directive file<${key}>.`);
        if (names.filter(name => name.indexOf(':') > -1).length) throw app.context.error(`can not named with ':' on directive file<${key}>.`);
        Vue.directive(names[0], typeof directive === 'function' ? directive(app) : directive);
      });
    });
    filters.forEach(context => {
      this.ContextEach(context, (key, filter) => {
        const name = upperCamelCase(...key.split('/').slice(-1)[0].split('.').slice(0, -1));
        Vue.filter(name, filter);
      })
    });
    mixins.forEach(context => {
      this.ContextEach(context, (key, mixin) => Vue.mixin(typeof directive === 'function' ? mixin(app) : mixin));
    });
  }

  ContextEach(context, callback) {
    const keys = context.keys();
    keys.forEach(key => {
      const item = context(key).default;
      callback(key, item);
    });
  }

  async PluginRender(app) {
    const bootstraps = this.configs.bootstrap;
    for (let i = 0; i < bootstraps.length; i++) {
      const bootstrap = bootstraps[i];
      const args = [app];
      if (bootstrap.name) args.push(new PluginModule(app, bootstrap.name, bootstrap.dependencies));
      const pluginExports = bootstrap.exports.default || bootstrap.exports;
      if (typeof pluginExports === 'function') await pluginExports(...args);
    }
  }

  ControllerRender() {
    const _controllers = [];
    const controllers = this.configs.controller;
    for (let i = 0; i < controllers.length; i++) {
      const controllerContext = controllers[i];
      this.ContextEach(controllerContext, (key, controller) => {
        controller._filePath = key;
        const index = _controllers.indexOf(controller);
        if (index === -1) {
          _controllers.push(controller);
        }
      });
    }
    return _controllers;
  }

  DecorateRender(app) {
    const decorates = this.configs.decorate;
    decorates.forEach(decorateContext => {
      this.ContextEach(decorateContext, (key, decorate) => app.$plugin.setDecorate(decorate));
    });
  }

  BuildVue(app) {
    let el;
    if (!app.$config.el) {
      el = window.document.createElement('div');
      window.document.body.appendChild(el);
    } else {
      el = typeof app.$config.el === 'object' 
        ? app.$config.el 
        : window.document.querySelector(app.$config.el);
    }
    
    ['redirect', 'replace', 'reload', 'get', 'post', 'put', 'del'].forEach(param => {
      const $param = '$' + param;
      if (Vue.prototype[param]) throw new Error(`'${param}' is inject on vue.js`);
      Vue.prototype[$param] = (...args) => {
        let name = $param
        if (param === 'del') name = 'delete';
        if (typeof app[name] === 'function') {
          return app[name](...args);
        }
      };
    });

    WoxVueDirectives(app);

    Vue.component('WoxViewPage', WoxViewPage);

    const initData = {
      webview: null,
      props: null,
      installed: false
    }
    const options = {
      name: 'WoxRuntimeViewModel',
      data: () => initData,
      mounted() {
        this.installed = true;
      },
      render: h => {
        if (this.configs.view) return h(this.configs.view.default || this.configs.view);
        return h(WoxViewPage);
      }
    };
    app.emit('setup', options);
    const vue = new Vue(options);
    app.on('start', ctx => {
      if (ctx.isapi) return;
      vue.$emit('leave', ctx);
    });
    app.on('stop', ctx => {
      if (ctx.isapi) return;
      vue.$emit('enter', ctx);
    });
    vue.$mount(el);
    return new Promise(resolve => vue.$nextTick(() => resolve(vue)));
  }
}