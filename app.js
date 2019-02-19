import './style.less';
import DecInterface from './src/helper/interface';
export default app => {
  app.on('start', ctx => {
    console.log('start', ctx.path);
  });
  app.on('stop', ctx => {
    console.log('stop', ctx.path);
  });
};