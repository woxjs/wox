import EventEmitter from '../helper/events';
import UrlParse from 'url-parse';
import Response from './response';

const EventListenerName = {
  hash: 'hashchange',
  html5: 'popstate'
}

export default class History extends EventEmitter {
  constructor(type) {
    super();
    this.history_installed = false;
    this.history_process_listener = null;
    this.history_stop_run_process = false;
    this.history_event_name = EventListenerName[type] || 'hashChange';
    if (type === 'html5' && !window.history.pushState) {
      this.history_event_name = EventListenerName.hash;
    }
  }

  history_create_context(object = {}) {
    const req = this.history_parse(object.url);
    req.body = object.body;
    req.isapi = !!object.isapi;
    req.method = object.method ? object.method.toUpperCase() : 'GET';
    req.referer = this.history_referer;
    return {
      next: !req.isapi ? err => {
        if (!err) this.history_referer = req.href;
        this.history_stop_run_process = false;
      } : () => this.history_stop_run_process = false,
      request: req,
      response: new Response(this)
    }
  }

  history_parse(path) {
    switch (this.history_event_name) {
      case EventListenerName.html5:
        return UrlParse(
          path ? window.location.origin + path
               : window.location.href,
          true
        );
      default:
        const location = window.location;
        const hash = path && path.charAt(0) !== '#' ? '#' + path : location.hash;
        const obj = UrlParse(
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

  history_create_server(callback) {
    this.history_process_listener = callback;
  }

  history_listen() {
    const listener = () => {
      if (!this.history_stop_run_process) {
        this.history_run_process();
      }
    };
    window.addEventListener(this.history_event_name, listener);
    this.history_installed = true;
    return () => window.removeEventListener(this.history_event_name, listener);
  }

  async history_run_process(object) {
    const { request, response, next } = this.history_create_context(object);
    return await this.history_process_listener(request, response, next);
  }

  async redirect(url, sync) {
    let result;
    switch (this.history_event_name) {
      case EventListenerName.html5:
        if (sync) {
          this.history_stop_run_process = true;
          result = await this.history_run_process({ url, isapi: false });
          window.history.pushState({}, window.document.title, url);
        } else {
          window.history.pushState({}, window.document.title, url);
          result = await this.reload();
        }
        break;
      default:
        if (sync) {
          result = await this.history_run_process({ url, isapi: false });
          window.location.hash = url;
        } else {
          window.location.hash = url;
          result = await this.reload();
        }
    }
    return result;
  }

  async replace(url, sync) {
    let result;
    switch (this.history_event_name) {
      case EventListenerName.html5:
        if (sync) {
          this.history_stop_run_process = true;
          result = await this.history_run_process({ url, isapi: false });
          window.history.replaceState({}, window.document.title, url);
        } else {
          window.history.replaceState({}, window.document.title, url);
          result = await this.reload();
        }
        break;
      default:
        if (sync) {
          result = await this.history_run_process({ url, isapi: false });
          replaceUriWithHash(url);
        } else {
          replaceUriWithHash(url);
          result = await this.reload();
        }
    }
    return result;
  }

  async reload() {
    return await this.history_run_process({ isapi: false });
  }

  history_url_render(url) {
    if (!url) return;
    this.history_stop_run_process = true;
    switch (this.history_event_name) {
      case EventListenerName.html5:
        window.history.replaceState({}, window.document.title, url);
        break;
      default: replaceUriWithHash(url);
    }
  }

  history_href(url) {
    const location = window.location;
    switch (this.history_event_name) {
      case EventListenerName.html5: return location.origin + url;
      default: return location.origin + location.pathname + location.search + '#' + url;
    }
  }
}

function replaceUriWithHash(url) {
  const i = window.location.href.indexOf('#');
  window.location.replace(
    window.location.href.slice(0, i >= 0 ? i : 0) + '#' + url
  );
}