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

class EmitterAbstraction {
  constructor() {
    if (this.constructor.name === 'EmitterAbstraction') {
      throw new Error(`${this.constructor.name} is abstract`);
    }
  }

  emit() {}
  listen() {}
  failed(str) {
    // handling failure
  }
}

function awesomeSauce(emitter) {
  emitter.emit('awesome/sauce');
}

function awesomeSauceListener(emitter) {
  emitter.listen('awesome/sauce', (err, data) => {
    if (err) {
      emitter.failed('awesome/sauce');
    } else {
      console.log('listen actioned');
    }
  });
}

// Example

const standardEmitterPackage = {
  emit: str => {},
  listen: (str, cb) => {
    cb();
  },
};

const fancyEmitterPackage = {
  dispatch: str => {
    console.log(`${str} dispatch`);
  },
  on: (str, cb) => {
    console.log(`${str} completed`);
    cb('ERR');
  },
};

// Emitter one
class MyEmiiter extends EmitterAbstraction {
  constructor() {
    super();
  }

  emit(str) {
    return standardEmitterPackage.emit(str);
  }

  listen(str, cb) {
    return standardEmitterPackage.listen(str, cb);
  }
}

// Emitter two
class MyFancyEmitter extends EmitterAbstraction {
  constructor() {
    super();
  }

  emit(str) {
    return fancyEmitterPackage.dispatch(str);
  }

  listen(str, cb) {
    return fancyEmitterPackage.on(str, cb);
  }
}

const emitter = new MyFancyEmitter();
awesomeSauce(emitter);
awesomeSauceListener(emitter);
