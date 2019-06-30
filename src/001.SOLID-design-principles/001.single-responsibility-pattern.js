/*eslint no-console: 0 */

const fs = require('fs');

/**
 * Single Responibility Principle
 *
 * creating modules/class that are responsibly for only one task
 * exmaple here is by splitting up Journal and PersistentManager
 * this is creating isolated modules that are easier to test and manage
 */

class Journal {
  constructor(defaultCount = 0) {
    this.entries = {};
    this.count = defaultCount;
  }

  addEntry(text) {
    const count = ++this.count;
    const entry = `${count}: ${text}`;
    this.entries[count] = entry;
    return count;
  }

  removeEntry(index) {
    delete this.entries[index];
  }

  toString() {
    return Object.values(this.entries).join('\n'); // eslint-disable-line
  }
}

class PersistentManager {
  preProcess() {
    //  TODO
  }

  saveToFile(journal, filename) {
    fs.writeFileSync(filename, journal.toString());
  }
}

const journal = new Journal();
const persist = new PersistentManager();

journal.addEntry('Ate Breakfast');
journal.addEntry('Went to work');

console.log(journal.toString());
persist.saveToFile(journal, `${process.cwd()}/001.persitent.txt`);
