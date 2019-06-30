class Field {
  constructor(name) {
    this.name = name;
  }
}

class Class {
  constructor(name) {
    this.name = name;
    this.fields = [];
  }

  // toString, format class code snippet
  toString() {
    const buffer = [];

    // create `class {`
    buffer.push(`class ${this.name} {\n`);

    // check if there are fields items
    if (this.fields.length > 0) {
      // create `constructor(`
      buffer.push('  constructor(');

      // loop over fields
      for (let i = 0; i < this.fields.length; i++) {
        // add field name to argurmnet list in constuctor `contructor(arg, `
        buffer.push(this.fields[i].name);

        // if i is not equal to length of fields add `,` for next argument
        if (i + 1 !== this.fields.length) {
          buffer.push(', ');
        }
      }

      // close arguments brackets for contructor `contructor(arg1, arg2) {`
      buffer.push(') {\n');

      // loop over fields and init each field in contructor
      // this.arg = arg
      for (let field of this.fields) {
        buffer.push(`    this.${field.name} = ${field.name};\n`);
      }

      // close constructor function
      buffer.push('  }\n');
    }

    // close class itself
    buffer.push('}');

    // return as string
    return buffer.join('');
  }
}

class CodeBuilder {
  constructor(className) {
    this._class = new Class(className);
  }

  addField(name) {
    this._class.fields.push(new Field(name));
    return this;
  }

  toString() {
    return this._class.toString();
  }
}

const cb = new CodeBuilder('Person');
cb.addField('name');
cb.addField('age');
console.log(cb.toString());
