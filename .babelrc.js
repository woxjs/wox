
const babelPresetFlowVue = {
  plugins: [
    require('@babel/plugin-proposal-class-properties')
  ]
}

module.exports = {
  presets: [
    require('@babel/preset-env')
  ],
  plugins: [
    require('@babel/plugin-external-helpers'),
    require('babel-plugin-transform-vue-jsx'),
    require('@babel/plugin-syntax-dynamic-import'),
    require('@babel/plugin-transform-runtime')
  ]
}