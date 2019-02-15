import configs from '#/.wox';
import Wox from './index';
const app = new Wox(configs);
app.use(async (ctx, next) => {
  // console.log(ctx, next);
});
app.startServer();