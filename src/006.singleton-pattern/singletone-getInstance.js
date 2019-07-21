/**
 * Singleton example
 * Example type: database
 */

/**
 * @param {String} url
 *
 * Database singleton
 */
class Database {
  constructor(url) {
    // set `__databaseUrl` to url value being passed in
    Database._databaseUrl = this.databaseUrl = url;
  }
  set databaseUrl(url) {
    // `databaseUrl` setter
    // if value exists use this otherwise use value passed in
    Database._databaseUrl = Database._databaseUrl ? Database._databaseUrl : url;
  }
  get databaseUrl() {
    // `databaseUrl` getter
    return Database._databaseUrl;
  }
  getInstance() {
    const connect = () => {
      console.log(`Connecting to ${this.databaseUrl}...`);
      this.instance = { table: '' };
      return this.instance;
    };

    // if no instance or database url, connect
    if (!this.instance && this.databaseUrl) connect();
    return this.instance;
  }
}

// create new database connection
const database = new Database('/mongo/1');
const database2 = new Database('/mongo/2');

// example of getInstance usage
console.log(database.getInstance());
console.log(database.getInstance());
console.log(database2.getInstance());
