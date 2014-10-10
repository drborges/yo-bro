require([ 'game/inspector/gui', 'game/scene/enemy' ], function (gui, enemy) {
  var properties = gui.addFolder('Enemy');
  properties.add(enemy, 'maxVelocity').min(10).max(100).step(0.05);
  properties.add(enemy, 'mass').min(0).max(500).step(0.05);
});
