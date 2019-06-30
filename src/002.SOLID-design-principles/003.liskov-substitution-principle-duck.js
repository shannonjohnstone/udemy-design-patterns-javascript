/*eslint no-console: 0 */

class Duck {
  constructor() {}

  quack() {
    return 'Quack';
  }
}

/**
 * MechanicalDuck is violating the liskov substition principle
 * because if changes the implementation of the `quick` method
 *
 * this principle implies that your subclass does interchangable with you base class
 */
class MechanicalDuck extends Duck {
  constructor(battery = null) {
    super();
    this._battery = battery;
  }

  quack() {
    if (!this._battery) {
      throw 'Need battery to operate';
    }

    return 'Quack';
  }
}
/**
 * Example of class not violating liskov substition principle
 */

class FemaleDuck extends Duck {
  constructor() {
    super();
    this.eggs = 0;
  }

  layEgg() {
    this.eggs = this.eggs + 1;
  }
}

const duck = new Duck();
console.log(duck.quack());

const femaleDuck = new FemaleDuck();
console.log(femaleDuck.quack());
console.log(femaleDuck.eggs);
femaleDuck.layEgg();
console.log(femaleDuck.eggs);

const mechanicalDuck = new MechanicalDuck();
console.log(mechanicalDuck.quack());
