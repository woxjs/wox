export * from './helper/decorate';
import Application from './service/index';
import { Container } from './plugin';
import Parser from './parse';
import Vue from 'vue';
import Router from './router/index';
import ControllerParser from './helper/controller';
/**
 * 配置参数
 * @param {string} mode [*hash|html5] history监听模式
 * @param {HTMLElement|string} el [undefined] 被注入的DOM节点 
 */
export default class Wox extends Application {
  constructor(config) {
    const parser = new Parser(config);
    const parsedConfigs = parser.render();
    super(parsedConfigs.mode || 'hash');
    Vue.prototype.$wox = this;
    this.$parser = parser;
    this.$router = new Router();
    this.$env = process.env.NODE_ENV || 'development';
    this.$plugin = new Container(parsedConfigs.plugin_configs);
    this.$config = parsedConfigs.custom_configs;
    parser.VueInjectRender(this);
  }

  async render(webview, props) {
    if (!this.$vue) throw this.context.error('Vue is not installed.');
    if (!webview) throw this.context.error('webview required.');
    this.$vue.$root.webview = webview;
    this.$vue.$root.props = props;
    await new Promise(resolve => Vue.nextTick(resolve));
  }

  async createServer() {
    await this.$parser.PluginRender(this);
    this.emit('PluginDidRendered');
    ControllerParser(this, this.$parser.ControllerRender());
    this.emit('RouterWillInstall');
    this.use(this.$router.routes());
    this.emit('RouterDidInstalled');
    this.$vue = this.$parser.BuildVue(this);
    this.emit('ServerWillCreate');
    await super.createServer();
    this.emit('ServerDidCreated');
  }
}