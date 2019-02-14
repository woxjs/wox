
import { Server, Request, Response } from '../history/interface';
export type AsyncFunction<T> = (...args: any) => Promise<T>;
export interface Application extends Server {
  use(fn: AsyncFunction<any>): Application;
  startServer(createServer): void;
  stopServer(): void;
  get(url: string): any;
  post(url: string, body?: any): any;
  put(url: string, body?: any): any;
  delete(url: string): any;
}
export interface ContextInterface {
  app: Application;
  req: Request;
  res: Response;
  body?: any;
  status: number;
  id: string;
  [options: string]: any;
}