export default class EventEmitter {
  static get Methods () {
    return [
      'on',
      'off',
      'addListener',
      'removeListener',
      'prependListener',
      'removeAllListeners',
      'emit',
      'eventNames',
      'listenerCount',
      'listeners'
    ]
  }
  constructor () {
    this._eventStacks = {}
  }

  on (name, listener) {
    this.addListener(name, listener)
  }

  off (name, listener) {
    this.removeListener(name, listener)
  }

  addListener (name, listener) {
    if (!this._eventStacks[name]) {
      this._eventStacks[name] = []
    }
    this._eventStacks[name].push(listener)
  }

  removeListener (name, listener) {
    const listeners = this.listeners(name)
    const index = listeners.indexOf(listener)
    if (index > -1) {
      listeners.splice(index, 1)
      if (this.listenerCount(name) === 0) {
        this.removeAllListeners(name)
      }
    }
  }

  prependListener (name, listener) {
    if (!this._eventStacks[name]) {
      this._eventStacks[name] = []
    }
    this._eventStacks[name].unshift(listener)
  }

  removeAllListeners (name) {
    if (this._eventStacks[name]) {
      delete this._eventStacks[name]
    }
  }

  async emit (name, ...args) {
    const listeners = this.listeners(name)
    if (!listeners) return
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i]
      await listener(...args)
    }
  }

  eventNames () {
    return Object.keys(this._eventStacks)
  }

  listenerCount (name) {
    const listeners = this.listeners(name)
    return listeners ? listeners.length : 0
  }

  listeners (name) {
    return this._eventStacks[name]
  }
}
