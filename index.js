import Vue from 'vue';
import Server from '@wox/server';
import Route from '@wox/router';
import Client from '@wox/loader/client';
import Basic from '@wox/basic';
import Page from './page';
import { hashChange, popState } from '@wox/history';

export default class WoxApplication extends Server {
  constructor(loadConfigs) {
    super();
    this.config = {};
    this.plugins = {};
    this.env = process.env.NODE_ENV || 'development';
    this.Router = new Route();
    this.installed = false;
    this.Client = new Client(this);
    this.parseConfigs(loadConfigs);
    this.context.render = async (webview, props) => {
      if (this.vue) {
        if (typeof webview === 'function' && webview.async) {
          webview = await webview();
        }
        this.vue.webview = webview;
        this.vue.props = props;
      }
    }
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
    const initData = {
      webview: null,
      props: null,
    }
    this.vue = new Vue({
      el: root,
      name: 'WoxApplication',
      data: () => initData,
      render: h => {
        if (this.Bootstrap) return h(this.Bootstrap);
        return h(Page);
      }
    });
  }

  createProcess() {
    const routes = Basic.getAllRouterTree();
    for (let i = 0; i < routes.length; i++) {
      const $router = new Route();
      const router = routes[i];
      const object = router.__class__;
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
          const obj = new object(ctx);
          await obj[label](ctx, next);
        });
        $router[single.method](single.uri, ...result);
      }
      this.Router.use(router.__prefix__, $router.routes());
    }
  }

  async createServer() {
    if (this.AppRuntime) await this.AppRuntime(this);
    this.createProcess();
    this.createPage();
    this.use(this.Router.routes());
    if (this.historyRemoveListener) this.historyRemoveListener();
    if (this.config.history === 'html5') {
      this.history = new popState();
    } else {
      this.history = new hashChange();
    }
    this.historyRemoveListener = this.history
      .createServer(this.callback())
      .listen();
    this.installed = true;
  }
}