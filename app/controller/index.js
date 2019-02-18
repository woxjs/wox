import { Controller, Index, Http } from '../../src/helper/decorate';
@Controller
@Index(2)
export default class DemoController {

  @Http.Get
  async welcome(ctx) {
    console.log(2)
  }

  @Http.Get('/value')
  async a() {
    console.log(2)
  }

  @Http.Get('/value')
  @Http.Post('/ask')
  async b() {
    console.log(3)
  }

  @Http.Get
  @Http.Post('/ask')
  async c() {
    console.log(4)
  }
}