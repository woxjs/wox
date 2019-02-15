import { PluginFactory, PluginContainer, Wox } from './interface/wox';
import Context from './service/context';

export class Plugin implements PluginFactory {
  name: string;
  private app: Wox;
  private dependencies: Array<string>;

  constructor(app: Wox, name: string, dependencies: Array<string>) {
    this.app = app;
    this.name = name;
    this.dependencies = dependencies;
    this.app.$plugin.set(name, this);
    Object.defineProperty(this, 'config', {
      get() {
        return app.$plugin.getConfig(name);
      }
    });
  }
  
  get(dependency: string): PluginFactory {
    if (this.dependencies.indexOf(dependency) === -1) throw Context.error(`${dependency} is not one of ${JSON.stringify(this.dependencies)}`);
    return this.app.$plugin.get(dependency);
  }
}

export class Container implements PluginContainer {
  stacks: { [plugin: string]: PluginFactory };
  configs: { [options: string]: any };

  constructor(
    stacks: { [plugin: string]: PluginFactory }, 
    configs: { [options: string]: any }
  ) {
    this.stacks = stacks;
    this.configs = configs;
  }

  set(name: string, target: PluginFactory): PluginContainer {
    this.stacks[name] = target;
    return this;
  }

  get(name: string): PluginFactory | undefined {
    return this.stacks[name];
  }

  getConfig(name: string): any {
    return this.configs[name];
  }
}