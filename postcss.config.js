const AutoPrefixer = require('autoprefixer');
const px2rem = require('postcss-px2rem');

const px2remConfigs = {
  baseDpr: 2,
  remUnit: 37.5,
};


module.exports = {
  plugins: [
    px2rem(px2remConfigs),
    AutoPrefixer({
      browsers: ['last 20 versions']
    })
  ]
};