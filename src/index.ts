import Application from './service/index';
import { PluginContainer, CustomConfigsInterface } from './interface/wox';
import { Container } from './plugin';
export default class Wox extends Application {
  env: string;
  $env: string;
  $plugin: PluginContainer;
  constructor(config: { [options: string]: any }) {
    console.log(config);
    // const env = process.env.NODE_ENV || 'development';
    // const ConfigEnv = env.charAt(0).toUpperCase() + env.substr(1);
    // const CustomConfigs: CustomConfigsInterface = config.Config[ConfigEnv];
    // const PluginConfigs = config.PluginConfigs[ConfigEnv];
    super({ mode: /*CustomConfigs.mode || */'hash', sync: /*CustomConfigs.sync || */true });
    // this.env = env;
    // this.$env = ConfigEnv;
    // this.$plugin = new Container(config.Plugin, PluginConfigs);
  }
}