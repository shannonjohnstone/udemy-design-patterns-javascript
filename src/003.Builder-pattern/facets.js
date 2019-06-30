class Person {
  constructor() {
    this.streetAddress = this.postcode = this.city = '';
    this.companyName = this.position = '';
    this.annualIncome = 0;
  }

  toString() {
    return `Person live at ${this.streetAddress}, ${this.city}, ${this.postcode}\n and works at ${this.companyName} as a ${this.position} earning ${this.annualIncome}`;
  }
}

class PersonBuilder {
  constructor(person = new Person()) {
    this.person = person;
  }

  get lives() {
    return new PersonAddressBuilder(this.person);
  }

  get works() {
    return new PersonJobBuilder(this.person);
  }

  build() {
    return this.person;
  }
}

class PersonJobBuilder extends PersonBuilder {
  constructor(person) {
    super(person);
  }

  at(companyName) {
    this.person.companyName = companyName;
    return this;
  }

  asA(position) {
    this.person.position = position;
    return this;
  }

  earning(annualIncome) {
    this.person.annualIncome = annualIncome;
    return this;
  }
}

class PersonAddressBuilder extends PersonBuilder {
  constructor(person) {
    super(person);
  }

  at(streetAddress) {
    this.person.streetAddress = streetAddress;
    return this;
  }

  withPostcode(postcode) {
    this.person.postcode = postcode;
    return this;
  }

  in(city) {
    this.person.city = city;
    return this;
  }
}

const pb = new PersonBuilder();
const person = pb.lives
  .at('123 Fake Street')
  .in('Sydney')
  .withPostcode(2000)
  .works.at('Google')
  .asA('Engineer')
  .earning(150000)
  .build();

console.log(person.toString());
