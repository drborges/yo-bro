define([
  'game/entities/android',
  'game/enhancements/android.mesh',
  'game/enhancements/android.physics',
  'game/enhancements/android.animation',
  'game/enhancements/android.controls',
  'game/enhancements/android.weapon',

], function (Android, mesh, physics, animation, controls, weapon) {

  var player = new Android({
    name: 'Player',
    mass: 5,
    strength: 10,
    health: 100,
    position: new THREE.Vector3(0, 30, 0),
    maxVelocity: 50,
  });

  return player.with(mesh).with(physics).with(controls).with(animation).with(weapon);
});

