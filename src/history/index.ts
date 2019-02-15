import { 
  Request, 
  Response,
  Server, 
  Processer, 
} from '../interface/history';
import { AsyncFunction } from '../interface/service';
import ResponseServer from './response';
import * as URL from 'url';
import { EventEmitter } from 'events';

const EventListenerName: { [options: string]: any } = {
  hash: 'hashChange',
  html5: 'popstate'
}

export default class History extends EventEmitter implements Server {
  private name: string;
  private referer: string | undefined;
  private handle: AsyncFunction<any>;
  private sync: boolean;
  private stopRunIt: boolean = false;
  installed: boolean = false;

  constructor(
    type: string = 'hash', 
    sync: boolean = false
  ) {
    super();
    this.sync = sync;
    this.name = EventListenerName[type];
    if (type === 'html5' && !window.history.pushState) {
      this.name = EventListenerName.hash;
    }
  }

  private createContext(object?: Processer): { request: Request, response: Response, next: Function } {
    let next: Function = (data: any) => {
      this.stopRunIt = false;
      return data;
    };
    const req: Request = this.parse(object.url);
    req.body = object.body;
    req.isapi = !!object.url;
    req.method = object.method ? object.method.toUpperCase() : 'GET';
    if (!req.isapi) {
      req.referer = this.referer;
      next = (data: any) => {
        this.referer = req.href;
        this.stopRunIt = false;
        return data;
      }
    }
    return {
      next,
      request: req,
      response: new ResponseServer(this)
    }
  }

  private parse(path?: string | undefined): Request {
    switch (this.name) {
      case EventListenerName.html5:
        const res: Request = URL.parse(
          path ? window.location.origin + path
               : window.location.href,
          true
        );
        return res;
      default:
        const location: Location = window.location;
        const hash: string = path && path.charAt(0) !== '#' ? '#' + path : location.hash;
        const obj: Request = URL.parse(
          hash.length ? hash.substr(1) : '/', 
          true
        );
        obj.host = location.host;
        obj.hostname = location.hostname;
        obj.port = location.port;
        obj.protocol = location.protocol;
        return obj;
    }
  }

  createServer(callback: AsyncFunction<any>) {
    this.handle = callback;
  }

  listen() {
    const listener: EventListener = () => {
      if (!this.stopRunIt) {
        this.run();
      }
    };
    window.addEventListener(this.name, listener);
    this.installed = true;
    return () => window.removeEventListener(this.name, listener);
  }

  async run(object?: Processer) {
    const { request, response, next } = this.createContext(object);
    return await this.handle(request, response, next);
  }

  async redirect(url: string) {
    switch (this.name) {
      case EventListenerName.html5:
        if (this.sync) {
          this.stopRunIt = true;
          await this.run({ url });
          window.history.pushState({}, window.document.title, url);
        } else {
          window.history.pushState({}, window.document.title, url);
          await this.reload();
        }
        break;
      default:
        if (this.sync) {
          await this.run({ url });
          window.location.hash = url;
        } else {
          window.location.hash = url;
          await this.reload();
        }
    }
  }

  async replace(url: string) {
    switch (this.name) {
      case EventListenerName.html5:
        if (this.sync) {
          this.stopRunIt = true;
          await this.run({ url });
          window.history.replaceState({}, window.document.title, url);
        } else {
          window.history.replaceState({}, window.document.title, url);
          await this.reload();
        }
        break;
      default:
        if (this.sync) {
          await this.run({ url });
          replaceUriWithHash(url);
        } else {
          replaceUriWithHash(url);
          await this.reload();
        }
    }
  }

  async reload() {
    await this.run();
  }
}

function replaceUriWithHash(url: string): void {
  const i: number = window.location.href.indexOf('#');
  window.location.replace(
    window.location.href.slice(0, i >= 0 ? i : 0) + '#' + url
  );
}