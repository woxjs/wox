const path = require('path')
const replace = require('rollup-plugin-replace')
const buble = require('rollup-plugin-buble')
const babel = require('rollup-plugin-babel')
const resolver = require('rollup-plugin-node-resolve')
const version = process.env.VERSION || require('../package.json').version;
const banner =
  '/*!\n' +
  ` * Wox.js v${version}\n` +
  ` * (c) 2018-${new Date().getFullYear()} Evio Shen\n` +
  ' * Released under the MIT License.\n' +
  ' */';

const resolve = p => path.resolve(__dirname, '../', p);
const builds = {
  'web-runtime-cjs-prod': {
    entry: resolve('index.js'),
    dest: resolve('dist/wox.runtime.common.prod.js'),
    format: 'cjs',
    env: 'production',
    external: ['vue'],
    banner
  },
  'web-runtime-esm': {
    entry: resolve('index.js'),
    dest: resolve('dist/wox.runtime.esm.js'),
    format: 'es',
    external: ['vue'],
    banner
  },
  'web-runtime-prod': {
    entry: resolve('index.js'),
    dest: resolve('dist/wox.runtime.min.js'),
    format: 'umd',
    external: ['vue'],
    env: 'production',
    banner
  }
}

function genConfig (name) {
  const opts = builds[name];
  const config = {
    input: opts.entry,
    external: opts.external,
    plugins: [
      resolver(),
      babel({
        exclude: 'node_modules/**', // 只编译我们的源代码
        runtimeHelpers: true 
      })
    ].concat(opts.plugins || []),
    output: {
      file: opts.dest,
      format: opts.format,
      banner: opts.banner,
      name: opts.moduleName || 'Wox',
      exports: 'named'
    },
    onwarn: (msg, warn) => {
      if (!/Circular/.test(msg)) {
        warn(msg)
      }
    }
  }

  // built-in vars
  const vars = {
    __VERSION__: version
  }
  // build-specific env
  if (opts.env) {
    vars['process.env.NODE_ENV'] = JSON.stringify(opts.env)
  }
  config.plugins.push(replace(vars))

  if (opts.transpile !== false) {
    config.plugins.push(buble())
  }

  Object.defineProperty(config, '_name', {
    enumerable: false,
    value: name
  })

  return config
}

if (process.env.TARGET) {
  module.exports = genConfig(process.env.TARGET)
} else {
  exports.getBuild = genConfig
  exports.getAllBuilds = () => Object.keys(builds).map(genConfig)
}