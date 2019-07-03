class Database {
  constructor(url) {
    Database._databaseUrl = this.databaseUrl = url;
  }
  set databaseUrl(url) {
    Database._databaseUrl = Database._databaseUrl ? Database._databaseUrl : url;
  }
  get databaseUrl() {
    return Database._databaseUrl;
  }
  getInstance() {
    const connect = () => {
      console.log(`Connecting to ${this.databaseUrl}...`);
      this.instance = { table: '' };
      return this.instance;
    };

    if (!this.instance && this.databaseUrl) connect();
    return this.instance;
  }
}

const database = new Database('/mongo/1');
const database2 = new Database('/mongo/2');

console.log(database.getInstance());
console.log(database.getInstance());
console.log(database2.getInstance());
