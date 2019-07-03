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

class Serializer {
  constructor(types) {
    this.types = types;
  }

  markRecursive(object) {
    // create type index for each object
    const idx = this.types.findIndex(t => t.name === object.constructor.name);

    if (idx !== -1) {
      object['typeIndex'] = idx;

      for (let key in object) {
        if (object.hasOwnProperty(key) && object[key] != null) {
          this.markRecursive(object[key]);
        }
      }
    }
  }

  reconstructRecursive(object) {
    if (object.hasOwnProperty('typeIndex')) {
      const type = this.types[object.typeIndex];
      const obj = new type();

      for (let key in object) {
        console.log({ key });
        if (obj.hasOwnProperty('key') && object[key] != null) {
          obj[key] = this.reconstructRecursive(object[key]);
        }
      }
      delete obj.typeIndex;
      return obj;
    }
    return object;
  }

  clone(object) {
    this.markRecursive(object);
    console.log({ object });
    const copy = JSON.parse(JSON.stringify(object));
    return this.reconstructRecursive(copy);
  }
}
const dustin = new Person(
  'Dustin',
  new Address('Lloyd place', 'Otford', 'Australia'),
);

let s = new Serializer([Person, Address]);
const zag = s.clone(dustin);
zag.name = 'Zag';
zag.address = new Address('Lloyd place', 'Otford', 'Australia');

console.log(dustin.toString());
console.log(zag.toString());
