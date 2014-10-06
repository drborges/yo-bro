yo-bro
======

WebGL game inspired by GunBros. This is a study case that attempts to integrate some of the cool technologies available in modern web browsers, such as WebGl, WebAudio, WebSockets, etc.

WoodsJS
=======

A microframework for general purpose application, with support for dependency injection, and event driven programming.

## Requirements

### Module Definition

A module is defined using woods#module method, which uses a sintax similar to AngularJS's one

Example:

```javascript
var woods = require('woods.js')
var module = woods.module('my.company.module')
```

### Module Dependencies

A list of resolved modules can be passed in as the module dependencies. The injectables defined within each module dependency, are then available for injection when defining a new injectable for instance.

Example:

```javascript
var woods = require('woods.js')
  , anotherModule = require('anAwesomeModule')
  , yetAnotherModule = require('yetAnotherAwesomeModule')

var moduleWithDependencies = woods.module('my.company.module', [ anotherModule, yetAnotherModule ])
```

### Dependency Injection

Dependency Injection is similar to AngularJS's one (Annotated vs. parameter name based)

#### 1. Annotated dependency injection

A list of dependencies names is provided as the second argument of the woods#define method, and the dependencies are passed into the callback in the same order they were listed.

```javascript
var woods = require('woods.js')

module.exports = woods.module('my.company.module')

  .define('Curry', [ 'Multiplication' ], function (Multiplication) {
    return function (a) {
      return function (b) {
        return Multiplication(a, b);
      };
    };
  })

  .define('Multiplication', function () {
    return function (a, b) {
      return a * b;
    };
  })
```

#### 2. Parameter based dependency injection

The dependencies are derived from the callback parameters names through parsing process. This mechanism, like AngularJS's one, is not minification safe, thus requiring a build step to annotate properly the injectable definitions (see gulp-angular-annotate plugin for insights).

```javascript
var woods = require('woods.js')

module.exports = woods.module('my.company.module')

  .define('Curry', function (Multiplication) {
    return function (a) {
      return function (b) {
        return Multiplication(a, b);
      };
    };
  })

  .define('Multiplication', function () {
    return function (a, b) {
      return a * b;
    };
  })
```

### Better Composition with the core service `$Decorate`

```javascript
var woods = require('woods.js')

module.exports = woods.module('my.company.module')

  .define('Curry', function (fn) {
    return function (a) {
      return function (b) {
        return fn(a, b);
      };
    };
  })

  .define('Multiplication', function () {
    return function (a, b) {
      return a * b;
    };
  })
  
  .define('DecoratedMultiplication', function ($Decorate, $Loggin, Curry, Multiplication) {
    return $Decorate(Multiplication).using($Loggin).using(Curry)
  })
```

### Better Reuse with the core service `$Mixin`

```javascript
var woods = require('woods.js')

module.exports = woods.module('my.company.module')

  .define('FlyingPower', function () {
    return {
      fly: function () {
        this.state = 'flying'
      }
    }
  })

  .define('Hero', function ($Mixin, FlyingPower) {
    var Hero = { name: 'Superman' }
    return $Mixin(Hero).with(FlyingPower)
  })
  
  .define('Vilan', function ($Mixin, FlyingPower) {
    var Vilan = { name: 'BadassVilan' }
    return $Mixin(Vilan).with(FlyingPower)
  })

```

### Testing an Injectable

```javascript
describe('Curry', function () {
  var module = require('my.company.module')
    , inject = module.inject

  it('ensures that a Hero is able to fly', inject(function (Hero, FlyingPower) {
    expect(Hero).to.be.a.mixinOf(FlyingPower)
  }))
})
```


