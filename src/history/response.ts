import { Response, Server } from '../interface/history';
export default class ResponseServer implements Response {
  private service: Server;
  constructor(server: Server) {
    this.service = server;
  }

  async redirect(url: string) {
    await this.service.redirect(url);
  }

  async replace(url: string) {
    await this.service.replace(url);
  }

  async reload() {
    await this.service.reload();
  }
}