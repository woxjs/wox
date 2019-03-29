export default class Interface {
  constructor (name) {
    this.name = name
  }

  set (target, value) {
    Reflect.defineMetadata(this.name, value, target)
  }

  get (target) {
    return Reflect.getMetadata(this.name, target)
  }
}
