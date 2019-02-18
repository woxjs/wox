import './helper/decorate';
import Application from './service/index';
import { Container } from './plugin';
import Parser from './parse';
import Vue from 'vue';
import Router from './router/index';
import ControllerParser from './helper/controller';

export default class Wox extends Application {
  constructor(config) {
    const parser = new Parser(config);
    const parsedConfigs = parser.render();
    super({ mode: parsedConfigs.mode || 'hash', sync: parsedConfigs.sync || true });
    Vue.prototype.$wox = this;
    this.$parser = parser;
    this.$router = new Router();
    this.$env = process.env.NODE_ENV || 'development';
    this.$plugin = new Container(parsedConfigs.plugin_configs);
    this.$config = parsedConfigs.custom_configs;
    parser.VueInjectRender(this);
  }

  createViewPage() {
    if (!this.$config.el) {
      this.$el = window.document.createElement('div');
      window.document.body.appendChild(this.$el);
    } else {
      this.$el = typeof this.$config.el === 'object' 
        ? this.$config.el 
        : window.document.querySelector(this.$config.el);
    }

    ['redirect', 'replace', 'reload', 'get', 'post', 'put', 'delete'].forEach(param => {
      Vue.prototype['$' + param] = (...args) => {
        return this[param](...args);
      };
    });
  }

  async createServer() {
    await this.$parser.PluginRender(this);
    this.emit('PluginDidRendered');
    ControllerParser(this, this.$parser.ControllerRender());
    this.emit('RouterWillInstall');
    this.use(this.$router.routes());
    this.emit('RouterDidInstalled')
    this.createViewPage();
    this.$vue = this.$parser.BuildVue(this);
    this.emit('VueDidCreated');
    this.$vue.$mount(this.$el);
    this.emit('VueDidMounted');
    await super.createServer();
    this.emit('ServerDidCreated');
  }
}