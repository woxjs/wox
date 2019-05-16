export default {
  get url() {
    return this.req.href;
  },
  get method() {
    return this.req.method || 'GET';
  },
  get path() {
    return this.req.pathname;
  },
  get query() {
    return this.req.query;
  },
  get search() {
    return this.req.search;
  },
  get host() {
    return this.req.host;
  },
  get hostname() {
    return this.req.hostname;
  },
  get protocol() {
    return this.req.protocol;
  },
  get secure() {
    return 'https' === this.protocol;
  },
  get isapi() {
    return this.req.isapi;
  },
  get referer() {
    return this.req.referer;
  },
  get routerPath() {
    return this.req.router;
  }
};