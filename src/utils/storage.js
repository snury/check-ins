// @flow

class Storage {
  constructor() {
    try {
      localStorage.setItem("checkStorage", "true");
      localStorage.getItem("checkStorage");
      localStorage.removeItem("checkStorage");
      return localStorage;
    } catch (e) {
      return this;
    }
  }

  data = {};

  setItem(name: string, value: void) {
    this.data[name] = value;
  }

  removeItem(name: string) {
    this.data[name] = null;
  }

  getItem = (name: string) => this.data[name] || null;

  length = () => Object.keys(this.data).length;

  key = (name: string) => Object.keys(this.data).indexOf(name);

  clear() {
    this.data = {};
  }
}

export default new Storage();
