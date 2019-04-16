import delegator from './delegator';
const CUSTOM_ERROR_NAME = 'Wox Error';
const proto = {
  error(msg, code = 500) {
    if (!(msg instanceof Error)) msg = new Error(msg);
    msg.name = CUSTOM_ERROR_NAME;
    msg.status = msg.code = code || 500;
    return msg;
  },
  render(webview, props) {
    this.status = 200;
    return this.app.render(webview, props);
  }
};

const response = new delegator(proto, 'response');
const request = new delegator(proto, 'request');

response.method('redirect')
  .method('replace')
  .method('reload')
  .method('fetch')
  .method('get')
  .method('post')
  .method('put')
  .method('delete');

request.access('search')
  .access('method')
  .access('query')
  .access('path')
  .access('url')
  .access('body')
  .access('referer')
  .getter('protocol')
  .getter('host')
  .getter('hostname')
  .getter('secure')
  .getter('isapi')
  .access('referer')
  .access('routerPath');


export default proto;