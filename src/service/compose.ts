import WoxError from './error';
import { AsyncFunction } from '../interface/service';
export default function compose(middleware: Array<AsyncFunction<any>>): Function {
  return function(context: object, next: AsyncFunction<any>): Promise<any> {
    let index:number = -1;
    return dispatch(0);
    function dispatch(i: number): Promise<any> {
      if (i <= index) return Promise.reject(new WoxError('[compose] next() called multiple times'));
      index = i;
      let fn: Function = middleware[i];
      if (i === middleware.length) fn = next;
      if (!fn) return Promise.resolve();
      try {
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
      } catch (err) {
        return Promise.reject(err);
      }
    }
  }
}