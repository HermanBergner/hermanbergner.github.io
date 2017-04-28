class Agent {
  constructor(x = random(0, width), y = random(0, height)) {

    this.position = createVector(x, y);

    //size
    this._radius = 20
    this._health = 1;

    //DNA stuff
    this._maxForce = random(0.01, 0.5);
    this._maxSpeed = random(1, 5);
    this._attraction = random(-1, 1);
    this._repulsion = random(-1, 1);
    this._perceptionRange = random(50, 400);
    this._perceptionAngle = random(10, 110);

    this._velocity = p5.Vector.random2D();
    this._acceleration = createVector();
    this.velocity.setMag(this.maxSpeed);
    this._targets = {};

    return this;
  }

  update() {

    fill('rgba(0, 0, 0, 0.05)');
    noStroke();
    push();
    angleMode(DEGREES);
    const angle = this.perceptionAngle * 0.5
    const r = this.perceptionRange;
    const ax = r * sin(angle);
    const ay = r * cos(angle);
    let {x, y} = this.position;
    translate(x, y);
    angleMode(RADIANS);
    const theta = this.velocity.heading() + PI * 0.5;
    rotate(theta);

    //Draw the vision
    beginShape();
    vertex(0, this.radius * 0.5);
    vertex(-ax, -ay);
    vertex(ax, -ay);
    vertex(0, this.radius * 0.5);
    endShape();
    pop();

    //Check if target is within vision, if so find the closest one
    let closest = Infinity;
    let closestTarget = null;
    for (let [key,
      value]of Object.entries(this.targets)) {
      value.forEach((target, i) => {
        let {x, y} = target.position;
        let dist = p5.Vector.dist(this.position, target.position);
        if (dist < this.radius) {
          this.health += target.nutrition;
          this.health = this.health > 1
            ? 1
            : this.health;
          this.targets[key].splice(i, 1);
        }
        if (ctx.isPointInPath(x, y)) {

          if (closest > dist) {
            closest = dist;
            closestTarget = target;
          }
        }
      })
    }

    //if a target is found, seek it
    if (closestTarget) {

      let force = closestTarget.nutrition < 0
        ? this.repulsion
        : this.attraction;
      this.seek(closestTarget.position, force);
    } else {
      this.velocity.setMag(this.maxSpeed);
    }

    push();
    strokeWeight(3);
    fill('#ecdd90');
    stroke('#343e45');
    ellipse(x, y, this.radius);
    pop();

    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);

    this.health -= 0.002;
  }

  seek(target, i) {
    const desired = p5.Vector.sub(target, this.position).setMag(this.maxSpeed);
    const steer = p5.Vector.sub(desired, this.velocity).limit(this.maxForce);
    steer.mult(i);
    this.applyForce(steer);
  }

  checkBoundaries() {
    if (this.position.x > width || this.position.x <= 0 || this.position.y > height || this.position.y <= 0) {
      this.seek(createVector(width * 0.5, height * 0.5), 1);
    }
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  addTargets(name, target) {
    this.targets[name] = target;
    return this;
  }

  get targets() {
    return this._targets;
  }
  set targets(target) {
    this._targets = target;
  }

  get position() {
    return this._position;
  }

  set position(vector) {
    this._position = vector;
  }

  get radius() {
    return this._radius;
  }

  get maxForce() {
    return this._maxForce;
  }

  set maxForce(value) {
    this._maxForce = value;
  }

  get maxSpeed() {
    return this._maxSpeed;
  }
  set maxSpeed(value) {
    this._maxSpeed = value;
  }

  get acceleration() {
    return this._acceleration;
  }
  set acceleration(vector) {
    this._acceleration = vector;
  }

  get velocity() {
    return this._velocity;
  }
  set velocity(vector) {
    return this._velocity = vector;
  }

  get attraction() {
    return this._attraction;
  }
  set attraction(value) {
    this._attraction = value
  }

  get repulsion() {
    return this._repulsion;
  }
  set repulsion(value) {
    this._repulsion = value;
  }

  get perceptionRange() {
    return this._perceptionRange;
  }
  set perceptionRange(value) {
    this._perceptionRange = value;
  }

  get perceptionAngle() {
    return this._perceptionAngle;
  }
  set perceptionAngle(value) {
    this._perceptionAngle = value;
  }

  get health() {
    return this._health;
  }
  set health(value) {
    this._health = value;
  }

}
