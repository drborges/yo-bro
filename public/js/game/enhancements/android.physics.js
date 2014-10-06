define([ 'game/events' ], function (events) {

  return function (android) {
    var body = new CANNON.Body({ mass: android.mass });
    body.addShape(new CANNON.Box(new CANNON.Vec3(1,1,1)));
    body.angularDamping = android.angularDamping;
    body.position.copy(android.position);
    // body.quaternion.copy(android.quaternion);

    android.body = body;

    events.emit('world:body:add', body);
    events.on('world:update', function () {
      android.position.copy(body.position);
    });
  };
});
