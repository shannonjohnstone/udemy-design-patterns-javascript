/**
 * PointFactory
 *
 * Object for return facotry
 */
class PointFactory {
  newCartesianPoint(x, y) {
    return new Point(x, y);
  }

  newPolarPoint(rho, theta) {
    return new Point(rho * Math.cos(theta), rho * Math.sin(theta));
  }
}

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static newCartesianPoint(x, y) {
    return new Point(x, y);
  }

  static newPolarPoint(rho, theta) {
    return new Point(rho * Math.cos(theta), rho * Math.sin(theta));
  }

  static get factory() {
    return new PointFactory();
  }
}

const p = Point.factory.newCartesianPoint(2, 3);
const p1 = Point.newCartesianPoint(2, 3);
console.log(p);
console.log(p1);
