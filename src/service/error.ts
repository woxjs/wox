export default class WoxRunTimeError extends Error implements Error {
  status?: number | string;
  code?: number | string;

  constructor(...args: any[]) {
    super(...args);
    this.name = 'WoxRuntimeError';
  }

  setStatus(value: string | number): WoxRunTimeError {
    this.status = value;
    this.code = value;
    return this;
  }

  setStack(stack: string): WoxRunTimeError {
    this.stack = stack;
    return this;
  }
}