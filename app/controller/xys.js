import { Controller, Index } from '../../src/helper/decorate';
@Controller('/test')
@Index(1)
export default class XYZController {
  async welcome() {
    console.log(1)
  }
}