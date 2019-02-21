import History from '../history/index';
import ContextConstructor from './context';
import RequestConstructor from './request';
import ResponseConstructor from './response';
import Compose from './compose';
import WoxError from './error';
import Emiter from '../helper/events';

export default class ApplicationService extends History {
  constructor(mode) {
    super(mode);
    this.middleware = [];
    this.context = Object.create(ContextConstructor);
    this.request = Object.create(RequestConstructor);
    this.response = Object.create(ResponseConstructor);
    this.contextRequestId = 0;
    this.listener = null;
  }

  serverCreateContext(req, res) {
    const context = Object.create(this.context);
    const request = context.request = Object.create(this.request);
    const response = context.response = Object.create(this.response);
    context.app = request.app = response.app = this;
    context.req = request.req = response.req = req;
    context.res = request.res = response.res = res;
    request.ctx = response.ctx = context;
    request.response = response;
    response.request = request;
    context.status = 404;
    context.id = new Date().getTime() + '_' + this.contextRequestId++;
    return contextEvents(context);
  }

  contextEvents(ctx) {
    const e = new Emiter();
    for (const i in e) {
      if (i === 'constructor') continue;
      if (typeof e[i] === 'function') {
        Object.defineProperty(ctx, i, { value: e[i].bind(e) });
      }
    }
    return ctx;
  }

  async serverHandleRequest(ctx, fnMiddleware) {
    return await fnMiddleware(ctx).then(() => {
      if (ctx.isapi) {
        if (ctx.status === 440) {
          if (ctx.body !== undefined) {
            ctx.status = 200;
          }
        }
      } else {
        if (ctx.body !== undefined) {
          if (ctx.status === 404) {
            ctx.status = 200;
          }
        };
      }
      switch (ctx.status) {
        case 404: return Promise.reject(ctx.error('Not Find Request Path: ' + ctx.path, 404));
        case 440: 
          if (!ctx.isapi) {
            return Promise.reject(ctx.error('No Webview Found On ' + ctx.path, 440));
          }
        case 200: return ctx.body;
        default: return Promise.reject(ctx.error('Unknown Error', ctx.status));
      }
    }).catch(e => {
      if (!e.status) e.status = 500;
      return Promise.reject(e);
    });
  }

  async fetch(options) {
    if (!this.history_installed) throw ContextConstructor.error('No history installed', 502);
    const result = await super.history_run_process(options);
    if (result instanceof WoxError) throw result;
    return result;
  }

  async get(url) {
    return await this.fetch({ url, method: 'GET' });
  }

  async post(url, body) {
    return await this.fetch({ url, body, method: 'POST' });
  }

  async put(url, body) {
    return this.fetch({ url, body, method: 'PUT' });
  }

  async delete(url) {
    return await this.fetch({ url, method: 'DELETE' });
  }

  use(fn) {
    this.middleware.push(fn);
    return this;
  }

  async createServer(url) {
    const fn = Compose(this.middleware);
    super.history_create_server(async (req, res, next) => {
      const ctx = this.serverCreateContext(req, res);
      await this.emit('start', ctx);
      return await this.serverHandleRequest(ctx, fn)
        .then(data => {
          next(null);
          return Promise.all([
            ctx.emit('success', data),
            this.emit('stop', ctx)
          ]).then(() => data);
        })
        .catch(e => {
          next(e);
          let ignore = false;
          e.preventDefault = () => ignore = true;
          return Promise.all([
            ctx.emit('error', e),
            this.emit('error', e),
            this.emit('stop', ctx)
          ]).then(() => {
            if (!ignore) {
              return Promise.reject(e);
            }
          });
        });
    });
    this.listener = super.history_listen();
    await super.history_run_process({ url });
  }

  destoryServer() {
    if (this.listener) {
      this.listener();
    }
  }
}