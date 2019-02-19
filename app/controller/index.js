import { Controller, Index, Http, Interface } from '../../src/helper/decorate';
import IndexVue from '../webview/index.vue';

class abc {
  constructor(ctx) {
    this.ctx = ctx;
    this.abc = '456';
  }
}


@Controller
@Index(2)
export default class DemoController {
  constructor(ctx) {
    this.ctx = ctx;
  }

  @Http.Get
  @Interface.Extra(123)
  @Interface.Service('abc', abc)
  async welcome({ Extra, Service }) {
    // console.log('extra', Extra, Service.abc.abc)
    await this.ctx.render(IndexVue);
    // console.log(this.ctx.app)
  }

  @Http.Get('/value')
  async a() {
    return {a:1}
  }
}