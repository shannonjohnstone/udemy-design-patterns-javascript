/*eslint no-console: 0 */

/**
 * Tag builder
 *
 * used for creating HTML tags
 */
class Tag {
  static get indentSize() {
    return 2;
  }
  constructor(name = '', text = '') {
    this.name = name;
    this.text = text;
    this.children = [];
  }

  toStringImpl(indent) {
    const html = [];
    const i = ' '.repeat(indent * Tag.indentSize);
    html.push(`${i}<${this.name}>\n`);

    if (this.text.length > 0) {
      html.push(' '.repeat(Tag.indentSize * (indent + 1)));
      html.push(this.text);
      html.push('\n');
    }

    for (let child of this.children) {
      html.push(child.toStringImpl(indent + 1));
    }

    html.push(`${i}</${this.name}>\n`);
    return html.join('');
  }

  toString() {
    return this.toStringImpl(0);
  }

  static create(name) {
    return new HTMLBuilder(name);
  }
}

/**
 * HTML builder
 *
 * used for building out HTML snippets
 */
class HTMLBuilder {
  constructor(rootName) {
    this.root = new Tag(rootName);
    this.rootName = rootName;
  }

  addChild(childName, childText) {
    const child = new Tag(childName, childText);
    this.root.children.push(child);
  }

  addChildFluent(childName, childText) {
    const child = new Tag(childName, childText);
    this.root.children.push(child);
    return this;
  }

  toString() {
    return this.root.toString();
  }

  clear() {
    this.root = new Tag(this.rootName);
  }

  build() {
    return this.root;
  }
}

// Example using the HTMLBuilder directly
const words = ['hello', 'world'];
const builderDirect = new HTMLBuilder('ul');
for (let word of words) builderDirect.addChild('li', word);

// Example using HTMLBuilder the from Tag creator
const builder = Tag.create('ul');
for (let word of words) builder.addChild('li', word);
console.log(builder.toString());
builder.clear();

builder.addChildFluent('li', 'dustin').addChildFluent('li', 'zag');
console.log(builder.toString());