export default class Response {
  constructor(history) {
    this.history = history;
  }

  async redirect(...args) {
    return await this.history.redirect(...args);
  }

  async replace(...args) {
    return await this.history.replace(...args);
  }

  async reload() {
    return await this.history.reload();
  }
}