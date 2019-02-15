const fs = require('fs');
const path = require('path');
const intersect = require('@evio/intersect');
module.exports = class Plugin {
  constructor(cwd, env) {
    this.cwd = cwd;
    this.env = env;
  }

  init(next) {
    next(this.FILTER_USED_PLUGINS(this.GET_PLUGIN_DEFINETIONS()));
  }

  GET_PLUGIN_DEFINETIONS() {
    const file = path.resolve(this.cwd, 'config/plugin.json');
    if (!fs.existsSync(file)) return {};
    const content = fs.readFileSync(file, 'utf8');
    if (!content) return {};
    return JSON.parse(content);
  }

  /**
   * plugin definetion
   * @param {boolean|undefined} enable <default: true>
   * @param {array|string|undefined} env <default: ${this.env}>
   * @param {array|string|undefined} dependencies <default; undefined>
   * @param {string|undefined} path <default: undefined>
   */
  FILTER_USED_PLUGINS(data) {
    const tree = {};
    for (const plugin_name in data) {
      const plugin_config = data[plugin_name];
      if (plugin_config.enable === undefined) plugin_config.enable = true;
      if (!plugin_config.enable) continue;
      if (plugin_config.env === undefined) plugin_config.env = this.env;
      if (!Array.isArray(plugin_config.env)) plugin_config.env = [plugin_config.env];
      if (plugin_config.env.indexOf(this.env) === -1) continue;

      let plugin_dir, isDev = false;
      if (plugin_config.path) {
        isDev = true;
        if (path.isAbsolute(plugin_config.path)) {
          plugin_dir = plugin_config.path;
        } else {
          plugin_dir = path.resolve(this.cwd, 'config', plugin_config.path);
        }
      } else {
        plugin_dir = path.resolve(this.cwd, 'node_modules', plugin_name);
      }

      const pluginPackageFile = path.resolve(plugin_dir, 'package.json');
      if (!fs.existsSync(pluginPackageFile)) continue;
      const pluginPackageExports = require(pluginPackageFile);
      if (!plugin_config.dependencies) plugin_config.dependencies = [];
      if (!Array.isArray(plugin_config.dependencies)) {
        plugin_config.dependencies = [plugin_config.dependencies];
      }
      if (pluginPackageExports.plugin) {
        if (pluginPackageExports.plugin.dependencies) {
          if (!Array.isArray(pluginPackageExports.plugin.dependencies)) {
            pluginPackageExports.plugin.dependencies = [pluginNodeModuleExports.plugin.dependencies];
          }
          for (let j = 0; j < pluginPackageExports.plugin.dependencies.length; j++) {
            if (plugin_config.dependencies.indexOf(pluginPackageExports.plugin.dependencies[j]) === -1) {
              plugin_config.dependencies.push(pluginPackageExports.plugin.dependencies[j]);
            }
          }
        }
      }
      const webpackFile = path.resolve(plugin_dir, 'webpack.js');
      tree[plugin_name] = {
        isDev,
        dir: plugin_dir,
        dependencies: plugin_config.dependencies,
        webpack: fs.existsSync(webpackFile) ? require(webpackFile) : null,
      }
    }
    return this.SORT_PLUGIN_ORDER(tree);
  }

  SORT_PLUGIN_ORDER(tree) {
    const result = [];
    const keys = Object.keys(tree);
    let j = keys.length;
    while (j--) {
      const obj = tree[keys[j]];
      if (obj.dependencies.length) {
        const res = intersect(obj.dependencies, keys);
        if (res.removes.length) {
          throw new Error(`[WOX LOADER COMPILE ERROR] ${keys[j]} missing: [${res.removes.join(',')}]`);
        }
      }
      obj.name = keys[j];
      Object.defineProperty(obj, 'deep', {
        get() {
          if (!obj.dependencies.length) return 0;
          return Math.max(...obj.dependencies.map(d => tree[d] ? tree[d].deep : 0)) + 1;
        }
      });
      result.push(obj);
    }
    return result.sort((a, b) => a.deep - b.deep);
  }
}