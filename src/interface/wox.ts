export interface PluginFactory {
  name: string;
  readonly config?: {  [options: string]: any };
  get(dependency: string): PluginFactory;
}

export interface PluginContainer {
  stacks: { [plugin: string]: PluginFactory };
  configs: { [options: string]: any };
  set(name: string, target: PluginFactory): PluginContainer;
  get(name: string): PluginFactory | undefined;
  getConfig(name: string): any;
}

export interface Wox {
  env: string;
  $env: string;
  $plugin: PluginContainer;
}

export interface CustomConfigsInterface {
  mode?: string;
  sync?: boolean;
  [key: string]: any;
}