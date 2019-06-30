/*eslint no-console: 0 */

/**
 * Open Closed Principle
 * open for extension, closed for modification
 *
 * this means once we have a class/object defined and working we can use it to
 * create new class/object with extra features/logic but never modiify the class/object itself once in use
 *
 * this of course has exceptionns like when there is a bug with a class/object that of course needs to be fixed
 */

const Color = Object.freeze({
  red: 'red',
  green: 'green',
  blue: 'blue',
});

const Size = Object.freeze({
  small: 'small',
  medium: 'green',
  large: 'large',
});

class Product {
  constructor(name, color, size) {
    this.name = name;
    this.color = color;
    this.color = color;
    this.size = size;
  }
}

/**
 * Product filtering
 *
 * there are two approuches we could take to creating a class for product filteting
 *
 * 1. create a class that has defined filtering methods within
 * 2. create a class that has filtering logic that is driven from logic/specification being passed to it
 *
 * the first approuch will work but means when a new filtering tpye is applied you need to modify the filtering class
 *
 * the second approuch is better as you would be creating filtering logic outside of the main filtering class and passing
 * it into to be used
 */
const apple = new Product('Apple', Color.green, Size.small);
const tree = new Product('Tree', Color.green, Size.large);
const house = new Product('House', Color.blue, Size.large);

const products = [apple, tree, house];

class ProductFilter {
  filter(items, spec) {
    return items.filter(x => spec.isSatisfied(x));
  }
}

class ColorSpecification {
  constructor(color) {
    this.color = color;
  }

  isSatisfied(item) {
    return item.color === this.color;
  }
}

class SizeSpecification {
  constructor(size) {
    this.size = size;
  }

  isSatisfied(item) {
    return item.size === this.size;
  }
}

/**
 * combination specification
 *
 * takes in multiple specification classes
 * checks the item passed in passes each of the specifications
 */
class AndSpecification {
  constructor(...specs) {
    this.specs = specs;
  }

  isSatisfied(item) {
    return this.specs.every(x => x.isSatisfied(item));
  }
}

const productFilter = new ProductFilter();

console.log('\nColor Filter: Green');
for (let p of productFilter.filter(
  products,
  new ColorSpecification(Color.green),
)) {
  console.log(`* ${p.name} is green`);
}

console.log('\nSize Filter: Large');
for (let p of productFilter.filter(
  products,
  new SizeSpecification(Size.large),
)) {
  console.log(`* ${p.name} is large`);
}

console.log('\nSize and Color Filter: Large and Blue');
const spec = new AndSpecification(
  new ColorSpecification(Color.blue),
  new SizeSpecification(Size.large),
);
for (let p of productFilter.filter(products, spec)) {
  console.log(`* ${p.name} is large and blue`);
}
