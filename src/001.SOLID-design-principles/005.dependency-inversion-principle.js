/*eslint no-console: 0 */

/**
 * Dependency Inversion Principle
 *
 * This principle is about using abstraction to help decouple your modules.
 * We are trying to decouple our High Level Modules from our Low Level Modules
 *
 * High Level: A module with some sort of business logic
 * Low Level: A module with a API request, disk writing or database operation
 */

const Relationship = Object.freeze({
  parent: 0,
  child: 1,
  sibling: 2,
});

class Person {
  constructor(name) {
    this.name = name;
  }
}

const parent = new Person('John');
const child1 = new Person('Chris');
const child2 = new Person('Kim');

// Example Coupling Modules -----------------------------------------------------------------------------

/**
 * LOW LEVEL MODULE
 * handles storing relationship data
 */
class BadRelationShips {
  constructor() {
    this.data = [];
  }

  addParentAndChild(parent, child) {
    this.data.push({
      from: parent,
      type: Relationship.parent,
      to: child,
    });

    this.data.push({
      from: child,
      type: Relationship.child,
      to: parent,
    });
  }
}

/**
 * HIGH LEVEL MODULE
 * handles determining `John's` children
 *
 * issue with this module is that in the constructor knows about and uses
 * the low level module `relationships.data`
 *
 * it has to know that `relationships.data` is the location of the stored data and
 * if this was to change this would mean to refactors, once in each module
 */
class BadResearch {
  constructor(relationships) {
    // BAD ***********************************
    const relations = relationships.data;
    // BAD ***********************************
    for (let rel of relations.filter(
      r => r.from.name === 'John' && r.type === Relationship.parent,
    )) {
      console.log(`John has a child name ${rel.to.name}`);
    }
  }
}

console.log('BAD EXAMPLE');
const badRels = new BadRelationShips();
badRels.addParentAndChild(parent, child1);
badRels.addParentAndChild(parent, child2);
new BadResearch(badRels);

// Example De Coupled Modules -----------------------------------------------------------------------------

/**
 * Here
 */

/**
 * RelationShipsAbstraction
 * a module we recommended the consumer extending, which has a interface of `findAllChildrenOf`
 * this way the consumer knows the defined method instead of the locaiton
 */
class RelationShipsAbstraction {
  constructor() {
    if (this.constructor.name === 'RelationShipsAbstraction') {
      throw new Error('RelationShipsAbstraction is abstract');
    }
  }

  findAllChildrenOf(name) {
    return [];
  }
}

class Relationships extends RelationShipsAbstraction {
  constructor() {
    super();
    this.data = [];
  }

  addParentAndChild(parent, child) {
    this.data.push({
      from: parent,
      type: Relationship.parent,
      to: child,
    });

    this.data.push({
      from: child,
      type: Relationship.child,
      to: parent,
    });
  }

  findAllChildrenOf(name) {
    return this.data
      .filter(r => r.from.name === name && r.type === Relationship.parent)
      .map(r => r.to);
  }
}

class Research {
  constructor(abstraction, name) {
    for (let p of abstraction.findAllChildrenOf(name)) {
      console.log(`${name} has a child name ${p.name}`);
    }
  }
}

console.log('GOOD EXAMPLE');

const rels = new Relationships();
console.log({ rels });
rels.addParentAndChild(parent, child1);
rels.addParentAndChild(parent, child2);

new Research(rels, parent.name);
