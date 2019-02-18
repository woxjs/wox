export default class WoxError extends Error {
  constructor(msg, code) {
    super('[Wox Error]: ' + msg);
    this.status = code || 500;
    this.code = code || 500;
  }
}