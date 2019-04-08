import Context from './service/context';
import { Interface } from './helper/decorate';
export class PluginModule {
  constructor(app, name, dependencies) {
    this.app = app;
    this.name = name;
    this.dependencies = dependencies;
    this.container = app.$plugin;
    app.$plugin.set(name, this);
    Object.defineProperty(this, '$config', {
      get() {
        return app.$plugin.getConfig(name);
      }
    });
  }
  
  get(dependency) {
    if (this.dependencies.indexOf(dependency) === -1) {
      throw Context.error(`${dependency} is not one of ${JSON.stringify(this.dependencies)}`);
    }
    return this.app.$plugin.get(dependency);
  }

  setDecorate(value) {
    this.app.$plugin.setDecorate(value);
    return this;
  }
}

export class Container {
  constructor(configs) {
    this.stacks = {};
    this.configs = configs;
    this.decorates = {};
  }

  set(name, target) {
    this.stacks[name] = target;
    return this;
  }

  get(name) {
    return this.stacks[name];
  }

  getConfig(name) {
    return this.configs[name];
  }

  setDecorate(decorate) {
    const clazz = new decorate();
    this.decorates[clazz.name] = clazz;
    return this;
  }

  renderDecorateIntoInterface() {
    for (const key in this.decorates) {
      const target = this.decorates[key];
      if (typeof target.interfaceWillInject === 'function') {
        Interface[key] = (...args) => target.interfaceWillInject(...args);
      }
    }
  }
}