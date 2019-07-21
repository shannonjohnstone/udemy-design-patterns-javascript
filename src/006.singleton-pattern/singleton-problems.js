const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const test = require('tape');

/**
 * Singleton example
 */

// low level module: database interaction
class MyDatabase {
  constructor() {
    // manage a singleton database connection
    const instance = this.constructor.instance;
    if (instance) return instance;

    this.constructor.instance = this;
    console.log(chalk.blue('[initializing]: database'));
    this.capitals = {};

    // create an array out of cities listed in `capitals.txt`
    const lines = fs
      .readFileSync(path.join(__dirname, 'capitals.txt'))
      .toString()
      .split('\n');

    // create key/value pair for name and number (population)
    // knowing the format, we know we need to go by 2's to get the keys (City name)
    // than by 2's + 1 to get the value (population) as its on the next line
    for (let i = 0; i < lines.length / 2; ++i) {
      this.capitals[lines[2 * i]] = parseInt(lines[2 * i + 1]);
    }
  }

  getPopulation(city) {
    return this.capitals[city];
  }
}

/**
 * SingletonRecordFinder
 * @param {Array} cities
 *
 * high level module (business logic): records finder
 */
class SingletonRecordFinder {
  /**
   * business logic for finding totalPopulation
   * @param  {Array.<String>} cities
   */
  totalPopulation(...cities) {
    // currently this high level module depends on a low level module
    // MyDatabase is a low level module
    return cities
      .map(city => new MyDatabase().getPopulation(city))
      .reduce((acc, cur) => acc + cur);
  }
}

test('singleton database', t => {
  t.plan(1);
  const db1 = new MyDatabase();
  const db2 = new MyDatabase();

  t.equal(db1, db2);
});

test('should calculate total population', t => {
  t.plan(1);
  const totalPopulation = new SingletonRecordFinder().totalPopulation(
    'Sydney',
    'Canberra',
    'Tokyo',
  );

  t.equal(totalPopulation, 14295790);
});
