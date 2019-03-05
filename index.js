import _Wox from './src/index';
import _Decorate from './src/helper/interface';
import _EventEmitter from './src/helper/events';

export * from './src/helper/index';
export const Wox = _Wox;
export const DecorateInterface = _Decorate;
export const EventEmitter = _EventEmitter;