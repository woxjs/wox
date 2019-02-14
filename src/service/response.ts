export default {
  async redirect(...args: any[]) { return await this.res.redirect(...args); },
  async replace(...args: any[]) { return await this.res.replace(...args); },
  async reload() { return await this.res.reload(); }
}