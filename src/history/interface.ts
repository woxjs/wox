import { Url } from 'url';

export interface Request extends Url {
  isapi?: boolean;
  method?: string;
  body?: object;
  referer?: string;
  [options: string]: any;
}

export interface Response {
  redirect(url: string): Promise<any>;
  replace(url: string): Promise<any>;
  reload(): Promise<any>;
  [options: string]: any;
}

export interface Processer {
  url?: string;
  method?: string;
  body?: object;
}

export interface Server extends Response {
  listen(): Function;
  createServer(callback: Function): void;
  run(object?: Processer): Promise<any>;
}

export enum EventListenerName {
  hash = 'hashChange',
  html5 = 'popstate'
}