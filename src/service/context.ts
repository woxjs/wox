import delegate from 'delegates';
import WoxError from './error';

const proto = {
  error(msg: string | Error, code?: number | string): WoxError {
    let error: WoxError;
    if (!(msg instanceof Error)) {
      error = new WoxError(msg);
      return error.setStatus(code);
    }
    error = new WoxError(msg.message);
    return error.setStatus(code).setStack(msg.stack);
  }
};

delegate(proto, 'response')
  .method('redirect')
  .method('replace')
  .method('reload');

delegate(proto, 'request')
  .access('search')
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
  .access('referer');


export default proto;