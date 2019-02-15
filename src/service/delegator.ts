export default class delegator {
  private proto: { [options: string]: any };
  private target: string;
  private methods: Array<any> = [];
  private getters: Array<any> = [];
  private setters: Array<any> = [];
  private fluents: Array<any> = [];
  constructor(proto: object, target: string) {
    if (!(this instanceof delegator)) return new delegator(proto, target);
    this.proto = proto;
    this.target = target;
  }

  method(name: string): delegator {
    const proto = this.proto;
    const target = this.target;
    this.methods.push(name);

    proto[name] = function(){
      return this[target][name].apply(this[target], arguments);
    };

    return this;
  }

  access(name: string): delegator {
    return this.getter(name).setter(name);
  }

  getter(name: string): delegator {
    const proto = this.proto;
    const target = this.target;
    this.getters.push(name);

    proto.__defineGetter__(name, function(){
      return this[target][name];
    });

    return this;
  }

  setter(name: string): delegator {
    const proto = this.proto;
    const target = this.target;
    this.setters.push(name);

    proto.__defineSetter__(name, function(val: any){
      return this[target][name] = val;
    });

    return this;
  }

  fluent(name: string): delegator {
    const proto = this.proto;
    const target = this.target;
    this.fluents.push(name);

    proto[name] = function(val: any){
      if ('undefined' != typeof val) {
        this[target][name] = val;
        return this;
      } else {
        return this[target][name];
      }
    };

    return this;
  }
}