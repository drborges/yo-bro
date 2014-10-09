define([ 'game/events', 'game/keyboard' ], function (events, keyboard) {

  return function (android) {
    var axisY = new CANNON.Vec3(0,1,0);
    var rotate = function (orientation, axis, angle) {
      var rotation = new CANNON.Quaternion();
      rotation.setFromAxisAngle(axis, angle);
      return rotation.mult(orientation);
    };

    var direction = function (orientation) {
      var tQuaternion = new THREE.Quaternion().copy(orientation)
      return new CANNON.Vec3().copy(new THREE.Vector3(0,0,1).applyQuaternion(tQuaternion));
    };

    var moveForward = function (position, orientation, amount) {
        return position.vadd(direction(orientation).scale(amount));
    };

    events.on('game:update', function (gameInfo) {
      if (android.mesh && android.body) {
        var rotationFactor = 5 * gameInfo.delta;
        var moveDistance = android.maxVelocity * gameInfo.delta;
        android.state = android.states.still;

        if (keyboard.pressed('up')) {
          android.body.position = moveForward(android.body.position, android.body.quaternion, moveDistance);
          android.state = android.states.walking;
        }

        if (keyboard.pressed("down")) {
          android.body.position = moveForward(android.body.position, android.body.quaternion, -moveDistance);
          android.state = android.states.walking;
        }

        if (keyboard.pressed("left")) {
          android.body.quaternion = rotate(android.body.quaternion, axisY, rotationFactor)
          android.state = android.states.walking;
        }

        if (keyboard.pressed("right")) {
          android.body.quaternion = rotate(android.body.quaternion, axisY, -rotationFactor)
          android.state = android.states.walking;
        }

        if (android.state === android.states.walking) {
          events.emit('player:move', android.mesh.position);
        }
      }
    });
  };
});
