define([ 'game/scene/player', 'game/scene/enemy' ], function (player, enemy) {
  console.log(dat)
  var gui = new dat.GUI();

  gui.add(player, 'maxVelocity').min(10).max(100).step(0.05);
  gui.add(enemy, 'maxVelocity').min(10).max(100).step(0.05);
});
