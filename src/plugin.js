import Context from './service/context';
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
}

export class Container {
  constructor(configs) {
    this.stacks = {};
    this.configs = configs;
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
}