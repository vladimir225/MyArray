class MyArray {
  constructor() {
    for (let i = 0; i < arguments.length; i++) {
      this[i] = arguments[i];
    }
    this._length = arguments.length;
    Object.defineProperty(this, "_length", {
      enumerable: false
    });
  }

  get length() {
    return this._length;
  }

  set length(value) {
    if (value < this._length) {
      for (let i = value; i < this._length; i++) {
        delete this[i];
      }
    } else {
      for (let i = this._length; i < value; i++) {
        this[i] = undefined;
      }
    }
    this._length = value;
  }

  push() {
    for (let i = 0; i < arguments.length; i++) {
      this[this.length] = arguments[i];
      this._length++;
    }

    return this.length;
  }

  pop() {
    const value = this[this.length - 1];
    delete this[this.length - 1];
    this._length -= 1;
    return value;
  }

  shift() {
    const value = this[0];
    for (let i = 0; i < this.length - 1; i++) {
      this[i] = this[i + 1];
    }
    this.pop();
    this._length -= 1;
    return value;
  }

  unshift() {
    for (let i = arguments.length + this.length - 1; i >= 0; i--) {
      this[i] = this[i - arguments.length];
      if (i < arguments.length) {
        this[i] = arguments[i];
      }
    }
    this._length += arguments.length;
    return this.length;
  }

  map(callback) {
    const newArr = new MyArray();
    for (let i = 0; i < this.length; i++) {
      newArr.push(callback(this[i], i, this));
    }
    return newArr;
  }

  reduce(callback) {
    let previousValue = this[0];
    for (let i = 0; i < this.length; i++) {
      let k = callback(previousValue, this[i], i, this);
      previousValue = k;
    }
    return previousValue;
  }

  filter(callback) {
    let newArr = new MyArray();
    for (var i = 0; i < this.length; i++) {
      if (callback(this[i], i, this)) {
        newArr.push(this[i]);
      }
    }
    return newArr;
  }

  forEach(callback) {
    for (let i = 0; i < this.length; i++) {
      callback(this[i], i, this);
    }
  }

  toString() {
    let str = "";
    for (let i = 0; i < this.length; i++) {
      const itemString = `${this[i]}`;
      str += itemString;
      if (i !== this.length - 1) str += ",";
    }
    return str;
  }

  static from(arrayLike, mapFn, thisArg) {
    let newArr = new MyArray();
    for (let i = 0; i < arrayLike.length; i++) {
      if (mapFn) {
        newArr[i] = thisArg
          ? mapFn.call(thisArg, arrayLike[i])
          : mapFn(arrayLike[i]);
      } else {
        newArr[i] = arrayLike[i];
      }
    }
    return newArr;
  }

  sort(callback = undefined) {
    if (callback === undefined) {
      var callback = (a, b) => {
        if (a.toString() < b.toString()) return -1;
      };
    }
    for (var i = 0; i <= this.length - 2; i++) {
      var minValue = this[i];

      for (var j = i + 1; j <= this.length - 1; j++) {
        if (callback(this[j], minValue) < 0) {
          minValue = this[j];
          var swap = this[i];
          this[i] = minValue;
          this[j] = swap;
        }
      }
    }
    return this;
  }
}
