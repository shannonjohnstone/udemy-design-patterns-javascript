class Person {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

class PersonFactory {
  constructor() {
    this.id = 0;
  }
  createPerson(name) {
    const id = this.id;
    this.id += 1;
    return new Person(id, name);
  }
}

const personFactory = new PersonFactory();

const dustin = personFactory.createPerson('Dustin');
const zag = personFactory.createPerson('Zag');
const fox = personFactory.createPerson('Fox');
const ziggy = personFactory.createPerson('Ziggy');

console.log(dustin);
console.log(zag);
console.log(fox);
console.log(ziggy);
