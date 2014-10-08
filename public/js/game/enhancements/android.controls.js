define([ 'game/events', 'game/keyboard' ], function (events, keyboard) {

  return function (android) {

    events.on('game:update', function (gameInfo) {
      if (android.mesh && android.body) {

        var bodyCenter = new CANNON.Vec3(0, 0, 0);
        var force = new CANNON.Vec3(0, 0, 20);
        var rotationFactor = 5 * gameInfo.delta;
        var moveDistance = android.maxVelocity * gameInfo.delta;
        android.state = android.states.still;

        if (keyboard.pressed('up')) {
          // android.body.applyImpulse(force, bodyCenter);
          android.mesh.translateZ(moveDistance);
          android.state = android.states.walking;
        }

        if (keyboard.pressed("down")) {
          android.mesh.translateZ(-moveDistance);
          android.state = android.states.walking;
        }

        if (keyboard.pressed("left")) {
          android.mesh.rotation.y += rotationFactor;
          android.state = android.states.walking;
        }

        if (keyboard.pressed("right")) {
          android.mesh.rotation.y -= rotationFactor;
          android.state = android.states.walking;
        }

        if (android.state === android.states.walking) {
          android.body.position.x = android.mesh.position.x;
          android.body.position.z = android.mesh.position.z;

          events.emit('player:move', android.mesh.position);
        }
      }
    });
  };
});
