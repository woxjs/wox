import './style.less';
export default app => {
  app.on('start', ctx => {
    console.log('start', ctx.path);
  });
  app.on('stop', ctx => {
    console.log('stop', ctx.path);
  })
};