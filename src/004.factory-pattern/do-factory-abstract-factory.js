/**
 * Abstract Facotry
 *
 * A creatinal pattern used for creating objects with a common theme
 *
 * Example of use would be creating UI components that are themed. So a button that has a Light and Dark implementation
 */

class Employee {
  constructor() {
    this.employer = 'Google';
  }
  say() {
    console.log(
      `I am employee ${this.name} and I'm a ${this.type} at ${
        this.employer
      }, some of my skils are ${this.skills.join(', ')}`,
    );
  }
}

class DevManager extends Employee {
  constructor(name) {
    super();
    this.name = name;
    this.type = 'Dev Manager';
    this.skills = ['Leadership'];
  }
}

class Dev extends Employee {
  constructor(name) {
    super();
    this.name = name;
    this.type = 'Developer';
    this.skills = ['JavaScript', 'React'];
  }
}

class EmployeeFactory {
  createDev(name) {
    return new Dev(name);
  }
  createManager(name) {
    return new DevManager(name);
  }
}

(() => {
  const persons = [];
  const employeeFactory = new EmployeeFactory();

  persons.push(employeeFactory.createDev('Dustin'));
  persons.push(employeeFactory.createManager('Zag'));

  for (let person of persons) {
    person.say();
  }
})();
