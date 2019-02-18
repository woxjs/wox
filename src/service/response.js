export default {
  async redirect(...args) { return await this.res.redirect(...args); },
  async replace(...args) { return await this.res.replace(...args); },
  async reload() { return await this.res.reload(); },
  async fetch(...args) { return await this.app.fetch(...args); },
  async get(...args) { return await this.app.get(...args); },
  async post(...args) { return await this.app.post(...args); },
  async put(...args) { return await this.app.put(...args); },
  async delete(...args) { return await this.app.delete(...args); },
}
