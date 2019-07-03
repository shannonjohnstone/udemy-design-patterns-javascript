class CustomerPrototype {
  constructor(proto) {
    this.proto = proto;
  }

  clone() {
    const customer = new Customer();

    customer.first = this.proto.first;
    customer.last = this.proto.last;
    customer.status = this.proto.status;

    return customer;
  }
}

class Customer {
  constructor(first, last, status) {
    this.first = first;
    this.last = last;
    this.status = status;
  }

  say() {
    return `name: ${this.first} ${this.last}, status: ${this.status}`;
  }
}

(() => {
  const prototype = new CustomerPrototype(new Customer(null, null, 'pending'));

  const customer1 = prototype.clone();
  const customer2 = prototype.clone();

  customer1.first = 'Dustin';
  customer1.last = 'Johnstone';
  customer1.status = 'Registered';

  customer2.first = 'Zag';
  customer2.last = 'Johnstone';

  console.log(customer1.say());
  console.log(customer2.say());
})();
