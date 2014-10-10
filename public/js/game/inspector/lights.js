require([ 'game/inspector/gui', 'game/scene/lights' ], function (gui, lights) {
  var light = { color: '#ffffff' }
  var properties = gui.addFolder('Spot Light');
  properties.add(lights.spotlight, 'castShadow', [ true, false ]);
  properties.add(lights.spotlight, 'shadowCameraVisible', [ true, false ]);
  properties.add(lights.spotlight.position, 'x').min(10).max(500).step(0.05);
  properties.add(lights.spotlight.position, 'y').min(10).max(500).step(0.05);
  properties.add(lights.spotlight.position, 'z').min(10).max(500).step(0.05);
  properties.open();
});
