import Vue from 'vue';
import Server from '@wox/server';
import Route from '@wox/router';
import Client from '@wox/loader/client';
import Basic from '@wox/basic';
import Page from './page';
import DirectiveComponent from './directives';
import { hashChange, popState } from '@wox/history';

export default class WoxApplication extends Server {
  constructor(loadConfigs) {
    super();
    this.config = {};
    this.plugins = {};
    this.env = process.env.NODE_ENV || 'development';
    this.installed = false;
    this.Client = new Client(this);
    this.parseConfigs(loadConfigs);
    this.context.render = async (webview, props) => {
      if (this.vue) {
        if (typeof webview === 'function' && webview.async) webview = await webview();
        this.vue.webview = webview;
        this.vue.props = props;
      }
    }
  }

  redirect(...args) { 
    this.history.redirect(...args);
  }

  replace(...args) {
    this.history.replace(...args);
  }

  reload(...args) {
    this.history.reload(...args);
  }

  parseConfigs(configs) {
    const client = this.Client;
    client.Plugin(configs.Plugin);
    delete configs.Plugin;
    for (const channel in configs) {
      if (client[channel]) {
        client[channel](configs[channel]);
      }
    }
  }
  
  createPage() {
    const root = global.document.createElement('div');
    global.document.body.appendChild(root);
    Vue.prototype.$wox = this;
    Vue.component('WoxPage', Page);
    DirectiveComponent(this, Vue);
    if (this.Components) this.Components(Vue);
    if (this.AsyncComponents) this.AsyncComponents(Vue);
    if (this.Directives) this.Directives(this, Vue);
    if (this.Filters) this.Filters(this, Vue);
    const initData = {
      webview: null,
      props: null,
    }
    const options = {
      el: root,
      name: 'WoxApplication',
      data: () => initData,
      render: h => {
        if (this.Bootstrap) return h(this.Bootstrap);
        return h(Page);
      }
    };
    this.emit('setup', options);
    this.vue = new Vue(options);
  }

  createProcess() {
    const routes = Basic.getAllRouterTree();
    for (let i = 0; i < routes.length; i++) {
      const $router = new Route();
      const router = routes[i];
      const object = router.__class__;
      $router.prefix(router.__prefix__);
      for (const label in router.__routes__) {
        const single = router.__routes__[label];
        const middleware = single.middlewares;
        const result = [];
        for (let n = 0; n < middleware.length; n++) {
          let middle = middleware[n].name.split('.').reduce((target, property) => {
            if (target[property]) return target[property];
            throw new Error(`Can not find property ${property} on ${JSON.stringify(target)}`);
          }, this.Middleware);
          if (middleware[n].args.length) middle = middle(...middleware[n].args);
          result.push(middle);
        }
        result.push(async (ctx, next) => {
          const cacheClassObject = object.__cacheClass__;
          if (cacheClassObject) {
            cacheClassObject.ctx = ctx;
            return cacheClassObject[label].call(cacheClassObject, ctx, next);
          }
          const obj = new object(ctx);
          object.__cacheClass__ = obj;
          return await obj[label].call(obj, ctx, next);
        });
        $router[single.method](single.uri, ...result);
      }
      this.use($router.routes());
    }
  }

  async createServer() {
    if (this.AppRuntime) await this.AppRuntime(this);
    this.createProcess();
    this.emit('beforeCreate');
    this.createPage();
    this.emit('created');
    if (this.historyRemoveListener) this.historyRemoveListener();
    this.history = this.config.history === 'html5' ? new popState() : new hashChange();
    this.emit('beforeMount');
    this.historyRemoveListener = this.history
      .createServer(this.callback())
      .listen();
    this.installed = true;
    this.emit('mounted');
  }
}