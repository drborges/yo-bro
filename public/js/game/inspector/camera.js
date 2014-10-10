require([ 'game/inspector/gui', 'game/scene/camera' ], function (gui, camera) {
  var properties = gui.addFolder('Camera');
  properties.add(camera.distance, 'x').min(10).max(500).step(1);
  properties.add(camera.distance, 'y').min(10).max(500).step(1);
  properties.add(camera.distance, 'z').min(10).max(500).step(1);
  properties.open();
});
