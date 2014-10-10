require([ 'game/inspector/gui', 'game/scene/player' ], function (gui, player) {
  var properties = gui.addFolder('Player');
  properties.add(player, 'maxVelocity').min(10).max(100).step(0.05);
  properties.add(player, 'mass').min(0).max(500).step(0.05);
});
