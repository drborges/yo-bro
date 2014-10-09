define([
  'game/entities/android',
  'game/enhancements/android.mesh',
  'game/enhancements/android.physics',
  'game/enhancements/android.animation',
  'game/enhancements/android.ai',

], function (Android, mesh, physics, animation, ai) {

  var enemy = new Android({
    name: 'Enemy',
    mass: 5,
    position: new THREE.Vector3(30, 0, 0),
    color: Android.colors.red,
    maxVelocity: 40
  });

  return enemy.with(mesh).with(physics).with(animation).with(ai);
});

