class HotDrink {
  consume() {} // abstract
}

class WhiteTea extends HotDrink {
  consume() {
    console.log('Drinking white tea');
  }
}

class BlackTea extends HotDrink {
  consume() {
    console.log('Drinking black tea');
  }
}

class Coffee extends HotDrink {
  consume() {
    console.log('Drinking Coffee');
  }
}

class HotDrinkFactory {
  prepare(amount) {} // abstract
}

class TeaFactory extends HotDrinkFactory {
  prepare(amount) {
    console.log(`Put in tea bag, boil water, pour ${amount}ml`);
    return new WhiteTea();
  }
}

class CoffeFactory extends HotDrinkFactory {
  prepare(amount) {
    console.log(`Grind the beans, boil water, pour ${amount}ml`);
    return new Coffee();
  }
}

const avaliableDrink = Object.freeze({
  tea: TeaFactory,
  coffee: CoffeFactory,
});

class HotDrinkMachine {
  constructor() {
    this.factories = null;
  }
  init(Drinks) {
    this.factories = {};
    for (let drink in Drinks) {
      this.factories[drink] = new Drinks[drink]();
    }
    return this;
  }
  interact(drink, amount, cb = null) {
    if (!this.factories) throw new Error('No drinks initiated');
    const d = this.factories[drink].prepare(amount);
    cb(d);
  }
}

const machine = new HotDrinkMachine().init(avaliableDrink);
machine.interact('tea', 200, drink => drink.consume());

machine.interact('coffee', 100, drink => drink.consume());
