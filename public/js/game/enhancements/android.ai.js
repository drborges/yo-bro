define([ 'game/events' ], function (events) {
  var axisY = new CANNON.Vec3(0,1,0);
  var factor = 0.02;
  var rotate = function (orientation, axis, angle) {
    var rotation = new CANNON.Quaternion();
    rotation.setFromAxisAngle(axis, angle);
    return rotation.mult(orientation);
  };

  var direction = function (orientation) {
    var tQuaternion = new THREE.Quaternion().copy(orientation)
    return new CANNON.Vec3().copy(new THREE.Vector3(0,0,1).applyQuaternion(tQuaternion));
  };

  return function (android) {
    events.on('game:update', function (gameInfo) {
      if (android.mesh) {
        android.body.quaternion = rotate(android.body.quaternion, axisY, factor);
        android.body.position = android.body.position.vadd(direction(android.body.quaternion).scale(0.5));
        android.mesh.quaternion.copy(android.body.quaternion)
        android.mesh.position.copy(android.body.position)
        android.mesh.position.y = 0.5
        android.state = android.states.walking;
      }
    });
  };
});
