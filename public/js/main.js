requirejs.config({
  baseUrl: 'js',
  paths: {
    'threejs': 'vendor/threejs/build/three.min',
    'cannonjs': 'vendor/cannon.js/build/cannon',
    'underscore': 'vendor/underscore/underscore',
    'keyboard': 'vendor/threex.keyboardstate/threex.keyboardstate',
  }
});

require([ 'threejs', 'cannonjs', 'underscore', 'keyboard' ], function() {
  require([
    'game/renderer',
    'game/viewport',
    'game/keyboard',
    'game/loop',
    'game/physics',
    'game/scene/objects',
  ]);
});
