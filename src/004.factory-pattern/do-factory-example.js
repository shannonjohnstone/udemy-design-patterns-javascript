class Facotry {
  static create(type) {
    let employee = {};
    if (type === 'fulltime') employee = new FullTime();
    else if (type === 'parttime') employee = new PartTime();
    else if (type === 'temporary') employee = new Temporary();
    else if (type === 'contractor') employee = new Contractor();

    employee.type = type;
    employee.say = () => {
      console.log(`${employee.type}: rate ${employee.hourly}/hour`);
    };

    return employee;
  }
}

class FullTime {
  constructor() {
    this.hourly = '$12';
  }
}

class PartTime {
  constructor() {
    this.hourly = '$11';
  }
}

class Temporary {
  constructor() {
    this.hourly = '$10';
  }
}

class Contractor {
  constructor() {
    this.hourly = '$15';
  }
}

(() => {
  const employees = [];

  employees.push(Facotry.create('fulltime'));
  employees.push(Facotry.create('parttime'));
  employees.push(Facotry.create('temporary'));
  employees.push(Facotry.create('contractor'));

  for (let employee of employees) {
    employee.say();
  }
})();
