import Interface from '../../src/helper/interface';
export default class extends Interface {
  constructor() {
    super('Extra');
  }

  interfaceWillInject(value) {
    return (target, propertyKey, descriptor) => {
      return this.set(descriptor.value, value);
    }
  }

  interfaceDidRendered(value, { options }) {
    options.Extra = value;
  }
}