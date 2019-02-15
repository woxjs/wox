import History from '../history/index';
import { Application, AsyncFunction, ContextInterface } from '../interface/service';
import { Request, Response } from '../interface/history';
import ContextConstructor from './context';
import RequestConstructor from './request';
import ResponseConstructor from './response';
import Compose from './compose';
import WoxError from './error';

export default class ApplicationService extends History implements Application {
  private middleware: Array<AsyncFunction<any>> = [];
  private context: object = Object.create(ContextConstructor);
  private request: object = Object.create(RequestConstructor);
  private response: object = Object.create(ResponseConstructor);
  private contextRequestId: number = 0;
  private listener: Function;

  constructor(configs: { mode?: string, sync?: boolean} = { mode: 'hash', sync: true }) {
    super(configs.mode, configs.sync);
  }

  private createApplicationContext(req: Request, res: Response): ContextInterface {
    const context: ContextInterface = Object.create(this.context);
    const request: Request = context.request = Object.create(this.request);
    const response: Response = context.response = Object.create(this.response);
    context.app = request.app = response.app = this;
    context.req = request.req = response.req = req;
    context.res = request.res = response.res = res;
    request.ctx = response.ctx = context;
    request.response = response;
    response.request = request;
    context.body = null;
    context.status = 404;
    context.id = new Date().getTime() + '_' + this.contextRequestId++;
    return context;
  }

  private async handleRequest(ctx: ContextInterface, fnMiddleware: Function) {
    return await fnMiddleware(ctx).then(() => {
      if (ctx.body !== undefined) ctx.status = 200;
      if (ctx.status !== 200) return Promise.reject(ctx.error('Not Find Request Path: ' + ctx.path, ctx.status));
      return ctx.body;
    }).catch((e: WoxError) => Promise.resolve(e));
  }

  private async fetch(options: object) {
    if (!this.installed) throw ContextConstructor.error('No history installed', 502);
    const result = await super.run(options);
    if (result instanceof WoxError) throw result;
    return result;
  }

  async get(url: string) {
    return await this.fetch({ url, method: 'GET' });
  }

  async post(url: string, body?: any) {
    return await this.fetch({ url, body, method: 'POST' });
  }

  async put(url: string, body?: any) {
    return this.fetch({ url, body, method: 'PUT' });
  }

  async delete(url: string) {
    return await this.fetch({ url, method: 'DELETE' });
  }

  use(fn: AsyncFunction<any>) {
    this.middleware.push(fn);
    return this;
  }

  async startServer(url: string = '/') {
    const fn: Function = Compose(this.middleware);
    super.createServer(async (req: Request, res: Response, next: Function) => {
      const ctx = this.createApplicationContext(req, res);
      return await this.handleRequest(ctx, fn).then(data => next(data));
    });
    this.listener = super.listen();
    return await super.run({ url });
  }

  stopServer() {
    if (this.listener) {
      this.listener();
    }
  }
}