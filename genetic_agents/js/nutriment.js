class Nutriment {
  constructor(nutrition = 0) {
    this._nutrition = nutrition;
    this._position = createVector(random(0, width), random(0, height));
  }

  display() {
    push();
    strokeWeight(1);
    if (this.nutrition < 0) {
      fill('#FF755A');
    } else {
      fill('#6AE697');
    }
    let {x, y} = this.position;
    ellipse(x, y, 10);
    pop();
  }

  get nutrition() {
    return this._nutrition;
  }
  set nutrition(value) {
    this._nutrition = value
  }

  get position() {
    return this._position;
  }
  set position(value) {
    this._position = value;
  }
}
