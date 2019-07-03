class Address {
  constructor(streetAddress, city, country) {
    this.streetAddress = streetAddress;
    this.city = city;
    this.country = country;
  }

  toString() {
    return `Address: ${this.streetAddress}, ${this.city}, ${this.country}`;
  }
}

class Person {
  constructor(name, address) {
    this.name = name;
    this.address = address;
  }

  toString() {
    return `${this.name}, lives at ${this.address}`;
  }
}

const dustin = new Person(
  'Dustin',
  new Address('Lloyd place', 'Otford', 'Australia'),
);

console.log(dustin.toString());
