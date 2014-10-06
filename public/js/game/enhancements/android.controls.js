define([ 'game/events', 'game/keyboard' ], function (events, keyboard) {

  return function (android) {
    events.on('game:update', function (gameInfo) {
      if (android.mesh) {
        var rotationFactor = 5 * gameInfo.delta;
        var moveDistance = android.maxVelocity * gameInfo.delta;
        android.state = android.states.still;

        if (keyboard.pressed('up')) {
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
          if (android.body) {
            android.body.position.copy(android.mesh.position);
            android.body.quaternion.copy(android.mesh.quaternion);
          }

          events.emit('player:move', android.mesh.position);
        }
      }
    });
  };
});
