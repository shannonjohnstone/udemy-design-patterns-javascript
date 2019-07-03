class ConnectToMongoInstanceSingleton {
  constructor(connection) {
    this.connection = connection;
    const instance = this.constructor.instance;
    if (instance) return instance;

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
