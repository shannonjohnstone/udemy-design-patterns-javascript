/**
 * Monostate Singleton
 * Example type: CEO (There can only be one - mono)
 *
 * In this example the `ChiefExecutiveOfficer` class is
 * setting the values on itself `ChiefExecutiveOfficer`
 * using this approach means that when updated this is updated for all
 * as its treating the class a mono singleton as it refers to itself
 *
 * If this was using `this` instead than it would treat the declared ceo objects
 * as independent objects
 */

class ChiefExecutiveOfficer {
  get name() {
    return ChiefExecutiveOfficer._name;
  }
  set name(name) {
    ChiefExecutiveOfficer._name = name;
  }
  get age() {
    return ChiefExecutiveOfficer._age;
  }
  set age(age) {
    ChiefExecutiveOfficer._age = age;
  }

  toString() {
    return `CEO's name is ${this.name} and he is ${this.age} years old`;
  }
}

ChiefExecutiveOfficer._age = undefined;
ChiefExecutiveOfficer._name = undefined;

const ceo = new ChiefExecutiveOfficer();
ceo.name = 'Adma Smith';
ceo.age = 55;

const ceo2 = new ChiefExecutiveOfficer();
ceo2.name = 'Ken downer';
ceo2.age = 45;

console.log(ceo.toString());
console.log(ceo2.toString());
