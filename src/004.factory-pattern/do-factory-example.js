class Facotry {
  static create(type) {
    let employee = {};
    if (type === Facotry.types.FULLTIME) employee = new FullTime();
    else if (type === Facotry.types.PARTTIME) employee = new PartTime();
    else if (type === Facotry.types.TEMPORARY) employee = new Temporary();
    else if (type === Facotry.types.CONTRACTOR) employee = new Contractor();

    employee.type = type;
    employee.say = () => {
      console.log(`${employee.type}: rate ${employee.hourly}/hour`);
    };

    return employee;
  }

  static get types() {
    return {
      FULLTIME: 'fulltime',
      PARTTIME: 'parttime',
      TEMPORARY: 'temporary',
      CONTRACTOR: 'contractor',
    };
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

  employees.push(Facotry.create(Facotry.types.FULLTIME));
  employees.push(Facotry.create(Facotry.types.PARTTIME));
  employees.push(Facotry.create(Facotry.types.PARTTIME));
  employees.push(Facotry.create(Facotry.types.CONTRACTOR));

  for (let employee of employees) {
    employee.say();
  }
})();
