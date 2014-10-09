requirejs.config({
  baseUrl: 'js',
  paths: {
    'threejs': 'vendor/threejs/build/three.min',
    'cannonjs': 'vendor/cannon.js/build/cannon',
    'tweenjs': 'vendor/tweenjs/build/tween.min',
    'soundjs': 'vendor/SoundJS/lib/soundjs-0.5.2.min',
    'dat-gui': 'vendor/dat-gui/build/dat.gui.min',
    'underscore': 'vendor/underscore/underscore',
    'keyboard': 'vendor/threex.keyboardstate/threex.keyboardstate',
  }
});

require([ 'threejs', 'cannonjs', 'tweenjs', 'soundjs', 'dat-gui', 'underscore', 'keyboard' ], function() {
  require([
    'game/renderer',
    'game/viewport',
    'game/keyboard',
    'game/loop',
    'game/physics',
    'game/gui',
    'game/scene/objects',
  ]);
});
