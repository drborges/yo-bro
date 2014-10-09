define([ 'game/events' ], function (events) {

  return function (android) {
    var body = new CANNON.Body({ mass: android.mass });
    body.android = true
    body.addShape(new CANNON.Box(new CANNON.Vec3(4, 5, 4)));
    body.angularDamping = android.angularDamping;
    body.position.copy(android.position)

    android.body = body;

    events.emit('world:body:add', body);
    events.on('world:body:move', function () {
      if (android.mesh) {
        android.mesh.position.copy(body.position);
        android.mesh.position.y = 0.5
        android.mesh.quaternion.copy(android.body.quaternion);
      }
    });
  };
});
