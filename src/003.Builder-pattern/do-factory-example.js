/*eslint no-console: 0 */

/**
 * Shop
 *
 * Director class
 */
class Shop {
  static create(builder) {
    builder.step1();
    builder.step2();
    return builder.get();
  }
}

/**
 * Products
 */
class Car {
  constructor() {
    this.doors = 0;
  }

  addParts() {
    this.doors = 4;
  }
}

class Truck {
  constructor() {
    this.doors = 0;
  }

  addParts() {
    this.doors = 2;
  }
}

/**
 * Contrete Builders
 */
class CarBuilder {
  constructor() {
    this.car = null;
  }

  step1() {
    this.car = new Car();
  }

  step2() {
    this.car.addParts();
  }

  get() {
    return this.car;
  }
}

class TruckBuilder {
  constructor() {
    this.truck = null;
  }

  step1() {
    this.truck = new Truck();
  }

  step2() {
    this.truck.addParts();
  }

  get() {
    return this.truck;
  }
}

// Run
(() => {
  const carBuilder = new CarBuilder();
  const truckBuilder = new TruckBuilder();
  const car = Shop.create(carBuilder);
  const truck = Shop.create(truckBuilder);

  console.log(car);
  console.log(truck);
})();
