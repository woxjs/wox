export * from './helper/decorate';
import Application from './service/index';
import { Container } from './plugin';
import Parser from './parse';
import Vue from 'vue';
import Router from './router/index';
import ControllerParser from './helper/controller';
import ServiceInterface from './helper/service';
/**
 * 配置参数
 * @param {string} mode [*hash|html5] history监听模式
 * @param {HTMLElement|string} el [undefined] 被注入的DOM节点 
 */
export default class Wox extends Application {
  constructor(config) {
    const parser = new Parser(config);
    const parsedConfigs = parser.render();
    super(parsedConfigs.custom_configs.mode || 'hash');
    this.errorListener();
    Vue.prototype.$app = this;
    this.$parser = parser;
    this.$router = new Router();
    this.$env = process.env.NODE_ENV || 'development';
    this.$plugin = new Container(parsedConfigs.plugin_configs);
    Object.defineProperty(this, '$config', { get() { return parsedConfigs.custom_configs; } });
    parser.VueInjectRender(this);
  }

  errorListener() {
    window.addEventListener("unhandledrejection", e => {
      e.preventDefault();
      this.emit('unhandlederror', e.reason, {
        trigger: 'window.addEventListener:unhandledrejection',
        url: e.filename || window.location.href, 
        row: e.lineno || 0, 
        col: e.colno || 0,
        time: e.timeStamp || Date.now(),
        name: e.type || e.name
      });
    });
    window.addEventListener('error', (e) => {
      e.preventDefault();
      if (e.srcElement instanceof HTMLScriptElement || e.srcElement instanceof HTMLLinkElement || e.srcElement instanceof HTMLImageElement) {
        this.emit('unhandlederror', e, {
          trigger: 'window.addEventListener:error',
          url: e.filename || window.location.href, 
          row: e.lineno, 
          col: e.colno,
          time: e.timeStamp || Date.now(),
          name: e.type || e.name
        });
      }
    }, true);
    window.onerror = (msg, url, row, col, error) => {
      this.emit('unhandlederror', error, {
        trigger: 'window.onerror',
        url, row, col,
        time: error.timeStamp || Date.now(),
        name: e.type || e.name
      });
    };
    Vue.config.errorHandler = (err, vm, info) => {
      this.emit('unhandlederror', err, {
        trigger: 'Vue.config.errorHandler',
        url: window.location.href,
        vue: {
          name: vm.$options.name,
          info: info
        },
        row: 0, 
        col: 0,
        time: err.timeStamp || Date.now(),
        name: err.type || err.name
      });
    }
  }

  async $fetch(...args) {
    return await super.fetch(...args);
  }

  async $get(...args) {
    return await super.get(...args);
  }

  async $post(...args) {
    return await super.post(...args);
  }

  async $put(...args) {
    return await super.put(...args);
  }

  async $delete(...args) {
    return await super.delete(...args);
  }

  async $redirect(...args) {
    return await super.redirect(...args);
  }

  async $replace(...args) {
    return await super.replace(...args);
  }

  async $reload(...args) {
    return await super.reload(...args);
  }

  async render(webview, props) {
    if (!this.$vue) throw this.context.error('Vue is not installed.');
    if (!webview) throw this.context.error('webview required.');
    this.$vue.webview = webview;
    this.$vue.props = props;
    await new Promise(resolve => Vue.nextTick(resolve));
  }

  async createServer(url) {
    await this.$parser.PluginRender(this);
    await this.emit('PluginDidInstalled');
    this.$plugin.setDecorate(ServiceInterface);
    this.$parser.DecorateRender(this);
    this.$plugin.renderDecorateIntoInterface();
    await this.emit('DecorateDidInstalled');
    ControllerParser(this, this.$parser.ControllerRender());
    await this.emit('RouterWillInstall');
    this.use(this.$router.routes());
    await this.emit('RouterDidInstalled');
    this.$vue = await this.$parser.BuildVue(this);
    await this.emit('ServerWillCreate');
    await super.createServer(url);
    await this.emit('ServerDidCreated');
  }
}