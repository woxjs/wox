import 'reflect-metadata';
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
    this.Router = new Route();
    this.Client = new Client(this);
    this.parseConfigs(loadConfigs);
    this.context.fetch = this.fetch.bind(this);
    this.context.get = this.get.bind(this);
    this.context.post = this.post.bind(this);
    this.context.put = this.put.bind(this);
    this.context.delete = this.delete.bind(this);
    this.context.render = async function(webview, props) {
      if (!this.app.vue) return this.throw('wox service is not ready');
      if (this.req.from === 'api') return this.throw('can not use `redner` method in `api` modal');
      if (typeof webview === 'function' && webview.async) webview = await webview();
      this.app.vue.webview = webview;
      this.app.vue.props = props;
      this.status = 200;
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
    if (!this.config.el) {
      this.$root = window.document.createElement('div');
      window.document.body.appendChild(this.$root);
    } else {
      this.$root = typeof this.config.el === 'object' 
        ? this.config.el 
        : window.document.querySelector(this.config.el);
    }
    Vue.prototype.$wox = this;
    ['redirect', 'replace', 'reload', 'get', 'post', 'put', 'delete'].forEach(param => {
      Vue.prototype['$' + param] = (...args) => {
        return this[param](...args);
      };
    });
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
      name: 'WoxApplication',
      data: () => initData,
      render: h => {
        if (this.Bootstrap) return h(this.Bootstrap);
        return h(Page);
      }
    };
    this.emit('setup', options);
    this.vue = new Vue(options);
    this.on('ThreadEnd', ctx => {
      if (ctx.req.from === 'browser') {
        this.vue.$emit('enter', ctx);
      }
    });
    this.on('ThreadBegin', ctx => {
      if (ctx.req.from === 'browser') {
        this.vue.$emit('leave', ctx);
      }
    });
  }

  createProcess() {
    const controllers = window.WOX_ROUTER_COMPONENTS.slice(0).sort((a, b) => {
      const aIndex = Reflect.getOwnMetadata('Order', a) || 0;
      const bIndex = Reflect.getOwnMetadata('Order', b) || 0;
      return aIndex - bIndex;
    });
    controllers.forEach(controller => {
      const prefix = Reflect.getMetadata('Controller', controller);
      const uses = Reflect.getMetadata('Use', controller) || [];
      const params = Reflect.getMetadata('Param', controller) || [];
      const $router = prefix ? new Route() : this.Router;
      params.forEach(param => $router.param(param.Name, Basic.RenderMiddlewareArguments(this.Middleware, param)));
      const controllerProperties = Object.getOwnPropertyNames(controller.prototype);
      for (let i = 0; i < controllerProperties.length; i++) {
        const property = controllerProperties[i];
        if (property === 'constructor') continue;
        const result = [];
        const middleware = Reflect.getOwnMetadata('Middleware', controller.prototype[property]) || [];
        const extras = Reflect.getOwnMetadata('Middleware', controller.prototype[property]);
        const getters = Basic.Methods.map(method => {
          const httpMethodMetadata = Reflect.getOwnMetadata(method, controller.prototype[property]);
          if (!httpMethodMetadata) return;
          httpMethodMetadata.method = method;
          return httpMethodMetadata;
        }).filter(properties => !!properties);
        if (!getters.length) continue;
        if (getters.length > 1) {
          throw new Error(`You can not set multi HTTP methods on '${property}: ${getters.map(getter => getter.method).join(',')}'`);
        }
        const getter = getters[0];
        const _middleware = middleware.slice(0).reverse();
        if (!prefix) _middleware.unshift(...uses.slice(0).reverse());
        for (let n = 0; n < _middleware.length; n++) {
          result.push(Basic.RenderMiddlewareArguments(
            this.Middleware, 
            _middleware[n]
          ));
        }
        this.emit('decorate', { property, prefix, getter, extras, controller, result });
        result.push(async (ctx, next) => {
          const obj = new controller(ctx);
          return await obj[getter.property].call(obj, ctx, next);
        });
        $router[getter.method.toLowerCase()](getter.path, ...result);
      }
      if (!prefix) return;
      const ControllerPrepareMiddlewares = uses.slice(0).reverse().map(middle => Basic.RenderMiddlewareArguments(this.Middleware, middle));
      ControllerPrepareMiddlewares.push($router.routes());
      this.Router.use(prefix, ...ControllerPrepareMiddlewares);
    });
  }

  async createServer() {
    if (this.AppRuntime) await this.AppRuntime(this);
    this.createProcess();
    this.emit('beforeCreate');
    this.createPage();
    this.emit('created');
    this.use(this.Router.routes());
    if (this.historyRemoveListener) this.historyRemoveListener();
    this.history = this.config.history === 'html5' ? new popState() : new hashChange();
    this.emit('beforeMount');
    this.historyRemoveListener = this.history
      .createServer(this.callback())
      .listen();
    this.installed = true;
    this.vue.$mount(this.$root);
    this.emit('mounted');
  }
}