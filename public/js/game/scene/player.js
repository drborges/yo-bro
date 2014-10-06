define([
  'game/entities/android',
  'game/enhancements/android.mesh',
  'game/enhancements/android.physics',
  'game/enhancements/android.animation',
  'game/enhancements/android.controls',

], function (Android, mesh, physics, animation, controls) {

  var player = new Android({
    name: 'Player',
    mass: 10,
    maxVelocity: 50
  });

  return player.with(mesh).with(physics).with(animation).with(controls);
});

