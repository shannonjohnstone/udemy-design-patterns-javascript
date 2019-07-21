/**
 * Singleton pattern
 * Example type: Database connection
 *
 * Example here shows with a singleton approach for a database connection
 * you can not override the database connection implemented
 */

class ConnectToMongoInstanceSingleton {
  constructor(connection) {
    // takes in connection value
    this.connection = connection;

    // sets `.instance` value to `instance` variable, this will initially be `undefined`
    const instance = this.constructor.instance;

    // if `instance` has already been set, return this value rather than re set
    if (instance) return instance;

    // if not `.instance` value has been set we will set it
    this.constructor.instance = this;
  }

  connect() {
    console.log(`Connecting ${this.connection}`);
  }
}

const s1 = new ConnectToMongoInstanceSingleton('/mongo/1');
const s2 = new ConnectToMongoInstanceSingleton('postgres/1');

console.log(`Are they identical ${s1 === s2}`);

s1.connect();
s2.connect();
